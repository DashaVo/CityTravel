import { take, filter } from 'rxjs/operators';
import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { RegisterRequest } from "src/app/models/general.model";
import * as defaults from "../../models/initialValues";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector:'app-register-modal',
  templateUrl:'./registrer.modal.html',
  styleUrls:['./register.modal.scss'],
})

export class RegisterModalDialogComponenet implements OnInit{

  public request:RegisterRequest = defaults.registerData;
  public imageUrl;
  public imageToUpload:File = null;
  public loading: false;



  constructor(public dialogRef:MatDialogRef<RegisterModalDialogComponenet>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RegisterRequest){
      this.request=data;
  }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(this.request)
  }

  onFileSelected(event: { target: { files: string | any[]; }; }){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ()=>{
        if(typeof reader.result === 'string'){
          this.request.avatarSrc = reader.result;
        }
      }
    }
  }

}
