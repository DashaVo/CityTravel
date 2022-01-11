import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import {IUserProfile, IUserUpdate} from 'src/app/models/user.model';
import {UserManagementService} from 'src/app/services/userManagementService';
import {StorageService} from '../../../../services/generalServices/storage.service';

@Component({
  selector: 'update-user',
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.scss']
})
export class UpdateUserComponent implements OnInit {
  @Input() userData: IUserProfile;
  public defaultAvatar = 'https://image.shutterstock.com/image-vector/female-photographer-holds-camera-takes-260nw-1395353831.jpg';
  public updateUser: IUserUpdate;
  public updateUserForm: FormGroup;
  public hidden = true;
  public error = null;

  constructor(
    private service: UserManagementService,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (this.userData) {
      this.updateUser = { ...this.updateUser, ...this.userData};
    }
    this.buildForm();
  }

  private buildForm() {
    this.updateUserForm = this.formBuilder.group({
      name: [this.userData.name, [Validators.required, Validators.maxLength(100)]],
      email: [this.userData.email],
      username: [this.userData.userName],
    });
    console.log('Init', this.updateUserForm);
  }

  submit() {
    this.updateUser.name = this.nameFormControl.value;
    this.updateUser.email = this.emailFormControl.value;
    this.updateUser.userName = this.usernameFormControl.value;
    console.log(this.updateUserForm.value, this.updateUserForm.valid);
    if (this.updateUserForm.valid) {
      this.service.updateUser({
        ...this.updateUserForm.value,
        avatarSrc: this.updateUser.avatarSrc
      })
      .subscribe((res: IUserUpdate) => {
        const newUser = {
          ...this.userData,
          name: res.name,
          avatarSrc: res.avatarSrc
        };
        this.updateUser = newUser;
        this.storageService.set('user', newUser, 'session');
      },
      (error) => {
        console.log(error);
        this.error = `User not updated`;
      });
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.updateUser.avatarSrc = reader.result;
        }
      };
    }
  }

  get nameFormControl(): FormControl {
    return this.updateUserForm.get('name') as FormControl;
    }
  get emailFormControl(): FormControl {
    return this.updateUserForm.get('email') as FormControl;
    }
  get avatarSrcFormControl(): FormControl {
      return this.updateUserForm.get('avatarSrc') as FormControl;
    }
  get usernameFormControl(): FormControl {
      return this.updateUserForm.get('username') as FormControl;
    }
}



