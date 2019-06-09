import * as express from 'express'
import { Engine } from './entities/'
import Simulation from './Simulation'

const appSim: Simulation = new Simulation()
const appExp: express.Application = express()

appExp.get('/', (req: express.Request, res: express.Response) => {
  appSim.pushEntitie(String(Math.random()), new Engine({}))
  res.json({ index: 'index' })
})

appExp.get('/start', (req: express.Request, res: express.Response) => {
  appSim.start()
  res.json({ index: 'index' })
})

appExp.listen(Number(process.env.port) || 8000, () => {
  console.log(`server started at http://localhost:${process.env.port || 8000}`)
})

module.exports = appExp
