import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { TOAST_CONFIG } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { Tokenresponse } from 'src/app/contracts/token/tokenresponse/tokenresponse';
import { Createuser } from 'src/app/contracts/Users/createuse';
import { Listuser } from 'src/app/contracts/Users/listuser';
import { User } from 'src/app/entities/user';
import { MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

 async create(user:User):Promise<Createuser>{
  const observable:Observable<Createuser | User> = this.httpClientService.post<Createuser | User>({
    controller:"users"

  },user);
  return await firstValueFrom(observable) as Createuser ;
}

async updatePassword(userId:string,resetToken:string,password:string,passwordConfirm:string,successCallback?:()=>void,errorCallBack?:(error)=>void){

const observable: Observable<any> = this.httpClientService.post({
  action:"update-password",
  controller:"users"
  },{
  userId:userId,
  resetToken:resetToken,
  password:password,
  passwordConfirm:passwordConfirm
});

const promiseData:Promise<any>=firstValueFrom(observable);
promiseData.then(value=>successCallback()).catch(error=>errorCallBack(error));
  await promiseData;
}


async getAllUsers(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errrorMessage:string)=>void ):Promise<{totalUsersCount:number;users:Listuser[]}>
{
const observable:Observable<{totalUsersCount:number;users:Listuser[]}>  = this.httpClientService.get({
controller: "users",
queryString:`page=${page}&size=${size}`
});

const promiseData = firstValueFrom(observable);
promiseData.then(value=>successCallBack())
.catch(error=>errorCallBack(error));


  return await promiseData;

}



async assignRoleToUser (id:string,roles:string[],successCallBack?:()=>void,
errorCallBack?: (error)=>void)
{
    const observable:Observable<any>=this.httpClientService.post({
      controller:"users",
      action:"assign-role-to-user"

    },{
      userId:id,
      roles:roles
    });
    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>successCallBack())
    .catch(error=>errorCallBack(error));

    await promiseData;

  } 


async getRolesToUser(userId:string,successCallBack?:()=>void,
errorCallBack?: (error)=>void):Promise<string[]>{
 const observable:Observable<{userRoles:string[]}>=this.httpClientService.get({
  controller:"users",
  action:"get-roles-to-user"
 },userId);

    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>successCallBack())
    .catch(error=>errorCallBack(error));


return (await promiseData).userRoles;

  }


}