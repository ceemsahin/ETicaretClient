import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, Position,MessageType } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,
    private alertify:AlertifyService, 
    private roleService:RoleService) {
    super(spinner)
   }

  ngOnInit(): void {}

     @Output() createdRole:EventEmitter<string>= new EventEmitter();
    


    create(name: HTMLInputElement) {
      this.showSpinner(SpinnerType.BallAtom);

  this.roleService.create(name.value,()=>{
    this.hideSpinner(SpinnerType.BallAtom);
  this.alertify.message("Role başarıyla eklenmiştir.",
  {
    dissmissOthers:true,
    messageType:MessageType.Success,
    position:Position.TopRight
  });
   this.createdRole.emit(name.value);
},errorMesage=>{
  this.alertify.message(errorMesage,{
    dissmissOthers:true,
    messageType:MessageType.Error,
    position:Position.BottomRight
  });
});
 }

}
