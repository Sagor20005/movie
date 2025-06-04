function SeparateProduct (products, par = 10) {
  if (products && Array.isArray(products)) {
    const fainalArr = []
    let index = 0
    const loop = products.length / par +1
    for (let i = 1; i <= loop; i++) {
      const temp = products.slice(index, index+par)
      if (temp) {
        fainalArr.push(temp)
      }
      index += par
    }
    return fainalArr
  }
  return null
}

export default SeparateProduct;