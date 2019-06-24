export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (+max - +min)) + +min
}

export function getRandomIntBetweenIncreasing(
  num: number,
  in_min: number = 0,
  in_max: number = 10000,
  out_min: number = 0,
  out_max: number = 1000
) {
  const exnum = Math.pow(num, 2)
  return mapper(exnum, in_min, in_max, out_min, out_max)
}

export function mapper(
  num: number,
  in_min: number = 0,
  in_max: number = 10000,
  out_min: number = 0,
  out_max: number = 1000
) {
  return Math.round(
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  )
}
