import { getRandomInt, getRandomIntBetween } from '../lib'
import MyEmitter, { SimulationEmitter } from '../lib/emitter'
import { Component } from './'
import { IRespond } from '../Simulation.d'

interface returnValues {
  id: string
  name: string
  date: Date
  levelOfUse: number
  wearOfTheMachine: number
  fault: faultLevel
  idleMode: boolean
  manufacturedComponent?: Component | undefined
}

interface faultLevel {
  isFault: boolean
  ticksToRemain: number
  currenTick: number
}

export default class Engine {
  id: string
  name: string
  levelOfUse: number
  wearOfTheMachine: number
  fault: faultLevel
  idleMode: boolean
  manufacturedComponent: Component | undefined
  workload: number
  date: Date
  emitter: SimulationEmitter
  constructor(cfg) {
    this.levelOfUse = 0
    this.id = cfg.id
    this.idleMode = true
    this.fault = { isFault: false, ticksToRemain: 10, currenTick: 0 }
    this.wearOfTheMachine = 100
    this.name = cfg.name || 'default'
    this.workload = cfg.workload || 5
    this.emitter = MyEmitter
  }

  // Exporting Values to SSE
  exportValues(): returnValues {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
      levelOfUse: this.levelOfUse,
      wearOfTheMachine: this.wearOfTheMachine,
      fault: this.fault,
      idleMode: this.idleMode
      // manufacturedComponent: this.manufacturedComponent
    }
  }

  // Set states of values
  setIdleMode(mode: boolean): void {
    this.idleMode = mode
  }

  clearComponenten(): void {
    delete this.manufacturedComponent
    if (getRandomInt(10) >= 8) {
      this.wearOfTheMachine = this.wearOfTheMachine - 3
    }
  }

  pickComponenten(): void {
    this.manufacturedComponent = new Component()
  }

  setFaultMode(mode: boolean): void {
    this.fault.isFault = mode
  }

  // set state of Usage
  calculateLevelOfUse(): void {
    if (this.manufacturedComponent) {
      const Performance = this.manufacturedComponent.getPerfomance()
      const Distance = this.levelOfUse - Performance

      if (Math.abs(Distance) <= 5) {
        this.levelOfUse = Performance
      }
      if (Math.sign(Distance) === -1) {
        this.levelOfUse = this.levelOfUse + 5
      }
      if (Math.sign(Distance) === (1 || 0)) {
        this.levelOfUse = this.levelOfUse - 5
      }
    } else {
      if (this.levelOfUse >= 5) {
        this.levelOfUse = this.levelOfUse - 5
        this.levelOfUse.toFixed(2)
      } else {
        this.levelOfUse = 0
      }
    }
  }

  // set one trip
  manufactureTrip(): void {
    if (this.manufacturedComponent) {
      if (this.manufacturedComponent.isFinished()) {
        this.setIdleMode(true)
        this.clearComponenten()
      } else {
        this.manufacturedComponent.manufacturedTrip()
      }
    }
  }

  setEngineToFaultMode(): void {
    this.setFaultMode(true)
    this.setIdleMode(true)
    this.clearComponenten()
    this.wearOfTheMachine = 0
    this.levelOfUse = 0
  }

  setEngineToWorkingMode(): void {
    this.setFaultMode(false)
    this.fault.currenTick = 0
    this.wearOfTheMachine = 100
  }

  possiblyDefective(input: number): void {
    if (getRandomInt(1000) >= input) {
      this.setEngineToFaultMode()
    }
  }

  maintenance() {
    if (this.fault.currenTick === this.fault.ticksToRemain) {
      this.setEngineToWorkingMode()
    } else {
      this.fault.currenTick++
    }
  }

  // simulate one trip
  simulate(): void {
    this.date = new Date()
    this.calculateLevelOfUse()
    this.possiblyDefective(this.wearOfTheMachine * 15)
    if (this.fault.isFault) {
      this.maintenance()
    }
    if (
      this.idleMode === true &&
      getRandomInt(10) <= this.workload &&
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
    const RESPOND: IRespond<returnValues> = {
      stream: 'machineStream',
      value: this.exportValues()
    }
    this.emitter.emit('simulation', RESPOND)
  }
}
