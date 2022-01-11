import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TripStatus } from "src/app/enums/tripStatus";
import { ITrip } from "src/app/models/tripModel";
import { SearchService } from "src/app/services/searchService";
import * as defaults from "../../../models/initialValues";

@Component({
    selector: 'search-trips',
    templateUrl: './searchTrips.component.html',
    styleUrls: ['../searchStyles.component.scss']
  })
  export class SearchTripsComponent implements OnInit {
    public tripSearchForm: FormGroup;
    public propsTrips = defaults.propsTrip;
    public trips: ITrip [] = [];
    public isError = false;
    public areAllFieldsImplemented = false;

    constructor(private service: SearchService,
      private formBuilder: FormBuilder) {}

    createForm() {
      this.tripSearchForm = this.formBuilder.group({
        priceMore: [0, [Validators.required,Validators.min(0)]],
        priceLess: [10000, [Validators.required,Validators.min(0)]],
        ratingMore: [0, [Validators.required,Validators.min(0), Validators.max(5)]],
        ratingLess: [5, [Validators.required,Validators.min(0), Validators.max(5)]],
        entertainmentName: [],
        title: [],
        tripName:[],
        user:[],
        tripStatus : [],
        tripStart: ["2011-09-29",[Validators.required]],
        description: []
      });
    }
    ngOnInit(): void {
      this.createForm();
    }

    readToProps(){
      const tripStart = this.tripStartControl.value;
      this.propsTrips.tripStart = tripStart?tripStart:"";
      const title = this.titleFormControl.value;
      this.propsTrips.title = title ? title : "";
      this.propsTrips.priceLess = this.priceLessFormControl.value;
      this.propsTrips.priceMore = this.priceMoreFormControl.value;
      this.propsTrips.averageRatingLess = this.ratingLessFormControl.value;
      this.propsTrips.averageRatingMore = this.ratingMoreFormControl.value;
      const description = this.descriptionFormControl.value;
      this.propsTrips.description = description ? description : "";
      const entertainmentName = this.entertainmentNameFormControl.value;
      this.propsTrips.entertainmentName = entertainmentName?entertainmentName:"";
      const user = this.userFormControl.value;
      this.propsTrips.user = user?user:"";
      const status = this.tripStatusFormControl.value;
      if(status == "New") {
        this.propsTrips.tripStatus = TripStatus.New;
      }else if (status == "Passed") {
        this.propsTrips.tripStatus = TripStatus.Passed;
      }else if(status=="InProgress") {
        this.propsTrips.tripStatus = TripStatus.InProgress;
      }else {
        this.propsTrips.tripStatus = TripStatus.All;
      }
    }

    submitTrips() {
      this.readToProps();
      this.service.getTrips(this.propsTrips).then((res: ITrip[]) => {
        this.trips = res;
       })
       .catch(()=>{
        this.isError = true;
       });;
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
    get priceMoreFormControl(): FormControl {
      return this.tripSearchForm.get('priceMore') as FormControl;
    }
     get priceLessFormControl(): FormControl {
      return this.tripSearchForm.get('priceLess') as FormControl;
    }
     get ratingMoreFormControl(): FormControl {
      return this.tripSearchForm.get('ratingMore') as FormControl;
    }
    get ratingLessFormControl(): FormControl {
      return this.tripSearchForm.get('ratingLess') as FormControl;
    }
    get typeFormControl(): FormControl {
      return this.tripSearchForm.get('tripStatus') as FormControl;
    }
    get tripNameFormControl(): FormControl {
      return this.tripSearchForm.get('tripName') as FormControl;
    }
    get tripStartControl(): FormControl {
      return this.tripSearchForm.get('tripStart') as FormControl;
    }
    get descriptionFormControl(): FormControl {
      return this.tripSearchForm.get('description') as FormControl;
    }
    get tripStatusFormControl(): FormControl {
      return this.tripSearchForm.get('tripStatus') as FormControl;
    }
  }
