export type Attribute = {
  key: string
  value: string[]
  type: string
}

export type Product = {
  name: string
  prices: Record<string, number>
  photoes: string[]
  attributes: Attribute[]
  description: string
  inStock: boolean
}
