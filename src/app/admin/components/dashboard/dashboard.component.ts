import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls.';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalrService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private alertify:AlertifyService,private signalrService:SignalrService) { 
    super(spinner);
    // signalrService.start(HubUrls.ProductHub)
    // signalrService.start(HubUrls.OrderHub)

  }

  ngOnInit(): void {
    this.signalrService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFuntion,message=>{
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopRight
      })
    });
    this.signalrService.on(HubUrls.OrderHub,ReceiveFunctions.OrderCreatedMessageReceiveFuntion,message=>{
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopCenter
      })
    });
  }

}
