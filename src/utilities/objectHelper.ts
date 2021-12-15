const toObjectString = Object.prototype.toString

export const isExactObject = (data: any) => {
  return (
    typeof data === 'object' && toObjectString.call(data) === '[object Object]'
  )
}
