import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Listproduct } from 'src/app/contracts/listproduct';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock', 'price','cratedDate','updatedDate','photos','qrcode','edit','delete'];
  dataSource : MatTableDataSource<Listproduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(spinner:NgxSpinnerService,
    private productService:ProductService,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
    ) {super(spinner) }

 async getProducts(){
  this.showSpinner(SpinnerType.BallAtom);
  const allProducts: {totalProductCount:number;products:Listproduct[]}= await  this.productService.read(this.paginator? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerType.BallAtom),errorMessage=>
     this.alertifyService.message(errorMessage,
       {
         dissmissOthers:true,
         messageType:MessageType.Error,
         position:Position.TopRight
       }))
     
  this.dataSource= new MatTableDataSource<Listproduct>(allProducts.products);
  this.paginator.length=allProducts.totalProductCount;
 } 

// delete(id){
//   alert(id)
// }
addProductImages(id:string)
{
  this.dialogService.openDialog({
    componentType:SelectProductImageDialogComponent,
    data:id,
    options:{
      width:"800px"
    }
  })
}

 async pageChanged() {
  await this.getProducts();
}


  async ngOnInit(){
    await this.getProducts();
  }


  showQRCode(productId:string)
  {
    this.dialogService.openDialog({

      componentType:QrcodeDialogComponent,
      data:productId,
      afterClosed:()=>{}
    
    })
  }


}
