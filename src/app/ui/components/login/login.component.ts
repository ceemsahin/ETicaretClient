import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Tokenresponse } from 'src/app/contracts/token/tokenresponse/tokenresponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService:UserAuthService,spinner:NgxSpinnerService,private authService:AuthService,private activatedRoute:ActivatedRoute,private router:Router,
    private socialAuthService:SocialAuthService,private httpClientService:HttpClientService) {
    super(spinner)
    socialAuthService.authState.subscribe(async(user:SocialUser) => {
      this.showSpinner(SpinnerType.BallAtom);
  switch(user.provider)
{
 case "GOOGLE":
  await userAuthService.googleLogin(user,()=> 
  {
    this.authService.identityCheck();
    this.hideSpinner(SpinnerType.BallAtom);
  })
  break;
  case "FACEBOOK":

    await userAuthService.facebookLogin(user,()=> 
    {
      this.authService.identityCheck();
      this.hideSpinner(SpinnerType.BallAtom);
    })
  break;
}
 });
   

   }

  ngOnInit(): void {
  }


 async login(usernameOrEmail:string,password:string){
       this.showSpinner(SpinnerType.BallAtom)
        this.userAuthService.login(usernameOrEmail,password,()=> {
          this.authService.identityCheck();
          this.activatedRoute.queryParams.subscribe(queryParams=>{
            const returnUrl:string= queryParams["returnUrl"];
            if(returnUrl)
            this.router.navigate([returnUrl]);

          });
          this.hideSpinner(SpinnerType.BallAtom);
        });
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


}
