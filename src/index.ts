import * as express from 'express'
import * as cors from 'cors'

import Simulation from './Simulation'
import { Engine, OrderManager, ICfg } from './entities/'

const appSim = new Simulation()
const appExp: express.Application = express()

const UPTIME: Date = new Date()
const PORT: number = 8080

// appSim.start()

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
appSim.start()

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

const defaultEngine = [
  { type: 'Engine', id: 'id-123', cfg: { workload: 10, name: 'Druck' } },
  { type: 'Engine', id: 'id-456', cfg: { workload: 10, name: 'Pack' } }
  // { id: 'id-789', name: 'Versand', workload: 10 }
]
const M1 = appSim.makeObj<{ name: string; id: string; workload: number }>(
  Engine,
  {
    id: 'id-123',
    name: 'Druck',
    workload: 10
  }
)
appSim.pushEntitie('id1235', M1)

const M2 = appSim.makeObj<{ name: string; id: string; workload: number }>(
  Engine,
  {
    id: 'id-123',
    name: 'Pack',
    workload: 10
  }
)
appSim.pushEntitie('id1234', M2)

const EG = appSim.makeObj<{ name: string; id: string; workload: number }>(
  Engine,
  {
    id: 'id-123',
    name: 'Versand',
    workload: 10
  }
)
appSim.pushEntitie('id123', EG)

// const EG2 = appSim.makeObj<{ id: string; name: string }>(OrderManager, {
//   id: '1',
//   name: 'Orders'
// })
// appSim.pushEntitie('id1234', EG2)
