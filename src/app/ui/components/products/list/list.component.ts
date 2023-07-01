import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Createbasketitem } from 'src/app/contracts/basket/createbasketitem';
import { Listproduct } from 'src/app/contracts/listproduct';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.services';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

constructor(private productService:ProductService,private fileService:FileService
  ,private activatedRoute:ActivatedRoute,private basketService:BasketService
  , spinner:NgxSpinnerService,private toastrService:CustomToastrService) { 
    super(spinner)
  }
currentPageNo: number;
totalProductCount: number;
totalPageCount: number;
pageSize: number = 5;
pageList: number[] = [];
baseUrl: BaseUrl;

products: Listproduct[];
async ngOnInit() {

  this.baseUrl = await this.fileService.getBaseStorageUrl();

  this.activatedRoute.params.subscribe(async params => {
    this.currentPageNo = parseInt(params["pageNo"] ?? 1);

    const data: { totalProductCount: number, products: Listproduct[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
      () => {

      },
      errorMessage => {

      });

    this.products = data.products;

    this.products = this.products.map<Listproduct>(p => {
      const listProduct: Listproduct = {
        id: p.id,
        createdDate: p.createdDate,
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
        name: p.name,
        price: p.price,
        stock: p.stock,
        updatedDate: p.updatedDate,
        productImageFiles: p.productImageFiles
      };

      return listProduct;
    });

    this.totalProductCount = data.totalProductCount;
    this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

    this.pageList = [];

    if (this.currentPageNo - 3 <= 0)
      for (let i = 1; i <= 7; i++)
        this.pageList.push(i);

    else if (this.currentPageNo + 3 >= this.totalPageCount)
      for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
        this.pageList.push(i);

    else
      for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
        this.pageList.push(i);
  });





}

async addToBasket(product: Listproduct) {
  this.showSpinner(SpinnerType.BallAtom);
  let _basketItem: Createbasketitem = new Createbasketitem();
  _basketItem.productId = product.id;
  _basketItem.quantity = 1;
  await this.basketService.add(_basketItem);
  this.hideSpinner(SpinnerType.BallAtom);
  this.toastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi", {
    messageType: ToastrMessageType.Success,
    position: ToastrPosition.TopRight
  });
}

}
 