import {
  getRandomInt,
  getRandomIntBetween,
  getRandomIntBetweenIncreasing
} from '../lib'
import MyEmitter, { SimulationEmitter } from '../lib/emitter'

import Simulation, { IRespond, SimulationSkellet } from '../Simulation'

import Companys, { ICompany } from '../../dataset/companys'

export interface IOrderManagerCfg {
  id: string
  name: string
}
export default class OrderManage implements SimulationSkellet {
  private id: string
  private name: string
  private RESPOND: MyOrder[]
  emitter: SimulationEmitter
  private CompanyLength: number
  constructor(cfg: IOrderManagerCfg) {
    this.id = cfg.id
    this.name = cfg.name || 'default'
    this.emitter = MyEmitter
    this.RESPOND = []
    this.CompanyLength = Companys.length
  }

  private pickRandomCompany(): ICompany {
    return Companys[getRandomInt(this.CompanyLength)]
  }

  private createOrders() {
    const resp: { company: ICompany }[] = []

    const valueOfOrders = getRandomIntBetweenIncreasing({
      num: getRandomInt(100),
      out_max: 10
    })
    for (let i = 0; i <= valueOfOrders; i++) {
      resp.push({ company: this.pickRandomCompany() })
    }

    resp.map(params => {})

    this.RESPOND.push({ name: '1' })
  }

  private exportValues() {}

  simulate(): void {
    const RESPOND: IRespond<MyOrder[] | []> = {
      stream: 'order',
      value: [{ name: 'max' }, { name: 'alex' }]
    }
    if (getRandomInt(10) > 8) {
      this.emitter.emit('simulation', RESPOND)
    }
  }
}

// Types

interface MyOrder {
  company: ICompany
  products: Products[]
}

interface Products {}
