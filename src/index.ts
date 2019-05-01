import 'reflect-metadata'
// import Simulation from './Simulation'
// import { OBJA } from './simulation/'
import { createConnection, Connection, getMongoManager } from 'typeorm'
import { Order } from './entity/Order'

const x = async () => {
  //   const simu = new Simulation()
  //   simu.run([OBJA])

  //   setTimeout(() => {
  //     simu.myStopFunction()
  //   }, 5000)

  const connection: Connection = await createConnection({
    type: 'mongodb',
    host: 'localhost',
    port: 30001,
    database: 'test'
  })
  const manager = getMongoManager()
  // const OrderRepository = connection.getRepository(Order)

  setInterval(() => {
    // const Order = OrderRepository.create()
    const myOrder = new Order()
    // console.log(myOrder)
    console.log('Order')
  }, 1000)
}
x()
