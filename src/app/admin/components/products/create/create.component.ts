import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Createproduct } from 'src/app/contracts/createproduct';
import { ProductService } from 'src/app/services/common/models/product.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private alertify:AlertifyService, private productService:ProductService) {
    super(spinner)
   }

  ngOnInit(): void {}

     @Output() createdProduct:EventEmitter<Createproduct>= new EventEmitter();
    


    create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
      this.showSpinner(SpinnerType.BallAtom);
      const createproduct: Createproduct = new Createproduct();
      createproduct.name = name.value;
      createproduct.stock = parseInt(stock.value);
      createproduct.price = parseFloat(price.value);

    

  this.productService.create(createproduct,()=>{
    this.hideSpinner(SpinnerType.BallAtom);
  this.alertify.message("Ürün başarıyla eklenmiştir.",
  {
    dissmissOthers:true,
    messageType:MessageType.Success,
    position:Position.TopRight
  });
   this.createdProduct.emit(createproduct);
},errorMesage=>{
  this.alertify.message(errorMesage,{
    dissmissOthers:true,
    messageType:MessageType.Error,
    position:Position.BottomRight
  });
});
 }

}
