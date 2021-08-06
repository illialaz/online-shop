export type Attribute = {
  key: string
  value: string[]
  type: string
}

export type Product = {
  id: string
  name: string
  brand: string
  prices: Record<string, number>
  photoes: string[]
  attributes: Attribute[]
  description: string
  inStock: boolean
}
