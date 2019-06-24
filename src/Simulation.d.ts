export declare class Simulation {
  constructor()
  theLoop: String

  simulate(): void

  test(): Number
}

export interface IRespond<T> {
  stream: string
  value: T
}
