import 'reflect-metadata'
// import Simulation from './Simulation'
// import { OBJA } from './simulation/'
import { createConnection } from 'typeorm'
import { Order } from './entity/Order'
import data from './data/product'
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
      let myOrder = new Order()
      let val = i
      let index = Math.floor(Math.random() * (10 - 1 + 1) + 1)
      myOrder.name = data[index].name
      myOrder.orderId = val
      myOrder.productId = data[index].productId
      myOrder.value = data[index].price
      i++
      await connection.mongoManager.save(myOrder)
    }, Number(process.env.speed) || 400)
  })
  .catch(error => console.log('Error: ', error))
