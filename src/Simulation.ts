import * as express from 'express'
import { Engine } from './entities/'
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const defaultEngine = [
  { id: 'id-123', name: 'Druck', workload: 10 }
  // { id: 'id-456', name: 'Pack', workload: 10 },
  // { id: 'id-789', name: 'Versand', workload: 10 }
]
class Simulation {
  theLoop: NodeJS.Timeout
  simulationsObjects: Map<String, Simulation>
  sseID: number
  emitter: MyEmitter
  isRunning: boolean
  constructor() {
    this.simulationsObjects = new Map()
    this.sseID = 1
    this.emitter = new MyEmitter()
    this.isRunning = false
    defaultEngine.map(engine => {
      this.pushEntitie(engine.id, new Engine(engine))
    })
  }

  pushEntitie(id: String, entitie: any) {
    this.simulationsObjects.set(id, entitie)
  }

  removeEntitie(id: String) {
    this.simulationsObjects.delete(id)
  }

  // loop auf simulationsObjects und führe simulate aus
  // emitte auf simulation-channel
  run() {
    this.theLoop = setInterval(() => {
      this.simulationsObjects.forEach((item: any) => {
        if (item.simulate != undefined) {
          item.simulate().then(result => {
            this.emitter.emit('simulation', result)
            // console.log(result)
          })
        }
      })
    }, Number(process.env.SimulationSpeed) || 500)

    // for (let i = 0; i <= 1000; i++) {
    //   this.simulationsObjects.forEach(async (item: any) => {
    //     if (item.simulate != undefined) {
    //       await item.simulate().then(result => {
    //         this.emitter.emit('simulation', result)
    //         i++
    //         // console.log(result)
    //       })
    //     }
    //   })
    // }
  }

  // connecte auf simulation emitter und sende als SSE-stream
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

  // call run damit simulations startet
  start() {
    if (!this.isRunning) {
      this.run()
      this.isRunning = true
    }
  }

  // stopp intervall in der simulations liegt
  stopp() {
    clearInterval(this.theLoop)
    this.isRunning = false
  }
}

export default Simulation
