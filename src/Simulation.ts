import { createConnection } from 'typeorm'

export default class Simulation {
  theLoop: any
  con: any
  constructor() {
    createConnection()
      .then(async connection => {
        this.con = connection
      })
      .catch(error => console.log(error))
  }

  run(ar: any) {
    const t = ar.map((ar: any) => {
      return new ar()
    })

    this.theLoop = setInterval(() => {
      t.map((item: any) => {
        if (item.simulate != undefined) {
          item.simulate()
        }
      })
    }, 100)
  }

  myStopFunction() {
    clearInterval(this.theLoop)
  }
}
