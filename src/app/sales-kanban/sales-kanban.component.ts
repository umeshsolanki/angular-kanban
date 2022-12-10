import {OrdersService} from './orders.service';
import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Dialog} from '@angular/cdk/dialog';
import {Customer, OrderStatus, SellerOrder} from "./sales.modals";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'sales-kanban',
  templateUrl: './sales-kanban.component.html',
  styleUrls: ['./sales-kanban.component.css']
})
export class SalesKanbanComponent {

  newSaleControlData = new FormGroup({
      cust: new FormGroup({
        name: new FormControl(''),
        mob: new FormControl('')
      })
    }
  )
  //let order = {
  //     "id": 2233,
  //     "orderNo": "8975",
  //     "recdOn": new Date(1604082600000),
  //     "toPay": 9300,
  //     "cust": {
  //       "id": 2153,
  //       "mob": "9886882152",
  //       "name": "Michal Raj"
  //     } as Customer
  //   } as SellerOrder
  newOrders: SellerOrder[] = []//[order];
  followupOrders: SellerOrder[] = [];
  serviceOrders: SellerOrder[] = [];
  closedOrders: SellerOrder[] = [];

  constructor(public dialog: Dialog, public orderService: OrdersService) {
  }

  newOrder() {
    let clone = Object.assign({}, this.newSaleControlData.getRawValue() as SellerOrder);
    console.log(clone)
    this.newOrders.push(clone);
  }

  ngOnInit(): void {
    this.orderService.getPage(this.orderService.pageNumber).subscribe(resp => {
      console.log(resp.payload);
      resp.payload.forEach(value => {
        if (value.deliveryStatus == OrderStatus.NEW) {
          this.newOrders.push(value)
        } else if (value.deliveryStatus == OrderStatus.FOLLOWUP) {
          this.followupOrders.push(value)
        } else if (value.deliveryStatus == OrderStatus.SERVICE) {
          this.serviceOrders.push(value)
        } else if (value.deliveryStatus == OrderStatus.CLOSED) {
          this.closedOrders.push(value)
        } else {
          this.newOrders.push(value)
        }
      })
    });
  }

  drop(event: CdkDragDrop<SellerOrder[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item = event.previousContainer.data[event.previousIndex]
      if (event.container.data == this.followupOrders) {
        item.deliveryStatus = OrderStatus.FOLLOWUP
      } else if (event.container.data == this.newOrders) {
        item.deliveryStatus = OrderStatus.NEW
      } else if (event.container.data == this.serviceOrders) {
        item.deliveryStatus = OrderStatus.SERVICE
      } else if (event.container.data == this.closedOrders) {
        item.deliveryStatus = OrderStatus.CLOSED
      } else {
        item.deliveryStatus = OrderStatus.NEW
      }
      this.orderService.update(item).subscribe()
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
