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

  start(res) {
    let i = 0
    this.theLoop = setInterval(() => {
      this.simulationsObjects.forEach((item: any) => {
        if (item.simulate != undefined) {
          item.simulate().then(result => {
            // console.log(result)
            i++
            const event = 'machineStream'
            res.write(
              `id: ${i}\nevent: ${event}\ndata: ${JSON.stringify(result)}\n\n`
            )
          })
        }
      })
      // console.log('------------------')
    }, 2000)
  }

  stopp() {
    clearInterval(this.theLoop)
  }
}

export default Simulation
