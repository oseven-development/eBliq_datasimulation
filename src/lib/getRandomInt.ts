export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (+max - +min)) + +min
}
