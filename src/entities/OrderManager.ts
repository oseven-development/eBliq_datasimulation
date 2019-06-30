import {
  getRandomInt,
  getRandomIntBetween,
  getRandomIntBetweenIncreasing
} from '../lib'

import Simulation, { SimulationSkellet } from '../Simulation'

import Companys, { ICompany } from '../dataset/companys'
import Articels, { IArticel } from '../dataset/articels'

const util = require('util')

// Types
export interface IOrderManager {
  id: string
  name: string
  workload: number
}
export interface IRespond {
  stream: string
  // @FIXME delete any!
  value: IMyOrder[]
}

interface IMyOrder {
  company: ICompany
  products: IProducts[]
}
interface IProducts {
  name: string
  price: number
  quantity: number
}

export default class OrderManage extends Simulation<IRespond>
  implements SimulationSkellet {
  private config: IOrderManager

  private CompanyLength: number
  constructor(cfg: IOrderManager) {
    super()
    this.config = cfg
    this.CompanyLength = Companys.length
  }

  private pickRandomCompany(): ICompany {
    return Companys[getRandomInt(this.CompanyLength)]
  }

  private pickArticleSet(company: ICompany): IProducts[] {
    let quantity
    switch (company.size) {
      case 'small':
        quantity = getRandomInt(10)
        break
      case 'mid':
        quantity = getRandomInt(30)
        break
      case 'big':
        quantity = getRandomInt(50)
        break
    }

    let picks: number = 0
    let result: IProducts[] = []
    while (quantity >= picks) {
      const q = getRandomIntBetween(1, 4)
      picks += q

      const q2 = getRandomInt(10)
      switch (true) {
        case q2 < 2:
          result = this.pickArticle('low', result, q)
          break
        case q2 < 5:
          result = this.pickArticle('mid', result, q)
          break
        default:
          result = this.pickArticle('high', result, q)
          break
      }
    }
    return result
  }

  private pickArticle(
    level: 'low' | 'mid' | 'high',
    result: IProducts[],
    q: number
  ): IProducts[] {
    const articleTree = Articels[level][getRandomInt(Articels[level].length)]
    const artikel =
      articleTree.products[getRandomInt(articleTree.products.length)]
    let exist = false
    if (result.length !== 0) {
      result.map((items, index) => {
        if (items.name === artikel.name) {
          result[index].quantity += q
          exist = true
        }
      })
    }
    if (!exist) {
      result.push({ quantity: q, ...artikel })
    }
    return result
  }

  private createOrders() {
    const resp: { company: ICompany; products: IProducts[] }[] = []

    const valueOfOrders = getRandomIntBetweenIncreasing({
      num: getRandomInt(100),
      out_max: 10
    })
    for (let i = 0; i <= valueOfOrders; i++) {
      const company = this.pickRandomCompany()
      const products = this.pickArticleSet(company)
      resp.push({
        company,
        products
      })
    }
    const RESPOND: IRespond = {
      stream: 'order',
      value: resp
    }
    // console.log(util.inspect(RESPOND, false, null, true /* enable colors */))
    this.publish(RESPOND)
  }

  simulate(): void {
    if (this.config.workload > getRandomInt(10)) {
      this.createOrders()
    }
  }
}
