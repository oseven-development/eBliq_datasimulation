import * as express from 'express'
// import { Engine, OrderManager, IOrderManagerCfg as IOMCFG } from './entities/'
import MyEmitter, { SimulationEmitter } from './lib/emitter'

export default class Simulation<R extends IRespond> {
  private theLoop: NodeJS.Timeout
  private simulationsObjects: Map<String, SimulationSkellet> = new Map()
  private isRunning: boolean = false
  emitter: SimulationEmitter = MyEmitter

  constructor() {
    process.env.autostart === 'true' ? this.start() : ''
  }

  makeObj<T>(n: SimulationConstructable<T>, cfg: T) {
    return new n(cfg)
  }

  pushEntitie(id: String, entitie: SimulationSkellet) {
    this.simulationsObjects.set(id, entitie)
  }

  removeEntitie(id: String) {
    this.simulationsObjects.delete(id)
  }

  // loop auf simulationsObjects und führe simulate aus
  // emitte auf simulation-channel
  run() {
    this.theLoop = setInterval(() => {
      this.simulationsObjects.forEach((item: SimulationSkellet) => {
        item.simulate()
        // item.simulate().then(result => {
        //   this.emitter.emit('simulation', result)
        // console.log(result)
        // })
      })
    }, Number(process.env.SimulationSpeed) || 3000)

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

  publish(RESPOND: IRespond) {
    this.emitter.emit('simulation', RESPOND)
  }

  // connecte auf simulation emitter und sende als SSE-stream
  sendSSEStream(res: express.Response) {
    let sseID: number = 1
    this.emitter.on('simulation', (result: R) => {
      res.write(`id: ${sseID}\n`)
      res.write(`event: ${result.stream}\n`)
      res.write(`data: ${JSON.stringify(result.value)}`)
      res.write(`\n\n`)
      sseID++
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

// Styles

export interface SimulationSkellet {
  simulate: Function
  publish: Function
  emitter: SimulationEmitter
}

interface SimulationConstructable<T> {
  new (cfg: T): SimulationSkellet
}

interface IRespond {
  stream: string
  value: object
}
