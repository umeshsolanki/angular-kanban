export interface BaseResponseModel<T> {
  payload:T
  success:boolean
  msg:string
}
