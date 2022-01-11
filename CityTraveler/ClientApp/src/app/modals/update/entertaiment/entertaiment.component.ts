import { Component, Inject, Input, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUpdateUserData } from 'src/app/models/user.model';


@Component({
  selector: 'app-entertaiment',
  templateUrl: './entertaiment.component.html',
  styleUrls: ['./entertaiment.component.css']
})
export class EntertaimentModalDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EntertaimentModalDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IUpdateUserData,
  ) {
    window.scroll(0, 0);
  }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit() {
    //errors, parallelism, transactions
      this.dialogRef.close()

}
}


