export interface Donation {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  amount: number
  type: string
  payment_method?: string
  recurring?: boolean
  created_at?: string
}
