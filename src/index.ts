import * as express from 'express'
import * as cors from 'cors'

import { Engine } from './entities/'
import Simulation from './Simulation'

const appSim: Simulation = new Simulation()
const appExp: express.Application = express()

//TODO: User handling -> Connection entfernen wenn closed, etc -> siehe master branch oder
//TODO: https://github.com/kljensen/node-sse-example/blob/master/app.js

const defaultEngine = [
  { id: 'id-123', name: 'Druck', workload: 4 },
  { id: 'id-456', name: 'Pack', workload: 3 },
  { id: 'id-789', name: 'Versand', workload: 9 }
]

let clients = {}
let clientId = 0
const SSE_RESPONSE_HEADER = {
  Connection: 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
}
appExp.use(cors())

appExp.get('/', (req: express.Request, res: express.Response) => {
  defaultEngine.map(engine => {
    appSim.pushEntitie(engine.id, new Engine(engine))
  })
  res.json({ index: 'index' })
})

appExp.get('/start', (req: express.Request, res: express.Response) => {
  clients[clientId] = clientId
  clientId++
  console.log(clients)
  res.writeHead(200, SSE_RESPONSE_HEADER)
  defaultEngine.map(engine => {
    appSim.pushEntitie(engine.id, new Engine(engine))
  })
  appSim.start(res)
  // res.json({ index: 'index' })
})

appExp.listen(Number(process.env.port) || 8000, () => {
  console.log(`server started at http://localhost:${process.env.port || 8000}`)
})

module.exports = appExp
