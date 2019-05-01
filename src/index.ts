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
    let i = 1
    setInterval(async () => {
      const myOrder = new Order()
      const val = i
      myOrder.name = 'max'
      myOrder.orderId = val
      myOrder.value = Math.random()
      i++
      await connection.mongoManager.save(myOrder)
    }, Number(process.env.speed) || 1)
  })
  .catch(error => console.log('Error: ', error))
