import { Product } from './product'

export type CartItem = Product & {
  ownAttributes: Record<string, string>
  count: number
}
