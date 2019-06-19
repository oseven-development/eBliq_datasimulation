import { getRandomInt, getRandomIntBetween } from '../lib'
import { Component } from './'

export default class Engine {
  id: string
  name: string
  levelOfUse: number
  wearOfTheMachine: number
  fault: boolean
  idleMode: boolean
  manufacturedComponent: Component | undefined
  workload: number
  date: Date
  constructor(cfg) {
    this.id = cfg.id
    this.idleMode = true
    this.wearOfTheMachine = 100
    this.name = cfg.name || 'default'
    this.workload = cfg.workload || 5
  }

  setIdleMode(mode: boolean) {
    this.idleMode = mode
  }

  clearComponenten() {
    this.manufacturedComponent = undefined
  }

  pickComponenten() {
    this.manufacturedComponent = new Component()
  }

  calculateLevelOfUse() {}

  manufactureTrip() {
    if (this.manufacturedComponent) {
      if (this.manufacturedComponent.isFinished()) {
        this.setIdleMode(true)
        this.clearComponenten()
      } else {
        this.manufacturedComponent.manufacturedTrip()
        this.calculateLevelOfUse()
      }
    }

    // if (
    //   this.manufacturedComponent.trips ===
    //   this.manufacturedComponent.currentTrip
    // ) {
    //   this.startIdleMode()
    // } else {
    //   this.manufacturedComponent.currentTrip++
    //   this.levelOfUse = getRandomIntBetween(10, 90)
    // }
  }

  // startIdleMode() {
  //   if (this.wearOfTheMachine >= this.manufacturedComponent.wear) {
  //     this.wearOfTheMachine =
  //       this.wearOfTheMachine - this.manufacturedComponent.wear
  //   }
  //   this.levelOfUse = 0
  //   this.manufacturedComponent = {}
  //   this.idleMode = true
  // }

  exportValues() {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
      levelOfUse: this.levelOfUse,
      wearOfTheMachine: this.wearOfTheMachine,
      fault: this.fault,
      idleMode: this.idleMode,
      manufacturedComponent: this.manufacturedComponent
    }
  }

  simulate() {
    if (this.idleMode === true && getRandomInt(10) > this.workload) {
      this.setIdleMode(false)
      this.pickComponenten()
    }
    if (this.idleMode === false && this.manufacturedComponent) {
      this.manufactureTrip()
    }
    this.date = new Date()
    return new Promise((resolve, recect) => {
      resolve(this.exportValues())
    })
  }
}
