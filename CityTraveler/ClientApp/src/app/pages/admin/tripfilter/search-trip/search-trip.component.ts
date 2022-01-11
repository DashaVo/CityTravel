import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilterAdminTrips } from 'src/app/models/filters/filterTrip.admin';

@Component({
  selector: 'search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss']
})
export class SearchTripComponent implements OnInit {
  @Output() filterTrips: EventEmitter<IFilterAdminTrips> = new EventEmitter<IFilterAdminTrips>();
  public tripSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.tripSearchForm = this.formBuilder.group({
      title: ['', [ Validators.maxLength(20)]],
      user: ['', [ Validators.maxLength(30)]],
      entertainmentName:['',[ Validators.maxLength(30)]],
      description:['',[, Validators.maxLength(70)]],
      tripStatus:['4',[Validators.required]],
      priceMore:[0,Validators.maxLength(20)],
      priceLess:[1000,Validators.maxLength(20)],
      averageRatingMore:[0],
      averageRatingLess:[5],
      tripStart: ["2017-06-01"],
      tripEnd: ["2022-06-01"],

    });
  }
  get tripStartFormControl(): FormControl {
    return this.tripSearchForm.get('tripStart') as FormControl;
  }
  get tripEndFormControl(): FormControl {
    return this.tripSearchForm.get('tripEnd') as FormControl;
  }
  get entertainmentNameFormControl(): FormControl {
    return this.tripSearchForm.get('entertainmentName') as FormControl;
  }
  get titleFormControl(): FormControl {
    return this.tripSearchForm.get('title') as FormControl;
  }
  get userFormControl(): FormControl {
    return this.tripSearchForm.get('user') as FormControl;
  }
  get descriptionFormControl(): FormControl {
    return this.tripSearchForm.get('description') as FormControl;
  }
  get tripStatusFormControl(): FormControl {
    return this.tripSearchForm.get('tripStatus') as FormControl;
  }
  get priceMoreFormControl(): FormControl {
    return this.tripSearchForm.get('priceMore') as FormControl;
  }
  get priceLessFormControl(): FormControl {
    return this.tripSearchForm.get('priceLess') as FormControl;
  }
  get averageRatingMoreMoreFormControl(): FormControl {
    return this.tripSearchForm.get('averageRatingMore') as FormControl;
  }
  get averageRatingLessFormControl(): FormControl {
    return this.tripSearchForm.get('averageRatingLess') as FormControl;
  }
  submit(){

    this.filterTrips.emit({
      tripStart: this.tripStartFormControl.value,
      tripEnd: this.tripEndFormControl.value,
      entertainmentName: this.entertainmentNameFormControl.value,
      user: this.userFormControl.value,
      tripStatus: this.tripStatusFormControl.value,
      title: this.titleFormControl.value,
      description: this.descriptionFormControl.value,
      priceMore: this.priceMoreFormControl.value,
      priceLess: this.priceLessFormControl.value,
      averageRatingLess: this.averageRatingLessFormControl.value,
      averageRatingMore: this.averageRatingMoreMoreFormControl.value
    });
  }
}
