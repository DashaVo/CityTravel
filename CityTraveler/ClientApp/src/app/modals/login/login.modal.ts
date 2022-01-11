import { LoginRequest } from './../../models/general.model';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.modal.html',
  styleUrls: ['./login.modal.scss']
})
export class LoginModalDialogComponent {
  public request: LoginRequest;

  constructor(
    public dialogRef: MatDialogRef<LoginModalDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: LoginRequest,
  ) {
    this.request = data;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.request);
  }
}
