import { AdminService } from 'src/app/services/admin.service';
import { ITrip } from 'src/app/models/tripModel';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { IDefaultTrip } from 'src/app/models/defaultTrip.model';
import { IUserProfile } from 'src/app/models/user.model';
import { TripService } from 'src/app/services/tripService';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: ActivatedRoute,private service: TripService,private aservice: AdminService) { }
  trip:ITrip;
  tripId: string;
  users:IUserProfile[]=[];
  entertaiments :IEntertainmentPreview[]=[];
  openDeleteModal(): void {

    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: { email: '', password: '', isPersistent: false }
    });
    dialogRef.afterClosed().subscribe(async (result: boolean) => {


     console.log("delete item id ",result )
    });
    window.scroll(0, 0);
  }
  async ngOnInit() {
    this.route.paramMap.subscribe(
        async param => { let Id =  param.get('id');
          console.log(Id)
          this.tripId=Id;}

        )
        this.trip = await this.service.getDefaultTripById(this.tripId);
        console.log("q",this.trip);
        this.users = this.trip.users;
        
        this.entertaiments = await this.aservice.GetEntertaimentinTrip(this.tripId);
        console.log("q",this.entertaiments)
  }
  }

