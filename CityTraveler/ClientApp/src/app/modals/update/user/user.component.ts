import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUpdateUserData } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserModalDialogComponent  {

  user:IUpdateUserData;

  @Input() object: IUpdateUserData ;


  constructor(
    public dialogRef: MatDialogRef<UserModalDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IUpdateUserData,
  ) {
    window.scroll(0, 0);
    this.user = this.data
    console.log (this.user)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit() {
    //errors, parallelism, transactions
      this.dialogRef.close(this.user )
  
}

}
