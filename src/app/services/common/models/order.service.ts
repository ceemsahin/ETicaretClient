import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrder } from 'src/app/contracts/order/createorder';
import { ListOrder } from 'src/app/contracts/order/listorder';
import { SingleOrder } from 'src/app/contracts/order/singleorder';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }

async create(order:CreateOrder):Promise<void>
  {
const observable:Observable<any>  = this.httpClientService.post({
  controller: "orders"
},order);

await firstValueFrom(observable);
  }

  async getAllOrders(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errrorMessage:string)=>void ):Promise<{totalOrderCount:number;orders:ListOrder[]}>
  {
const observable:Observable<{totalOrderCount:number;orders:ListOrder[]}>  = this.httpClientService.get({
  controller: "orders",
  queryString:`page=${page}&size=${size}`
});

const promiseData = firstValueFrom(observable);
promiseData.then(value=>successCallBack())
.catch(error=>errorCallBack(error));


    return await promiseData;

  }


async getOrderById(id:string,successCallBack?:()=>void,errorCallBack?:(errrorMessage:string)=>void ){

  const observable: Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
    controller:"orders"
  },id);

  const promiseData=firstValueFrom(observable);
  promiseData.then(value=>successCallBack()).catch(error=>errorCallBack(error))

  return await promiseData;

}

  async completeOrder(id:string)
  {
    const observable:Observable<any>=this.httpClientService.get({
      controller:"orders",
      action:"complete-order"
    },id);

    await firstValueFrom(observable);
    }
}
