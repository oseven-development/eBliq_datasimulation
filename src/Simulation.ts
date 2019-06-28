import * as express from 'express'
// import { Engine, OrderManager, IOrderManagerCfg as IOMCFG } from './entities/'
import MyEmitter, { SimulationEmitter } from './lib/emitter'

export default class Simulation<R extends IRespond> {
  private theLoop: NodeJS.Timeout
  private simulationsObjects: Map<String, SimulationSkellet>
  public emitter: SimulationEmitter
  private isRunning: boolean

  constructor() {
    this.simulationsObjects = new Map()
    this.emitter = MyEmitter
    this.isRunning = false
    // this.addAllEntitie()
  }

  public makeObj<T>(n: SimulationConstructable<T>, cfg: T) {
    return new n(cfg)
  }

  public pushEntitie(id: String, entitie: SimulationSkellet) {
    this.simulationsObjects.set(id, entitie)
  }

  // addAllEntitie() {
  //   defaultEngine.map((config: DefaultConfig) => {
  //     const newCfg = { ...config.cfg, id: config.id }
  //     switch (config.type) {
  //       case 'Engine':
  //         // const EG = this.makeObj<{}>(Engine, newCfg)
  //         // this.pushEntitie(config.id, EG)
  //         break
  //       case 'OrderManager':
  //         // const OM = this.makeObj<IOMCFG>(OrderManager, newCfg)
  //         // this.pushEntitie(config.id, OM)
  //         break
  //       default:
  //         break
  //     }
  //   })
  // }

  private removeEntitie(id: String) {
    this.simulationsObjects.delete(id)
  }

  // loop auf simulationsObjects und führe simulate aus
  // emitte auf simulation-channel
  private run() {
    this.theLoop = setInterval(() => {
      this.simulationsObjects.forEach((item: SimulationSkellet) => {
        item.simulate()
        // item.simulate().then(result => {
        //   this.emitter.emit('simulation', result)
        // console.log(result)
        // })
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

  publish(RESPOND: IRespond) {
    this.emitter.emit('simulation', RESPOND)
  }

  // connecte auf simulation emitter und sende als SSE-stream
  private sendSSEStream(res: express.Response) {
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
  private start() {
    if (!this.isRunning) {
      this.run()
      this.isRunning = true
    }
  }

  // stopp intervall in der simulations liegt
  private stopp() {
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
