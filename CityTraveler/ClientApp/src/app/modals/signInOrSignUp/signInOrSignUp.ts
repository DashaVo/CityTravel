import { AuthService } from './../../services/generalServices/auth.service';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginRequest, RegisterRequest } from 'src/app/models/general.model';
import { LoginModalDialogComponent } from '../login/login.modal';
import { IUserProfile } from 'src/app/models/user.model';
import { RegisterModalDialogComponenet } from '../register/register.modal';


@Component({
  selector:'app-signIn-or-signUp-modal',
  templateUrl:'./signInOrSignUp.html',
  styleUrls:['./signInOrSignUp.scss']
})

export class SignupOrSigninModalDialogComponenet{

  constructor (public dialogRef: MatDialogRef<SignupOrSigninModalDialogComponenet>, public dialog: MatDialog, public  authService: AuthService){}

  public config={
    user:{
      id:'',
      isLoggedIn: false,
      isAdmin: false,
      isExpanded: false
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openLoginModal(): void {
    this.closeDialog()
    const dialogRef = this.dialog.open(LoginModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: { email: '', password: '', isPersistent: false }
    });

    dialogRef.afterClosed().subscribe(async (result: LoginRequest) => {
      await this.login(result);
    });
  }
  private async login(request: LoginRequest) {
    await this.authService.login(request)
    .then((res: IUserProfile) => {
      if (res) {
        this.config.user.isLoggedIn = true;
        this.config.user.isAdmin = res.role === 'Admin';
      }
    });
  }

  openRegisterModal():void{
    this.closeDialog()
    const dialogRef=this.dialog.open(RegisterModalDialogComponenet,{
      panelClass:'dialog-modal',
      data:{name:'', userName:'', email:'',
            password:'', avatarSrc:''  }
    });

    dialogRef.afterClosed().subscribe((result:RegisterRequest)=>{
      //this.register(result);
    })
  }
}
