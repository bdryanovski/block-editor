export function sortArrayBy(field: string): (sideA: any, sideB: any) => number {
  return function(sideA, sideB) {
    if (sideA[field] < sideB[field]) { return -1 }
    if (sideA[field] > sideB[field]) { return 1 }
    return 0
  }
}
