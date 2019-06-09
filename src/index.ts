import * as express from 'express'
import { Engine } from './entities/'
import Simulation from './Simulation'

const appSim: Simulation = new Simulation()
const appExp: express.Application = express()

const defaultEngine = [
  { id: 'id-123', name: 'Druck', workload: 4 },
  { id: 'id-456', name: 'Pack', workload: 3 },
  { id: 'id-789', name: 'Versand', workload: 9 }
]

appExp.get('/', (req: express.Request, res: express.Response) => {
  defaultEngine.map(engine => {
    appSim.pushEntitie(engine.id, new Engine(engine))
  })
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
