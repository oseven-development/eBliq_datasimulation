// import * as number from './getRandomInt.d'

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (+max - +min)) + +min
}

export function getRandomIntBetweenIncreasing(INPUT: IMapper): number {
  INPUT.num = Math.pow(INPUT.num, 2)
  return mapper(INPUT)
}

interface IMapper {
  in_min?: number
  in_max?: number
  out_min?: number
  out_max?: number
  num: number
}
interface IMapperFull extends IMapper {
  in_min: number
  in_max: number
  out_min: number
  out_max: number
}

export function mapper(args: IMapper): number {
  const DEFAULT = {
    in_min: 0,
    in_max: 10000,
    out_min: 0,
    out_max: 1000
  }
  const returnedTarget: IMapperFull = Object.assign(DEFAULT, args)

  const { num, in_min, out_max, out_min, in_max } = returnedTarget
  return Math.round(
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  )
}
