import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Createproduct } from 'src/app/contracts/createproduct';
import { Listproduct } from 'src/app/contracts/listproduct';
import { Listprodutctimage } from 'src/app/contracts/listproductimages';
import { __values } from 'tslib';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:Createproduct,successCallBack?:()=>void,errorCallBack?: (errorMessage: string) => void){



    this.httpClientService.post({
      controller:"products"
    },product)
    .subscribe({
      next : result => {
        successCallBack();
        alert("Başarılı");
      },
      error : (errorResponse: HttpErrorResponse) =>{
        const _error : Array<{key: string; value: Array<string>}> = errorResponse.error;
        let message = "";
        _error.forEach((v, index)=>{
          v.value.forEach( (_v, _index) =>{
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      },
      complete : () => console.info("Başarılı")
    });
  }

   async read(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errrorMessage:string)=>void ): Promise<{totalProductCount:number;products:Listproduct[]}> {
    const promiseData:Promise<{totalProductCount:number;products:Listproduct[]}>= this.httpClientService.get<{totalProductCount:number;products:Listproduct[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

   return await promiseData;

   }

 
 async delete(id:string){

 const deleteObservable:Observable<any> = this.httpClientService.delete<any>({
    controller:"products"
  },id);
  await firstValueFrom(deleteObservable);
}
  
async readImages(id:string,successCallBack?:()=>void):Promise<Listprodutctimage[]>{
  const getObservable: Observable<Listprodutctimage[]>=
  this.httpClientService.get<Listprodutctimage[]>({
    action:"getproductimages",
    controller:"products"
  },
  id);
  const images:Listprodutctimage[] =await firstValueFrom(getObservable);
successCallBack();
 return images;
} 


async deleteImage(id:string,imageId:string,successCallBack?:()=>void){
const deleteObservable= this.httpClientService.delete({
    action:"deleteproductimage",
    controller:"products",
    queryString:`imageId=${imageId}`
     },id)
      await firstValueFrom(deleteObservable);
      successCallBack();
    }

 

    async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
      const changeShowcaseImageObservable = this.httpClientService.get({
        controller: "products",
        action: "ChangeShowcaseImage",
        queryString: `imageId=${imageId}&productId=${productId}`
      });
      await firstValueFrom(changeShowcaseImageObservable);
      successCallBack();
    }
async updateStockQrCodeToProduct(productId:string,stock:number,successCallBack?:()=>void)
{
  const observable= this.httpClientService.put({
    action:"qrcode",
    controller:"products"
  },{
    productId,stock
  }
  );
  await firstValueFrom(observable);
  successCallBack();
}

}
