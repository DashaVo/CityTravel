import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUpdateUserData } from 'src/app/models/user.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripModalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TripModalDialogComponent>,
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
      this.dialogRef.close( )
  
}
}
