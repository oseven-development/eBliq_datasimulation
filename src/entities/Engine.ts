import Simulation from '../Simulation'

import { getRandomInt, getRandomIntBetween } from '../lib'

export default class Engine extends Simulation {
  id: string
  name: string
  levelOfUse: number
  wearOfTheMachine: number
  fault: boolean
  idleMode: boolean
  manufacturedComponent: any
  workload: number
  constructor(cfg) {
    super()
    this.id = cfg.id
    this.idleMode = true
    this.wearOfTheMachine = 100
    this.name = cfg.name || 'default'
    this.workload = cfg.workload || 5
  }
  pickComponenten() {
    if (this.idleMode === true && getRandomInt(10) > this.workload) {
      this.idleMode = false
      this.manufacturedComponent = { trips: 10, currentTrip: 0, wear: 5 }
    }
  }

  manufactureTrip() {
    if (this.idleMode === false) {
      if (
        this.manufacturedComponent.trips ===
        this.manufacturedComponent.currentTrip
      ) {
        this.startIdleMode()
      } else {
        this.manufacturedComponent.currentTrip++
        this.levelOfUse = getRandomIntBetween(10, 90)
      }
    }
  }

  startIdleMode() {
    if (this.wearOfTheMachine >= this.manufacturedComponent.wear) {
      this.wearOfTheMachine =
        this.wearOfTheMachine - this.manufacturedComponent.wear
    }
    this.levelOfUse = 0
    this.manufacturedComponent = {}
    this.idleMode = true
  }

  exportValues() {
    return {
      id: this.id,
      name: this.name,
      levelOfUse: this.levelOfUse,
      wearOfTheMachine: this.wearOfTheMachine,
      fault: this.fault,
      idleMode: this.idleMode,
      manufacturedComponent: this.manufacturedComponent
    }
  }

  simulate() {
    this.pickComponenten()
    this.manufactureTrip()
    return new Promise((resolve, recect) => {
      resolve(this.exportValues())
    })
  }
}
