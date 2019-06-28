import {
  getRandomInt,
  getRandomIntBetween,
  getRandomIntBetweenIncreasing
} from '../lib'

import Simulation, { SimulationSkellet } from '../Simulation'

import Companys, { ICompany } from '../dataset/companys'

export interface ICfg {
  id: string
  name: string
}
export interface IRespond {
  stream: string
  // @FIXME delete any!
  value: MyOrder[] | [] | any
}
export default class OrderManage extends Simulation<IRespond>
  implements SimulationSkellet {
  private id: string
  private name: string
  private RESPOND: MyOrder[]
  private CompanyLength: number
  constructor(cfg: ICfg) {
    super()
    this.id = cfg.id
    this.name = cfg.name || 'default'
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

    // this.RESPOND.push({ name: '1' })
  }

  private exportValues() {}

  simulate(): void {
    const RESPOND: IRespond = {
      stream: 'order',
      value: [{ name: 'max' }, { name: 'alex' }]
    }
    if (getRandomInt(10) > 8) {
      this.emitter.emit('simulation', RESPOND)
    }
  }
}

class xxx extends Simulation<{ stream: string; value: { name: string } }>
  implements SimulationSkellet {
  simulate() {
    this.publish({ stream: 'a', value: {} })
  }
}

// Types

interface MyOrder {
  company: ICompany
  products: Products[]
}

interface Products {}
