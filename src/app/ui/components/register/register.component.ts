import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Createuser } from 'src/app/contracts/Users/createuse';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userService:UserService,private toastrService:CustomToastrService,spinner:NgxSpinnerService) {
    super(spinner)
   }
  frm:FormGroup;
  ngOnInit(): void {

this.frm=this.formBuilder.group({

  nameSurname:["",[
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)]],
      username:["",[
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)]],
      email:["",[
      Validators.required,
      Validators.maxLength(250),
      Validators.email]],
      password:["",[
        Validators.required,
       ]],
    passwordConfirm:["",[
      Validators.required
    ]]

    })

  }

    get component(){
    return this.frm.controls;
   }
   submitted: boolean = false;
  
  async onSubmit(user:User){
  this.submitted=true;
    if(this.frm.invalid)
    return;

  const result:Createuser = await this.userService.create(user);

if (result.succeeded)
{
  this.toastrService.message(result.message,"Kullanıcı Kaydı Başarılı",{
    messageType:ToastrMessageType.Success,
    position:ToastrPosition.TopRight
  })

}
 else  
{
  this.toastrService.message(result.message,"Kullanıcı Kaydı Başarısız",{
    messageType:ToastrMessageType.Error,
    position:ToastrPosition.TopRight
  })
}

  }

}