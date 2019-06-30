import { getRandomInt, getRandomIntBetween } from '../lib'
import MyEmitter, { SimulationEmitter } from '../lib/emitter'
import { Component } from './'
import Simulation, { SimulationSkellet } from '../Simulation'

export interface IEngineConfig {
  id: string
  name: string
  workload: number
  absolutTempLimit: number
  damageTempLimit: number
  compensationLevel: number[]
  heathboost: number
  tempIncrease: number
  tempDecreasePerTick: number
  AIEnabled: boolean
}

export interface IRespond {
  stream: string
  value: returnValues
}

export default class Engine extends Simulation<IRespond>
  implements SimulationSkellet {
  config: IEngineConfig

  levelOfUse: number = 0
  idleMode: boolean = true
  wearOfTheMachine: number = 100
  fault: faultLevel = { isFault: false, ticksToRemain: 30, currenTick: 0 }
  temperature: number = 30
  componentToBeManufactured: Component | undefined
  manufacturedParts: object
  constructor(cfg: IEngineConfig) {
    super()
    this.config = cfg
    this.manufacturedParts = {}
  }

  // Exporting Values to SSE
  private exportValues(): returnValues {
    return {
      id: this.config.id,
      name: this.config.name,
      date: new Date(),
      levelOfUse: this.levelOfUse,
      wearOfTheMachine: this.wearOfTheMachine,
      fault: this.fault,
      idleMode: this.idleMode,
      temperature: this.temperature,
      manufacturedParts: this.manufacturedParts
      // manufacturedComponent: this.manufacturedComponent
    }
  }

  // Set states of values
  private setIdleMode(mode: boolean): void {
    this.idleMode = mode
  }

  private clearComponenten(): void {
    if (this.componentToBeManufactured) {
      const name = this.componentToBeManufactured.getName()
      if (name in this.manufacturedParts) {
        this.manufacturedParts[name] += 1
      } else {
        this.manufacturedParts[name] = 1
      }
    }

    delete this.componentToBeManufactured
    // if (getRandomInt(10) >= 8) {
    //   this.wearOfTheMachine = this.wearOfTheMachine - 3
    // }
  }

  private pickComponenten(): void {
    this.componentToBeManufactured = new Component()
  }

  private setFaultMode(mode: boolean): void {
    this.fault.isFault = mode
  }

  private calculateLevelOfUse(): void {
    const { heathboost, AIEnabled } = this.config
    const { levelOfUse } = this
    const Boost = 5
    let maxWorkload
    if (this.componentToBeManufactured) {
      // && this.maximumLoadWithoutDamage()
      if (AIEnabled && this.maximumLoadWithoutDamage()) {
        this.publish({
          stream: 'AI',
          value: {
            maschineID: this.config.id,
            message: 'throttle machine to prevent damage.'
          }
        })
        maxWorkload = this.levelOfUse -= 10
        //maxWorkload = this.componentToBeManufactured.getMaxWorkload()
      } else {
        maxWorkload = this.componentToBeManufactured.getMaxWorkload()
      }

      if (maxWorkload >= levelOfUse) {
        this.IncreaseLevelOfUse(Boost)
      }
    } else {
      if (this.levelOfUse >= 5) {
        this.levelOfUse -= 5
        this.levelOfUse.toFixed(2)
      } else {
        this.levelOfUse = 0
      }
    }
  }

  private IncreaseLevelOfUse(Boost: number): void {
    const { levelOfUse } = this
    if (this.componentToBeManufactured) {
      const maxWorkload = this.componentToBeManufactured.getMaxWorkload()
      if (
        maxWorkload > levelOfUse &&
        Math.abs(maxWorkload - levelOfUse) > Boost
      ) {
        this.levelOfUse += Boost
      } else {
        this.levelOfUse = maxWorkload
      }
    }
  }

  private maximumLoadWithoutDamage(): boolean {
    const diff = this.config.damageTempLimit - this.conditionMachine()

    if (diff <= 30) {
      return true
    } else {
      return false
    }
  }

  private calculateHeat(): void {
    // console.log(`befor decrese: ${this.temperature}`)
    this.decreaseTemp()
    const { tempIncrease, compensationLevel } = this.config
    const lou = this.levelOfUse
    let y: number

    if (this.idleMode !== true) {
      switch (true) {
        case lou < 33:
          y = compensationLevel[0]
          break
        case lou < 66:
          y = compensationLevel[1]
          break
        default:
          y = compensationLevel[2]
          break
      }
      const up = (lou * tempIncrease) / y

      // console.log(`befor up: ${this.temperature}`)
      // console.log(`amount up: ${up - this.config.tempDecreasePerTick}`)
      this.temperature += up
    }
  }

  private decreaseTemp(): void {
    if (this.temperature > 30) {
      this.temperature -= this.config.tempDecreasePerTick
      this.temperature.toFixed(2)
    } else {
      this.temperature = 30
    }
  }

  private calculateWear(): void {
    const { damageTempLimit } = this.config
    if (damageTempLimit <= this.temperature) {
      this.wearOfTheMachine -= 2
    }
  }

  // set one trip
  private manufactureTrip(): void {
    const { workload } = this.config

    if (this.componentToBeManufactured) {
      if (this.componentToBeManufactured.isFinished()) {
        this.setIdleMode(true)
        this.clearComponenten()
      } else {
        this.componentToBeManufactured.manufacturedTrip(this.levelOfUse)
      }
    } else {
      if (getRandomInt(10) <= workload) {
        this.setIdleMode(false)
        this.pickComponenten()
      }
    }
  }

  private setEngineToFaultMode(): void {
    this.setFaultMode(true)
    this.setIdleMode(true)
    this.clearComponenten()
    this.wearOfTheMachine = 0
    this.levelOfUse = 0
    this.temperature = 30
    this.publish({
      stream: 'notification',
      value: {
        maschineID: this.config.id,
        message: 'The machine has been shut down for maintenance.'
      }
    })
  }

  private setEngineToWorkingMode(): void {
    this.setFaultMode(false)
    this.fault.currenTick = 0
    this.wearOfTheMachine = 100
  }

  private possiblyDefective(): void {
    const { temperature, levelOfUse, config } = this
    const { absolutTempLimit } = config

    if (
      (this.conditionMachine() > absolutTempLimit && levelOfUse !== 0) ||
      config.absolutTempLimit <= temperature
    ) {
      this.setEngineToFaultMode()
    }
  }

  private conditionMachine(): number {
    const { temperature, levelOfUse, wearOfTheMachine } = this
    return (temperature * levelOfUse) / wearOfTheMachine
  }

  private maintenance() {
    if (this.fault.currenTick === this.fault.ticksToRemain) {
      this.setEngineToWorkingMode()
    } else {
      this.fault.currenTick++
    }
  }

  // simulate one trip
  simulate(): void {
    if (this.fault.isFault) {
      this.maintenance()
    } else {
      this.calculateLevelOfUse()
      this.calculateHeat()
      this.calculateWear()
      this.manufactureTrip()
      this.possiblyDefective()
    }

    // console.log(`NAME: ${this.config.name}`)
    // console.log(`levelOfUse: ${this.levelOfUse}`)
    // console.log(`temperature: ${this.temperature}`)
    // console.log(`wearOfTheMachine: ${this.wearOfTheMachine}`)
    // console.log(`fault: ${this.fault.isFault}`)
    // console.log(`idle: ${this.idleMode}`)
    // console.log('--------------------------')

    this.publish({
      stream: 'machineStream',
      value: this.exportValues()
    })
  }
}

// Types

interface returnValues {
  id: string
  name: string
  date: Date
  levelOfUse: number
  wearOfTheMachine: number
  fault: faultLevel
  idleMode: boolean
  temperature: number
  manufacturedComponent?: Component | undefined
  manufacturedParts: object
}

interface faultLevel {
  isFault: boolean
  ticksToRemain: number
  currenTick: number
}
