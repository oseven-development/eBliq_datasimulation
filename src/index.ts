import 'reflect-metadata'
// import Simulation from './Simulation'
// import { OBJA } from './simulation/'
import { createConnection } from 'typeorm'
import { Order } from './entity/Order'

// const x = async () => {
//   //   const simu = new Simulation()
//   //   simu.run([OBJA])

//   //   setTimeout(() => {
//   //     simu.myStopFunction()
//   //   }, 5000)
// x()

createConnection()
  .then(async connection => {
    setInterval(async () => {
      const myOrder = new Order()
      myOrder.name = Math.random()
      myOrder.value = Math.random()
      await connection.mongoManager.save(myOrder)
    }, Number(process.env.speed) || 1000)
  })
  .catch(error => console.log('Error: ', error))
