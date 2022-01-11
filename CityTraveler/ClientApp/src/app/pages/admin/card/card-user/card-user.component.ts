import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IUserProfile } from 'src/app/models/user.model';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
 @Input() user: IUserProfile;

  constructor(private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.user)
  }

  goTo(){
    this.router.navigate(["/admin/user/profile",this.user.userName]);
    }
openDeleteModal(): void {
    
  const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
    width: '300px',
    panelClass: 'dialog-modal',
    data: { email: '', password: '', isPersistent: false }
  });
  dialogRef.afterClosed().subscribe(async (result: boolean) => {
   
   console.log("delete item id ",result,this.user.userName )
  });
  window.scroll(0, 0);
}
}
