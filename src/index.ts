import * as express from 'express'
import * as cors from 'cors'

import Simulation from './Simulation'

const appSim: Simulation = new Simulation()
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
