import { take } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilterEntertainments } from 'src/app/models/filters/filtertEntertainments';
import { title } from 'process';
import { IFilterAdminEntertainments } from 'src/app/models/filters/filterEntertaiments.admin';

@Component({
  selector: 'search-entertaiments',
  templateUrl: './search-entertainment.component.html',
  styleUrls: ['./search-entertainment.component.scss']
})
export class SearchEntertainmentComponent implements OnInit {

  @Output() getEntertainment: EventEmitter<IFilterAdminEntertainments> = new EventEmitter<IFilterAdminEntertainments>();

  public entertaimentSearchForm: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.entertaimentSearchForm = this.formBuilder.group({
      titleName: ['', [ Validators.maxLength(60)]],
      streetName: ['', [ Validators.maxLength(60)]],
      tripName:['',[ Validators.maxLength(60)]],
      description:['',[, Validators.maxLength(7)]],
      typeName:['4',[Validators.required]],
      priceMore:[0,Validators.maxLength(20)],
      priceLess:[1000,Validators.maxLength(20)],
      ratingMore:[0],
      ratingLess:[5]
    });
  }
  get titleNameFormControl(): FormControl {
    return this.entertaimentSearchForm.get('titleName') as FormControl;
  }
  get streetNameFormControl(): FormControl {
    return this.entertaimentSearchForm.get('streetName') as FormControl;
  }
  get descriptionFormControl(): FormControl {
    return this.entertaimentSearchForm.get('description') as FormControl;
  }
  get typeNameFormControl(): FormControl {
    return this.entertaimentSearchForm.get('typeName') as FormControl;
  }
  get priceMoreFormControl(): FormControl {
    return this.entertaimentSearchForm.get('priceMore') as FormControl;
  }
  get priceLessFormControl(): FormControl {
    return this.entertaimentSearchForm.get('priceLess') as FormControl;
  }
  get ratingMoreFormControl(): FormControl {
    return this.entertaimentSearchForm.get('ratingMore') as FormControl;
  }
  get ratingLessFormControl(): FormControl {
    return this.entertaimentSearchForm.get('ratingLess') as FormControl;
  }
  submit(){

    this.getEntertainment.emit({
      title: this.titleNameFormControl.value,
      streetName: this.streetNameFormControl.value,
      description: this.descriptionFormControl.value,
      type: this.typeNameFormControl.value,
      averagePriceLess: this.priceLessFormControl.value,
      averagePriceMore: this.priceMoreFormControl.value,
      averageRatingLess: this.ratingLessFormControl.value,
      averageRatingMore: this.ratingMoreFormControl.value
    });
  }
}
