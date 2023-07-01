import { Listprodutctimage } from "./listproductimages";

export class Listproduct {
    id:string;
    name:string;
    stock:number;
    price:number;
    createdDate:Date;
    updatedDate:Date;
    productImageFiles?:Listprodutctimage[];
    imagePath:string;
}
