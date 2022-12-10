export interface Customer {
  id: number
  name: string
  mob: string
  email: string
}

export interface SellerOrder {
  id: number
  recdOn: Date
  toPay: number
  orderNo: string
  deliveryStatus: OrderStatus
  cust: Customer
}

export enum OrderStatus {
  NEW = "new",
  FOLLOWUP = "followup",
  SERVICE = "service",
  CLOSED = "completed"
}
