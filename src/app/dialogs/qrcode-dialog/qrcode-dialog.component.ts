import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { OrderService } from 'src/app/services/common/models/order.service';
import { QrcodeService } from 'src/app/services/common/qrcode.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {

  constructor(dialogRef:MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | string , 
    private orderService:OrderService,
    private spinner:NgxSpinnerService,
    private qrCodeService:QrcodeService,
    private domSanitizer:DomSanitizer
    ) {
    super(dialogRef);
  }


qrCodeSafeUrl:SafeUrl;
  async ngOnInit(){
    this.spinner.show(SpinnerType.BallAtom)
    const qrCodeBlob:Blob=await this.qrCodeService.generateQRCode(this.data);
    const url:string = URL.createObjectURL(qrCodeBlob);
  this.qrCodeSafeUrl= this.domSanitizer.bypassSecurityTrustUrl(url);
  this.spinner.hide(SpinnerType.BallAtom)

  }

}
