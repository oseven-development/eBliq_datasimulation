import { getRandomInt, getRandomIntBetween, smoothArray } from '../lib'

const Components = [
  { trips: 10, currentTrip: 0, wear: 5 },
  { trips: 10, currentTrip: 0, wear: 5 },
  { trips: 10, currentTrip: 0, wear: 5 }
]

export default class Component {
  PickedPart: any
  performance: number[]
  constructor() {
    this.PickedPart = Components[getRandomInt(Components.length)]
    this.performance = this.calculatePerformanceTrips()
  }

  calculatePerformanceTrips() {
    const array: number[] = []
    for (let i = 0; i === this.PickedPart.tips; i++) {
      array.push(getRandomIntBetween(1, 99))
    }
    return smoothArray(array, 0.85)
  }

  isFinished(): boolean {
    return this.PickedPart.trips === this.PickedPart.currentTrip ? true : false
  }

  manufacturedTrip() {
    this.PickedPart.currentTrip++
  }
}
