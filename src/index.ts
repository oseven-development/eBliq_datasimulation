import * as express from 'express'
import * as cors from 'cors'
import Simulation from './Simulation'
import { Engine, IEngineConfig, OrderManager, IOrderManager } from './entities/'

require('dotenv').config()

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

const map = new Map()
// build new SSE stream
appExp.get('/connect', (req: express.Request, res: express.Response) => {
  const id = Math.random()
  appSim.start()
  map.set(id, req)
  req.on('close', function() {
    map.delete(id)
    if (map.size === 0) {
      appSim.stopp()
      console.log('STOPPP')
    }
  })
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

    absolutTempLimit: 200,
    damageTempLimit: 150,
    heathboost: 10,
    tempIncrease: 2,
    compensationLevel: [70, 70, 80],
    tempDecreasePerTick: 10,
    AIEnabled: false
  },
  {
    id: 'id-789',
    name: 'Versand',
    workload: 7,
    absolutTempLimit: 100,
    damageTempLimit: 70,
    heathboost: 8,
    tempIncrease: 2,
    compensationLevel: [70, 90, 80],
    tempDecreasePerTick: 3,
    AIEnabled: false
  }
]

defaultEngine.map(myEngine => {
  const M1 = appSim.makeObj<IEngineConfig>(Engine, myEngine)
  appSim.pushEntitie(myEngine.id, M1)
})

const EG2 = appSim.makeObj<IOrderManager>(OrderManager, {
  id: '1',
  name: 'Orders',
  workload: 2
})
appSim.pushEntitie('id-1', EG2)
