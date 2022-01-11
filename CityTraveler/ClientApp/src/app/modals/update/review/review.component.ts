import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUpdateUserData } from 'src/app/models/user.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewModalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReviewModalDialogComponent>,
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
