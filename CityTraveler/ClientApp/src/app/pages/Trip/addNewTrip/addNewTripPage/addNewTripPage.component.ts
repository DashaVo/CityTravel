import { SelectedEntertainmentsComponent } from './../selectedEntertainments/selectedEntertainments.component';
import { EntertainmentService } from '../../../../services/entertainmentService';
import { AuthService } from '../../../../services/generalServices/auth.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NewTrip } from 'src/app/models/newTripModel';
import { TripService } from "src/app/services/tripService";
import { FindArea } from '../../../Entertainment/FindArea/findArea.component';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';


@Component({
    selector: "new-trip",
    templateUrl: "./addNewTripPage.component.html",
    styleUrls: ["./addNewTripPage.componenet.scss"]
})

export class NewTripComponentPage implements OnInit {
    public newTrip: NewTrip = {
        userId:"",
        entertaimentsIds:[],
        title: "",
        description:"",
        tripStart: new Date()
    }


    public selectedEntertainment: string;
    public entertainments = [];
    public findArea:FindArea;
    private userId = "";
    public type: number = 4;
    public createTripForm:FormGroup;

    constructor(private service: TripService,
                private authService: AuthService,
                private fb: FormBuilder,
                private entertainmentService: EntertainmentService) {}

    @ViewChild(SelectedEntertainmentsComponent, {static:false}) childView!: SelectedEntertainmentsComponent;

    ngOnInit(){
        this.getUser();
        this.getEntertainments();
        this.createTripForm = this.fb.group({
            "title":['', Validators.required],
            "description":[''],
            "tripStart":['',  Validators.required]
        })
    }

    addEntertainmentsToTrip(item: any) {
      this.newTrip.entertaimentsIds.push(item.id);
      this.selectedEntertainment = item.title;
    }

    getUser() {
      const user = this.authService.getUser();

      if (user) {
        this.userId = user.id;
      }
    }

    async onSubmit(form:NgForm){
      if(form.valid){
        var trip = {
          userId: this.userId,
          entertaimentsIds: this.newTrip.entertaimentsIds,
          title: form.value.title,
          description: form.value.description,
          tripStart: form.value.tripStart,
        }
        const tripJson = JSON.stringify(trip);
        await this.service.createNewTrip(trip);
        this.createTripForm.reset();
        this.createTripForm.reset();
        this.childView.entertainments = []
        setTimeout(()=>{
        }, 3500)
      }
    }
    getEntertainments(){
      this.entertainments = [];
      this.entertainmentService.getAllEntertainment(this.type)
      .then((res:Array<IEntertainmentPreview>)=>{
        this.entertainments = res;
      })
    }

}


