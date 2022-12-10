import { Injectable } from '@angular/core';
import { ErpHttpService } from '../common/erpHttpCommon.service';
import { HttpClient } from '@angular/common/http';
import {SellerOrder} from "./sales.modals";

@Injectable({ providedIn: 'root' })
export class OrdersService extends ErpHttpService<SellerOrder> {

  moduleUrl(): string {
    return "sellersOrder"
  }

  constructor(http: HttpClient) {
    super(http)
  }

}
