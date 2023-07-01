import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService) { }

async getRoles(page:number,pageSize:number,successCallBack?:()=>void,errorCallBack?:(error)=>void){
const observable:Observable<any>=this.httpClientService.get({
  controller:"roles",
  queryString: `page=${page}&size=${pageSize}`
});

const promiseData= firstValueFrom(observable);
promiseData.then(successCallBack).catch(errorCallBack);
return await promiseData;
} 



async create(name:string,successCallBack?:()=>void,errorCallBack?:(error)=>void){ 
  const observable:Observable<any> = this.httpClientService.post({
    controller:"roles"
  },{name:name});
  
  const promiseData= firstValueFrom(observable) ;
  
  promiseData.then(successCallBack).catch(errorCallBack);
  return await promiseData as {succeeded:boolean};


}

}
