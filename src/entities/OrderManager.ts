import {
  getRandomInt,
  getRandomIntBetween,
  getRandomIntBetweenIncreasing
} from '../lib'
import MyEmitter, { SimulationEmitter } from '../lib/emitter'

import { returnValues, MyOrder } from './OrderManager.d'
import { IRespond } from '../Simulation.d'
import { json } from 'body-parser'

export default class OrderManager {
  id: string
  name: string
  emitter: SimulationEmitter
  constructor(cfg) {
    this.id = cfg.id
    this.name = cfg.name || 'default'
    this.emitter = MyEmitter
  }

  createOrders() {
    const valueOfOrders = getRandomIntBetweenIncreasing(
      getRandomInt(100),
      0,
      10000,
      0,
      10
    )
  }

  exportValues() {}

  simulate(): void {
    const RESPOND: IRespond<[MyOrder] | []> = {
      stream: 'order',
      value: [{}]
    }
    if (getRandomInt(10) > 8) {
      this.emitter.emit('simulation', RESPOND)
    }
  }
}
