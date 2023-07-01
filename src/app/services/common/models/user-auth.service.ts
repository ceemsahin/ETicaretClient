import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Tokenresponse } from 'src/app/contracts/token/tokenresponse/tokenresponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }



  async login(usernameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any | Tokenresponse>= this.httpClientService.post<any | Tokenresponse>({
       controller:"auth",
       action:"login"
     },{usernameOrEmail,password})
   
   const tokenResponse :Tokenresponse = await firstValueFrom(observable) as Tokenresponse;
   
   if(tokenResponse)
   {
     localStorage.setItem("accessToken",tokenResponse.token.accessToken);
     localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
     this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır","Giriş Başarılı",{
         messageType:ToastrMessageType.Success,
         position:ToastrPosition.TopRight
   
     });
   
   }
   
   else
   {
     
       this.toastrService.message("Kullanıcı girişi hatalı","Giriş Başarısız",{
       messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
   
     });
   }
   
   
   
     callBackFunction();
   
   
     }
   

     async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
      const observable: Observable<any | Tokenresponse> = this.httpClientService.post({
        action: "refreshtokenlogin",
        controller: "auth"
      }, { refreshToken: refreshToken });
  
      try {
        const tokenResponse: Tokenresponse = await firstValueFrom(observable) as Tokenresponse;
  
        if (tokenResponse) {
          localStorage.setItem("accessToken", tokenResponse.token.accessToken);
          localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
        }
  
        callBackFunction(tokenResponse ? true : false);
      } catch {
        callBackFunction(false);
      }
    }
   
   async googleLogin(user:SocialUser, callBackFunction?:()=> void):Promise<any> {
   
    const observable:Observable<SocialUser|Tokenresponse> =this.httpClientService.post<SocialUser | Tokenresponse>({
       action:"google-login",
       controller:"auth"
     },user);
   
   const tokenResponse:Tokenresponse =await firstValueFrom(observable) as Tokenresponse;
   if(tokenResponse)
       {
         localStorage.setItem("accessToken",tokenResponse.token.accessToken);
         localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
         this.toastrService.message("Google ile giriş başarıyla sağlanmıştır","Giriş Başarılı",{
           messageType:ToastrMessageType.Success,
           position:ToastrPosition.TopRight
   
       });
      }
   
   
     callBackFunction();
   
     }   
   
   async facebookLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
   
    const observable:Observable<SocialUser|Tokenresponse> = this.httpClientService.post<SocialUser| Tokenresponse>({
       controller:"auth",
       action:"facebook-login"
     },user);
   
     const tokenResponse:Tokenresponse= await firstValueFrom(observable) as Tokenresponse;
   
   if (tokenResponse)
   {
   localStorage.setItem("accessToken",tokenResponse.token.accessToken);
   localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
   this.toastrService.message("Facebook ile giriş başarıyla sağlanmıştır","Giriş Başarılı",{
     messageType:ToastrMessageType.Success,
     position:ToastrPosition.TopRight
   
   });
   
   }
   callBackFunction();
    }


    async passwordReset(email:string,callBackFunction? :()=>void){

      const observable: Observable<any> = this.httpClientService.post({
        controller:"auth",
        action:"password-reset"
      },{email:email});

      await firstValueFrom(observable);
      callBackFunction();

    }


    async verifyResetToken(resetToken:string,userId:string,callBackFunction?:()=>void):Promise<boolean>{

      const observable: Observable<any> = this.httpClientService.post({
        controller:"auth",
        action:"verify-reset-token"
      },{resetToken:resetToken,
        userId:userId});

    const state:boolean= await firstValueFrom(observable);
      callBackFunction();

      return state;
    }

}
