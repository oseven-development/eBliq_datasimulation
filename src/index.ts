import * as express from 'express'
import * as cors from 'cors'
import Simulation from './Simulation'
import { Engine, IEngineConfig, OrderManager } from './entities/'

require('dotenv').config()

if (Boolean('')) {
  console.log('object')
}

const appSim = new Simulation()
const appExp: express.Application = express()

const UPTIME: Date = new Date()
const PORT: number = 8080

//TODO: User handling -> Connection entfernen wenn closed, etc -> siehe master branch oder
//TODO: https://github.com/kljensen/node-sse-example/blob/master/app.js

// Set Corsheader
const SSE_RESPONSE_HEADER = {
  Connection: 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
}

// enable cors
appExp.use(cors())

appExp.get('/', (req: express.Request, res: express.Response) => {
  res.json({ index: 'index', UPTIME })
})

// start simulation
appExp.get('/start', (req: express.Request, res: express.Response) => {
  appSim.start()
  res.json({ state: 'start' })
})

// stopp simulation
appExp.get('/stopp', (req: express.Request, res: express.Response) => {
  appSim.stopp()
  res.json({ state: 'stopp' })
})

// build new SSE stream
appExp.get('/connect', (req: express.Request, res: express.Response) => {
  res.writeHead(200, SSE_RESPONSE_HEADER)
  appSim.sendSSEStream(res)
})

// start express
appExp.listen(Number(process.env.port) || PORT, () => {
  console.log(`server started at http://localhost:${process.env.port || PORT}`)
})

module.exports = appExp

const defaultEngine: IEngineConfig[] = [
  {
    id: 'id-123',
    name: 'Druck',
    workload: 5,
    absolutTempLimit: 150,
    damageTempLimit: 90,
    heathboost: 5,
    tempIncrease: 9,
    compensationLevel: [70, 90, 80],
    tempDecreasePerTick: 5,
    AIEnabled: true
  },
  {
    id: 'id-456',
    name: 'Pack',
    workload: 5,
    absolutTempLimit: 150,
    damageTempLimit: 90,
    heathboost: 5,
    tempIncrease: 9,
    compensationLevel: [70, 90, 80],
    tempDecreasePerTick: 5,
    AIEnabled: false
    // absolutTempLimit: 200,
    // damageTempLimit: 150,
    // heathboost: 10,
    // tempIncrease: 2,
    // compensationLevel: [70, 70, 80],
    // tempDecreasePerTick: 10,
    // AIEnabled: false
  }
  // {
  //   id: 'id-789',
  //   name: 'Versand',
  //   workload: 7,
  //   absolutTempLimit: 100,
  //   damageTempLimit: 70,
  //   heathboost: 8,
  //   tempIncrease: 2,
  //   compensationLevel: [70, 90, 80],
  //   tempDecreasePerTick: 3,
  //   AIEnabled: false
  // }
]

defaultEngine.map(myEngine => {
  const M1 = appSim.makeObj<IEngineConfig>(Engine, myEngine)
  appSim.pushEntitie(myEngine.id, M1)
})

// const EG2 = appSim.makeObj<{ id: string; name: string }>(OrderManager, {
//   id: '1',
//   name: 'Orders'
// })
// appSim.pushEntitie('id1234', EG2)
