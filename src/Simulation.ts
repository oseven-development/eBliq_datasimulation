import SimulationType from './Simulation.d'

class Simulation {
  theLoop: NodeJS.Timeout
  simulationsObjects: Map<String, Simulation>
  constructor() {
    this.simulationsObjects = new Map()
  }

  pushEntitie(id: String, entitie: any) {
    this.simulationsObjects.set(id, entitie)
  }

  removeEntitie(id: String) {
    this.simulationsObjects.delete(id)
  }

  start() {
    this.theLoop = setInterval(() => {
      this.simulationsObjects.forEach((item: any) => {
        if (item.simulate != undefined) {
          item.simulate().then(result => {
            console.log(result)
          })
        }
      })
      console.log('------------------')
    }, 1000)
  }

  stopp() {
    clearInterval(this.theLoop)
  }
}

export default Simulation
