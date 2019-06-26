import * as express from 'express'
import { Engine, OrderManager, IOrderManagerCfg as IOMCFG } from './entities/'
import MyEmitter, { SimulationEmitter } from './lib/emitter'

const defaultEngine: DefaultConfig[] = [
  { type: 'Engine', id: 'id-123', cfg: { workload: 10, name: 'Druck' } },
  { type: 'Engine', id: 'id-456', cfg: { workload: 10, name: 'Pack' } },
  { type: 'OrderManager', id: '1', cfg: { name: 'Orders' } }
  // { id: 'id-789', name: 'Versand', workload: 10 }
]

class Simulation {
  theLoop: NodeJS.Timeout
  simulationsObjects: Map<String, SimulationSkellet>
  emitter: SimulationEmitter
  isRunning: boolean

  constructor() {
    this.simulationsObjects = new Map()
    this.emitter = MyEmitter
    this.isRunning = false
    this.addAllEntitie()
  }

  makeObj<T>(n: SimulationConstructable<T>, cfg: T) {
    return new n(cfg)
  }

  pushEntitie(id: String, entitie: SimulationSkellet) {
    this.simulationsObjects.set(id, entitie)
  }

  addAllEntitie() {
    defaultEngine.map((config: DefaultConfig) => {
      const newCfg = { ...config.cfg, id: config.id }
      switch (config.type) {
        case 'Engine':
          const EG = this.makeObj<{}>(Engine, newCfg)
          this.pushEntitie(config.id, EG)
          break
        case 'OrderManager':
          const OM = this.makeObj<IOMCFG>(OrderManager, newCfg)
          this.pushEntitie(config.id, OM)
          break
        default:
          break
      }
    })
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
    let sseID: number = 1
    this.emitter.on('simulation', (result: IRespond<any>) => {
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

export default Simulation

// Styles

export interface SimulationSkellet {
  simulate: Function
  emitter: SimulationEmitter
}

interface SimulationConstructable<T> {
  new (cfg: T): SimulationSkellet
}

export interface IRespond<T> {
  stream: string
  value: T
}

export interface DefaultConfig {
  type: string
  id: string
  cfg: any
}
