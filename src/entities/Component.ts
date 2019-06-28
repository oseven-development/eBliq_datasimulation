import { getRandomInt, getRandomIntBetween, smoothArray } from '../lib'

interface Part {
  name: string
  trips: number
  currentTrip: number
  wear: number
  minWorkload: number
  maxWorkload: number
}

const Parts: Part[] = [
  // {
  //   name: 'Teil A',
  //   trips: 10,
  //   currentTrip: 0,
  //   wear: 5,
  //   minWorkload: 5,
  //   maxWorkload: 50
  // },
  // {
  //   name: 'Teil B',
  //   trips: 10,
  //   currentTrip: 0,
  //   wear: 5,
  //   minWorkload: 40,
  //   maxWorkload: 70
  // },
  {
    name: 'Teil C',
    trips: 10,
    currentTrip: 0,
    wear: 5,
    minWorkload: 70,
    maxWorkload: 100
  }
]

export default class Component {
  PickedPart: Part
  performance: number[]
  constructor() {
    this.PickedPart = Object.assign({}, Parts[getRandomInt(Parts.length)])
    this.performance = this.calculatePerformanceTrips()
  }

  calculatePerformanceTrips() {
    const array: number[] = []
    const min = this.PickedPart.minWorkload
    const max = this.PickedPart.maxWorkload
    for (let i = 0; i <= this.PickedPart.trips; i++) {
      array.push(getRandomIntBetween(min, max))
    }
    return smoothArray(array, 0.85)
  }

  isFinished(): boolean {
    return this.PickedPart.trips === this.PickedPart.currentTrip ? true : false
  }

  getPerfomance(): number {
    return this.performance[this.PickedPart.currentTrip]
  }

  manufacturedTrip() {
    this.PickedPart.currentTrip++
  }
}
