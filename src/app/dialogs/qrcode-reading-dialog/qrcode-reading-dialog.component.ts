import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode/public_api';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { OrderService } from 'src/app/services/common/models/order.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { QrcodeService } from 'src/app/services/common/qrcode.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';

declare var $:any ;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent  extends BaseDialog<QrcodeReadingDialogComponent>  implements OnInit,OnDestroy {

  constructor(dialogRef:MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | string , 
    private orderService:OrderService,
    private spinner:NgxSpinnerService,
   private toastrService:CustomToastrService,
   private productService:ProductService
   ) {
    super(dialogRef);
  }
  

@ViewChild("scanner",{static:true}) scanner:NgxScannerQrcodeComponent;
@ViewChild("txtStock",{static:true}) txtStock:ElementRef;



  ngOnInit(): void {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e)
  {
  this.spinner.show(SpinnerType.BallAtom)
    const data:any =((e as{data:string}).data);

    if (data !=null && data !="")
    {
      const jsonData=JSON.parse(data)
      const stockValue= (this.txtStock.nativeElement as HTMLInputElement).value;
      this.productService.updateStockQrCodeToProduct(jsonData.Id,parseInt(stockValue),()=>{
        $("#btnClose").click();
        this.toastrService.message( `${jsonData.Name} ürünün stok bilgisi '${stockValue}' olarak güncellenmiştir.`,"Stok bilgisi güncellendi",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        });
        this.spinner.hide(SpinnerType.BallAtom)
      });

    }
  }
}
