import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { listRole } from 'src/app/contracts/role/listrole';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name','edit','delete'];
  dataSource : MatTableDataSource<listRole> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(spinner:NgxSpinnerService,
    private roleService:RoleService,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
    ) {super(spinner) }

 async getRoles(){
  this.showSpinner(SpinnerType.BallAtom);
  const allRoles:{datas:listRole[],totalCount:number}= await 
   this.roleService.getRoles(this.paginator? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerType.BallAtom),errorMessage=>
     this.alertifyService.message(errorMessage,
       {
         dissmissOthers:true,
         messageType:MessageType.Error,
         position:Position.TopRight
       }))
     
  this.dataSource= new MatTableDataSource<listRole>(allRoles.datas);
  this.paginator.length=allRoles.totalCount;
 } 

// delete(id){
//   alert(id)
// }
// addProductImages(id:string)
// {
//   this.dialogService.openDialog({
//     componentType:SelectProductImageDialogComponent,
//     data:id,
//     options:{
//       width:"800px"
//     }
//   })
// }

 async pageChanged() {
  await this.getRoles();
}


  async ngOnInit(){
    await this.getRoles();
  }

}
