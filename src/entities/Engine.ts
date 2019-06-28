import { getRandomInt, getRandomIntBetween } from '../lib'
import MyEmitter, { SimulationEmitter } from '../lib/emitter'
import { Component } from './'
import Simulation, { SimulationSkellet } from '../Simulation'

const CONFIG = {
  tempLimit: 100,
  heathboost: 8,
  tempIncrease: 5,
  tempDecrease: 3
}

export interface ICfg {
  id: string
  name: string
  workload: number
}
export interface IRespond {
  stream: string
  value: returnValues
}

export default class Engine extends Simulation<IRespond>
  implements SimulationSkellet {
  id: string
  name: string
  levelOfUse: number
  wearOfTheMachine: number
  fault: faultLevel
  idleMode: boolean
  manufacturedComponent: Component | undefined
  workload: number
  temperature: number
  date: Date
  constructor(cfg: ICfg) {
    super()
    this.id = cfg.id
    this.name = cfg.name || 'default'
    this.workload = cfg.workload || 5
    this.levelOfUse = 0
    this.idleMode = true
    this.fault = { isFault: false, ticksToRemain: 10, currenTick: 0 }
    this.wearOfTheMachine = 100
    this.temperature = 30
  }

  // Exporting Values to SSE
  private exportValues(): returnValues {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
      levelOfUse: this.levelOfUse,
      wearOfTheMachine: this.wearOfTheMachine,
      fault: this.fault,
      idleMode: this.idleMode,
      temperature: this.temperature
      // manufacturedComponent: this.manufacturedComponent
    }
  }

  // Set states of values
  private setIdleMode(mode: boolean): void {
    this.idleMode = mode
  }

  private clearComponenten(): void {
    delete this.manufacturedComponent
    // if (getRandomInt(10) >= 8) {
    //   this.wearOfTheMachine = this.wearOfTheMachine - 3
    // }
  }

  private pickComponenten(): void {
    this.manufacturedComponent = new Component()
  }

  private setFaultMode(mode: boolean): void {
    this.fault.isFault = mode
  }

  // set state of Usage
  private calculateLevelOfUse(): void {
    if (this.manufacturedComponent) {
      const Performance = this.manufacturedComponent.getPerfomance()
      const Distance = this.levelOfUse - Performance
      this.calculateHeat()
      if (Math.abs(Distance) <= 5) {
        this.levelOfUse = Performance
      }
      if (Math.sign(Distance) === -1) {
        this.levelOfUse += 5
        this.temperature += CONFIG.heathboost
      }
      if (Math.sign(Distance) === (1 || 0)) {
        this.levelOfUse -= 5
      }
    } else {
      if (this.levelOfUse >= 5) {
        this.levelOfUse -= 5
        this.levelOfUse.toFixed(2)
      } else {
        this.levelOfUse = 0
      }
      if (this.temperature >= 30) {
        this.temperature -= 5
        this.temperature.toFixed(2)
      } else {
        this.temperature = 30
      }
    }
  }

  private calculateHeat(): void {
    if (this.temperature >= CONFIG.tempLimit) {
      if (200 - this.temperature > 20) {
        this.wearOfTheMachine -= 1
      } else {
        this.wearOfTheMachine -= 3
      }
    }
    if (this.temperature > this.levelOfUse) {
      this.temperature -= CONFIG.tempDecrease
    } else {
      this.temperature += CONFIG.tempIncrease
    }
  }

  // set one trip
  private manufactureTrip(): void {
    if (this.manufacturedComponent) {
      if (this.manufacturedComponent.isFinished()) {
        this.setIdleMode(true)
        this.clearComponenten()
      } else {
        this.manufacturedComponent.manufacturedTrip()
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
  }

  private setEngineToWorkingMode(): void {
    this.setFaultMode(false)
    this.fault.currenTick = 0
    this.wearOfTheMachine = 100
  }

  private possiblyDefective(): void {
    const x = (this.temperature * this.levelOfUse) / this.wearOfTheMachine
    console.log(x)
    if (
      (this.temperature * this.levelOfUse) / this.wearOfTheMachine > 110 &&
      this.levelOfUse !== 0
    ) {
      this.setEngineToFaultMode()
    }
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
    this.date = new Date()
    if (this.fault.isFault) {
      this.maintenance()
    } else {
      this.calculateLevelOfUse()
      this.possiblyDefective()
    }

    if (
      this.idleMode === true &&
      getRandomInt(9) <= this.workload &&
      !this.fault.isFault
    ) {
      this.setIdleMode(false)
      this.pickComponenten()
    }
    if (
      this.idleMode === false &&
      this.manufacturedComponent &&
      !this.fault.isFault
    ) {
      this.manufactureTrip()
    }
    const RESPOND: IRespond = {
      stream: 'machineStream',
      value: this.exportValues()
      // value: this.exportValues()
    }
    console.log(`levelOfUse: ${this.levelOfUse}`)
    console.log(`temperature: ${this.temperature}`)
    console.log(`wearOfTheMachine: ${this.wearOfTheMachine}`)
    console.log(`fault: ${this.fault.isFault}`)
    console.log('--------------------------')
    // console.log(RESPOND)
    this.emitter.emit('simulation', RESPOND)
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
}

interface faultLevel {
  isFault: boolean
  ticksToRemain: number
  currenTick: number
}
