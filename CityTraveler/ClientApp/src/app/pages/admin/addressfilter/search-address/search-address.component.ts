import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'search-address',
  templateUrl: './search-address.component.html',
  styleUrls: ['./search-address.component.scss']
})
export class SearchAddressComponent implements OnInit {
  @Output() getAddress: EventEmitter<string> = new EventEmitter<string>();
  @Input() filter : string = "";

  public adsressSearchForm: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.adsressSearchForm = this.formBuilder.group({
      titleName: ['', [Validators.required, Validators.maxLength(60)]]
    });
  }
  get titleNameFormControl(): FormControl {
    return this.adsressSearchForm.get('titleName') as FormControl;
  }
  submit(){
    this.filter = this.titleNameFormControl.value
    this.getAddress.emit(this.filter)
    this.adsressSearchForm.reset();
  }

}
