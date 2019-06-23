export default function(values: number[], alpha: number): number[] {
  const weighted = average(values) * alpha
  const smoothed: number[] = []
  values.map((i: number, index: number) => {
    const curr = values[index]
    const prev = smoothed[index - 1] || values[values.length - 1]
    const next = curr || values[0]
    const improved = Number(average([weighted, prev, curr, next]).toFixed(2))
    smoothed.push(improved)
  })
  return smoothed
}

function average(data: number[]): number {
  const sum = data.reduce((sum: number, value: number): number => {
    return sum + value
  }, 0)
  return sum / data.length
}
