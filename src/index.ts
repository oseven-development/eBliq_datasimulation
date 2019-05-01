import 'reflect-metadata'
// import Simulation from './Simulation'
// import { OBJA } from './simulation/'
import { createConnection, Connection, getMongoManager } from 'typeorm'
import { Order } from './entity/Order'

// const x = async () => {
//   //   const simu = new Simulation()
//   //   simu.run([OBJA])

//   //   setTimeout(() => {
//   //     simu.myStopFunction()
//   //   }, 5000)

//   const connection: Connection = await createConnection({
//     type: 'mongodb',
//     host: 'localhost',
//     port: 30001,
//     database: 'test'
//   })
//   const manager = getMongoManager()
//   // const OrderRepository = connection.getRepository(Order)

//   setInterval(() => {
//     // const Order = OrderRepository.create()
//     const myOrder = new Order()
//     myOrder.firstName = 'Timber'
//     myOrder.lastName = 'Saw'
//     console.log(myOrder)
//     // manager.save(myOrder).catch(err => {
//     //   console.log(err)
//     // })
//   }, 1000)
// }
// x()

createConnection()
  .then(async connection => {
    const category1 = new Category()
    category1.name = 'TypeScript'

    const category2 = new Category()
    category2.name = 'Programming'

    const post = new Post()
    post.title = 'Control flow based type analysis'
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`
    post.categories = [category1, category2]

    await connection.mongoManager.save(post)
    console.log('Post has been saved: ', post)

    const loadedPosts = await connection.mongoManager.find(Post)
    console.log('Loaded posts from the database: ', loadedPosts)
  })
  .catch(error => console.log('Error: ', error))
