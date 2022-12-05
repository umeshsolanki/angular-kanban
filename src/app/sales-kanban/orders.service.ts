import { Injectable } from '@angular/core';
import { ErpHttpService } from '../common/erpHttpCommon.service';
import { HttpClient } from '@angular/common/http';

export interface SellerOrder {
  name: string
  mob: string
}

@Injectable({ providedIn: 'root' })
export class OrdersService extends ErpHttpService<SellerOrder> {

  moduleUrl(): string {
    return "sellerOrder"
  }

  constructor(http: HttpClient) {
    super(http)
  }

}
