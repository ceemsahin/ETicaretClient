import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicLaodComponentDirective } from './directives/common/dynamic-laod-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import {} from '../app/services/common/dynamic-load-component.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicLaodComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLaodComponentDirective;
  constructor(public authService:AuthService
    ,private toastrService:CustomToastrService,
    private router:Router,private dynamicLoadComponentService:DynamicLoadComponentService)
  {
    authService.identityCheck();

  }
  signOut(){
  localStorage.removeItem("accessToken");
  this.authService.identityCheck();
  this.router.navigate([""]);
  this.toastrService.message("Oturumunuz kapatılmıştır","Oturum Kapatıldı",{
    messageType:ToastrMessageType.Info,
    position:ToastrPosition.TopRight
  });
  }

  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef);
  }





}
