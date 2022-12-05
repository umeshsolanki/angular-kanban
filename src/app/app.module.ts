import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesKanbanComponent } from './sales-kanban/sales-kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SalesKanbanComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    DragDropModule, HttpClientModule,
    DialogModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {



 }
