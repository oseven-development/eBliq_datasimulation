import Simulation from '../Simulation'
import { Order } from '../entity/Order'

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables

export default class Obj extends Simulation {
  constructor() {
    super()
  }
  async simulate() {
    const user = new Order()
    user.lastName = 'Saw'
    user.age = 25
    this.con.manager.save(user).then(user => {
      console.log(user.id, user.firstName)
    })
  }
}
