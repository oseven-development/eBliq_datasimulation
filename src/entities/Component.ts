import { getRandomInt, getRandomIntBetween, smoothArray } from '../lib'

interface Part {
  name: string
  trips: number
  currentTrip: number
  wear: number
  // minWorkload: number
  // maxWorkload: number
  minWorkload: number
  maxWorkload: number
  needWorkload: number
}

const Parts: Part[] = [
  {
    name: 'TeilA',
    trips: 10,
    currentTrip: 0,
    wear: 5,

    minWorkload: 30,
    maxWorkload: 90,
    needWorkload: 700
  }
  // {
  //   name: 'Teil B',
  //   trips: 10,
  //   currentTrip: 0,
  //   wear: 5,
  //   minWorkload: 40,
  //   maxWorkload: 70,
  //   minWorkload2: 30,
  //   maxWorkload2: 50,
  //   needWorkload: 600
  // },
  // {
  //   name: 'Teil C',
  //   trips: 10,
  //   currentTrip: 0,
  //   wear: 5,
  //   minWorkload: 70,
  //   maxWorkload: 100,
  //   minWorkload2: 30,
  //   maxWorkload2: 30,
  //   needWorkload: 3000
  // }
]

export default class Component {
  PickedPart: Part
  performance: number[]
  degreeOfCompletion: number
  constructor() {
    this.PickedPart = Object.assign({}, Parts[getRandomInt(Parts.length)])
    // this.performance = this.calculatePerformanceTrips()
    this.degreeOfCompletion = 0
  }

  // calculatePerformanceTrips() {
  //   const array: number[] = []
  //   const min = this.PickedPart.minWorkload
  //   const max = this.PickedPart.maxWorkload
  //   for (let i = 0; i <= this.PickedPart.trips; i++) {
  //     array.push(getRandomIntBetween(min, max))
  //   }
  //   return smoothArray(array, 0.85)
  // }

  isFinished(): boolean {
    return this.PickedPart.needWorkload < this.degreeOfCompletion ? true : false
    // return this.PickedPart.trips === this.PickedPart.currentTrip ? true : false
  }

  // getPerfomance(): number {
  //   return this.performance[this.PickedPart.currentTrip]
  // }

  manufacturedTrip(workload: number): void {
    const { minWorkload, maxWorkload } = this.PickedPart
    if (workload >= minWorkload && workload <= maxWorkload) {
      this.degreeOfCompletion += workload
    }
  }
  getName(): string {
    return this.PickedPart.name
  }
  getMaxWorkload(): number {
    return this.PickedPart.maxWorkload
  }

  getMinWorkload(): number {
    return this.PickedPart.minWorkload
  }
}
