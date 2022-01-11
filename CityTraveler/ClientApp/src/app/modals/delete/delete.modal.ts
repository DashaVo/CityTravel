import { LoginRequest } from '../../models/general.model';
import { Component, EventEmitter, Inject, Optional, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete.modal.html',
  styleUrls: ['./delete.modal.scss']
})
export class DeleteModalDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  submit() {
    this.dialogRef.close(true);
  }
 
}
