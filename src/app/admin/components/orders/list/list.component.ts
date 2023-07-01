import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Listproduct } from 'src/app/contracts/listproduct';
import { ListOrder } from 'src/app/contracts/order/listorder';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice','cratedDate','completed','viewDetail','delete'];
  dataSource : MatTableDataSource<ListOrder> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(spinner:NgxSpinnerService,
    private orderService:OrderService,
    private alertifyService:AlertifyService,
    private dialogServive:DialogService
    ) {super(spinner) }

 async getOrders(){
  this.showSpinner(SpinnerType.BallAtom);
  const allOrders: {totalOrderCount:number;orders:ListOrder[]}= await  this.orderService.getAllOrders(this.paginator? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize:5,
    ()=>this.hideSpinner(SpinnerType.BallAtom),(errorMessage:any)=>
     this.alertifyService.message(errorMessage.message,
       {
         dissmissOthers:true,
         messageType:MessageType.Error,
         position:Position.TopRight
       }))
     
  this.dataSource= new MatTableDataSource<ListOrder>(allOrders.orders);
  this.paginator.length=allOrders.totalOrderCount;
 } 

// delete(id){
//   alert(id)
// }


 async pageChanged() {
  await this.getOrders();
}


  async ngOnInit(){
    await this.getOrders();
  }


showDetail(id:string){
  this.dialogServive.openDialog({
  componentType:OrderDetailDialogComponent,
  data:id,
  options:{
    width:"850px"
  }
  });
}


}
