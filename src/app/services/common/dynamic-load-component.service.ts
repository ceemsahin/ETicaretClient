import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {


    //ViewContainerRef  :Dinamik olarak yüklenecek componenti içerisinde barındıran containerdır.(Her dinamik yükleme sürecisinde önceki view'leri clear etmemiz gerekir.)
    //ComponentFactory  :Component'lerin instance'larını oluşturmak için kullanılan nesnedir.
    //ComponentFactoryResolver : Belirli bir component için ComponentFactory'i resolve eden sınıftır.İçerisindeki resolveComponentFactory fonksiyonu aracılığıyla ilgili componente dair bir ComponentFactory nesnesi oluşturup döner.


  constructor() { }

async loadComponent(component:ComponentType,viewContainerRef:ViewContainerRef){

  let _component : any=null;
    switch(component){
      case ComponentType.BasketsComponent:
    _component= await (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
    break;
  }
viewContainerRef.clear();
return viewContainerRef.createComponent(_component);


  } 
}

export enum ComponentType{
  BasketsComponent
}
