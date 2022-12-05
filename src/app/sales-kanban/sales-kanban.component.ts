import { OrdersService } from './orders.service';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { SellerOrder } from './orders.service';

@Component({
  selector: 'sales-kanban',
  templateUrl: './sales-kanban.component.html',
  styleUrls: ['./sales-kanban.component.css']
})
export class SalesKanbanComponent {

  ngOnInit(): void {
    console.log("OnInit");
    this.orderService.get().subscribe(resp=>{
      console.log(resp);
    });

  }

  constructor(public dialog: Dialog,public orderService:OrdersService) { }

  newTarget: SellerOrder = { name: "", mob: "" };
  newOrders: SellerOrder[] = [];
  followupOrders: SellerOrder[] = [];
  serviceOrders: SellerOrder[] = [];
  closedOrders: SellerOrder[] = [];

  newOrder(target:SellerOrder) {
    var clone = Object.assign({}, target);
    this.newOrders.push(clone);
  }

  drop(event: CdkDragDrop<SellerOrder[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
