import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Createbasketitem } from 'src/app/contracts/basket/createbasketitem';
import { Listbasketitem } from 'src/app/contracts/basket/listbasketitem';
import { Updatebasketitem } from 'src/app/contracts/basket/updatebasketitem';
import { BasketsComponent } from 'src/app/ui/components/baskets/baskets.component';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }

 async get():Promise<Listbasketitem[]>{
    const observable:Observable<Listbasketitem[]> = this.httpClientService.get({
      controller:"baskets"
      
    });

    return await firstValueFrom(observable);
  }

  async add(basketItem: Createbasketitem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "baskets"
    }, basketItem);

    await firstValueFrom(observable);
  }
async  updateQuantity(basketItem:Updatebasketitem):Promise<void>{
const observable:Observable<any>=this.httpClientService.put({
  controller:"baskets"
},basketItem)
await firstValueFrom(observable);
}
async remove(basketItemId:string){
  const observable:Observable<any> = this.httpClientService.delete({
    controller:"baskets"
  },basketItemId)

  await firstValueFrom(observable);
}
}
