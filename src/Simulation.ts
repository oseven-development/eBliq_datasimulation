import SimulationType from './Simulation.d'
import * as express from 'express'
// import EventEmitter from 'events'
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}
class Simulation {
  theLoop: NodeJS.Timeout
  simulationsObjects: Map<String, Simulation>
  sseID: number
  emitter: MyEmitter
  constructor() {
    this.simulationsObjects = new Map()
    this.sseID = 1
    this.emitter = new MyEmitter()
  }

  pushEntitie(id: String, entitie: any) {
    this.simulationsObjects.set(id, entitie)
  }

  removeEntitie(id: String) {
    this.simulationsObjects.delete(id)
  }

  start() {
    this.theLoop = setInterval(() => {
      this.simulationsObjects.forEach((item: any) => {
        if (item.simulate != undefined) {
          item.simulate().then(result => {
            this.emitter.emit('simulation', result)
          })
        }
      })
    }, 2000)
  }

  sendSSEStream(res: express.Response) {
    this.emitter.on('simulation', result => {
      const event = 'machineStream'
      res.write(`id: ${this.sseID}\n`)
      res.write(`event: ${event}\n`)
      res.write(`data: ${JSON.stringify(result)}`)
      res.write(`\n\n`)
      this.sseID++
    })
  }

  stopp() {
    clearInterval(this.theLoop)
  }
}

export default Simulation
