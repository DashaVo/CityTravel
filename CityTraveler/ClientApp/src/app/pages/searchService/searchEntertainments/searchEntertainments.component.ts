import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EntertainmentType } from 'src/app/enums/entertainmentType';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';
import { SearchService } from 'src/app/services/searchService';
import * as defaults from "../../../models/initialValues";

@Component({
  selector: 'search',
  templateUrl: './searchEntertainments.component.html',
  styleUrls: ['../searchStyles.component.scss']
})
export class SearchEntertainmentsComponent implements OnInit {
  public propsEntertainments = defaults.propsEntertainment;
  public entertainments: IEntertainmentPreview []  = [];
  public entertainmentSearchForm: FormGroup;
  public isError = false;
  public isLoading = false;
  public areAllFieldsImplemented = false;

  constructor(
    private service: SearchService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.entertainmentSearchForm = this.formBuilder.group({
      priceMore: [0, [Validators.required,Validators.min(0)]],
      priceLess: [10000, [Validators.required,Validators.min(0)]],
      ratingMore: [0, [Validators.required,Validators.min(0), Validators.max(5)]],
      ratingLess: [5, [Validators.required,Validators.min(0), Validators.max(5)]],
      streetName: [],
      title: [],
      tripName:[],
      houseNumber:[],
      type : []
    });
  }

  readAllValuesInProps(){
    const type = this.typeFormControl.value;
    if (type == "Event") {
      this.propsEntertainments.type =  EntertainmentType.Event;
    }
    else if (type == "Institution") {
      this.propsEntertainments.type =  EntertainmentType.Institution;
    }
    else if (type == "Landscape") {
      this.propsEntertainments.type =  EntertainmentType.Landscape;
    }
    else{
      this.propsEntertainments.type =  EntertainmentType.All;
    }
    this.propsEntertainments.priceLess = this.priceLessFormControl.value;
    this.propsEntertainments.priceMore = this.priceMoreFormControl.value;
    const title = this.titleFormControl.value;
    this.propsEntertainments.title = title ? title : "";
    const houseNumber = this.houseNumberFormControl.value;
    this.propsEntertainments.houseNumber = houseNumber ? houseNumber  : "";
    this.propsEntertainments.ratingLess = this.ratingLessFormControl.value;
    this.propsEntertainments.ratingMore = this.ratingMoreFormControl.value;
    const streetName = this.streetNameFormControl.value;
    this.propsEntertainments.streetName = streetName ? streetName : "";
    const tripName = this.tripNameFormControl.value;
    this.propsEntertainments.tripName = tripName ? tripName : "";
  }

  submitEntertainments() {
    this.isLoading = true;
    this.readAllValuesInProps();
    this.service.getEntertainments(this.propsEntertainments).then((res: IEntertainmentPreview[]) => {
      this.entertainments = res;
      this.isLoading = false;
     })
     .catch(()=>{
       this.isError = true;
       this.isLoading = false;
      });
  }

  get streetNameFormControl(): FormControl {
    return this.entertainmentSearchForm.get('streetName') as FormControl;
  }
  get titleFormControl(): FormControl {
    return this.entertainmentSearchForm.get('title') as FormControl;
  }
  get houseNumberFormControl(): FormControl {
    return this.entertainmentSearchForm.get('houseNumber') as FormControl;
  }
  get priceMoreFormControl(): FormControl {
    return this.entertainmentSearchForm.get('priceMore') as FormControl;
  }
   get priceLessFormControl(): FormControl {
    return this.entertainmentSearchForm.get('priceLess') as FormControl;
  }
   get ratingMoreFormControl(): FormControl {
    return this.entertainmentSearchForm.get('ratingMore') as FormControl;
  }
  get ratingLessFormControl(): FormControl {
    return this.entertainmentSearchForm.get('ratingLess') as FormControl;
  }
  get typeFormControl(): FormControl {
    return this.entertainmentSearchForm.get('type') as FormControl;
  }
  get tripNameFormControl(): FormControl {
    return this.entertainmentSearchForm.get('tripName') as FormControl;
  }
}

