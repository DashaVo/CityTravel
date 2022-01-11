import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilterAdminUsers } from 'src/app/models/filters/filterUser.admin';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  @Output() getUser: EventEmitter<IFilterAdminUsers> = new EventEmitter<IFilterAdminUsers>();
  public entertaimentSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.entertaimentSearchForm = this.formBuilder.group({
      userName: ['', [ Validators.maxLength(60)]],
      email: ['', [ Validators.maxLength(60)]],
      name:['',[ Validators.maxLength(60)]],
      phoneNumber:['',[, Validators.maxLength(7)]],
      gender:['male',[Validators.required]],
      lockoutUser:[false,[]]

    });
  }
  get userNameFormControl(): FormControl {
    return this.entertaimentSearchForm.get('userName') as FormControl;
  }
  get genderFormControl(): FormControl {
    return this.entertaimentSearchForm.get('gender') as FormControl;
  }
  get emailFormControl(): FormControl {
    return this.entertaimentSearchForm.get('email') as FormControl;
  }
  get nameFormControl(): FormControl {
    return this.entertaimentSearchForm.get('name') as FormControl;
  }
  get phoneNumberFormControl(): FormControl {
    return this.entertaimentSearchForm.get('phoneNumber') as FormControl;
  }
  get lockoutUserFormControl(): FormControl {
    return this.entertaimentSearchForm.get('lockoutUser') as FormControl;
  }

  submit(){

    this.getUser.emit({
      userName: this.userNameFormControl.value,
      gender: this.genderFormControl.value,
      email: this.emailFormControl.value,
      name: this.nameFormControl.value,
      phoneNumber: this.phoneNumberFormControl.value,
      lockoutUser:  this.lockoutUserFormControl.value
    });
  }
}
