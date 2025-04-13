export const PRODUCT_CATEGORIES = [
  "Baby Toiletries",
  "Feeding Accessories",
  "Carry Nests",
  "Baby Wearing",
  "Toys"
] as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]

export enum ProductCategory {
  TOILETRIES = "toiletries",
  FEEDING = "feeding",
  WEARING = "wearing",
  NESTS = "nests",
  TOYS = "toys"
} 