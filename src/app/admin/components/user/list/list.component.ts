import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Listuser } from 'src/app/contracts/Users/listuser';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['userName', 'nameSurname','email','twoFactorEnabled','role','delete'];
  dataSource : MatTableDataSource<Listuser> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(spinner:NgxSpinnerService,
    private userService:UserService,
    private alertifyService:AlertifyService,
    private dialogServive:DialogService,
   
    ) {super(spinner) }

 async getUsers(){
  this.showSpinner(SpinnerType.BallAtom);
  const allUsers: {totalUsersCount:number;users:Listuser[]}= await  this.userService.getAllUsers(this.paginator? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize:5,
    ()=>this.hideSpinner(SpinnerType.BallAtom),errorMessage=>
     this.alertifyService.message(errorMessage,
       {
         dissmissOthers:true,
         messageType:MessageType.Error,
         position:Position.TopRight
       }))
     
  this.dataSource= new MatTableDataSource<Listuser>(allUsers.users);
  this.paginator.length=allUsers.totalUsersCount;
 } 

// delete(id){
//   alert(id)
// }


 async pageChanged() {
  await this.getUsers();
}


  async ngOnInit(){
    await this.getUsers();
  }

  assignRole(id:string){
    this.dialogServive.openDialog({
      componentType:AuthorizeUserDialogComponent,
      data:id,
      options:{
        width:"750px"
      },
      afterClosed:()=>{
this.alertifyService.message("Roller başarıyla atanmıştım!",{
  messageType:MessageType.Success,
  position:Position.TopRight
})
      }
    });
  }


}
