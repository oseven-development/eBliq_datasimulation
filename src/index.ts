import 'reflect-metadata'
import Simulation from './Simulation'
import { OBJA } from './simulation/'

const x = async () => {
  const simu = new Simulation()
  simu.run([OBJA])

  setTimeout(() => {
    simu.myStopFunction()
  }, 5000)
}

x()
