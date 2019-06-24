const EventEmitter = require('events')

class SimulationEmitter extends EventEmitter {}
export default new SimulationEmitter()
export { SimulationEmitter }
