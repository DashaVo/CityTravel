import { AdminService } from 'src/app/services/admin.service';
import { SocialMediaService } from 'src/app/services/socialMediaService';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { IEntertainmentShow } from 'src/app/models/entertainment.show.model';
import { IAdminReviewPreview, IAdminTripPreview } from 'src/app/models/filters/trip.admin.model';
import { EntertainmentService } from 'src/app/services/entertainmentService';

@Component({
  selector: 'app-entertainment-detail',
  templateUrl: './entertainment-detail.component.html',
  styleUrls: ['./entertainment-detail.component.scss']
})
export class EntertainmentDetailComponent implements OnInit {
  trips: IAdminTripPreview[]=[];
  reviews: IAdminReviewPreview[]=[];
  eid:string;
  entertaiment:IEntertainmentShow;

  constructor(public dialog: MatDialog,private socialservice:AdminService, private eservice:EntertainmentService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(
        param => { let id =  param.get('id');
        console.log(id)
        this.eid = id;
       })
        this.entertaiment = await this.eservice.getEntertainment(this.eid);
        console.log("q",this.entertaiment);
        this.trips = await this.socialservice.getTripsByEntertainmentId(this.eid,0,3);
        console.log(this.trips);
        this.reviews = await this.socialservice.getObjectReviews(this.eid,0,3);
        console.log(this.reviews);
        
        
  }
  openDeleteModal(): void {
    
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: { email: '', password: '', isPersistent: false }
    });
    dialogRef.afterClosed().subscribe(async (result: boolean) => {
     
     console.log("delete item id ",result  )
    });
    window.scroll(0, 0);
  }
  
}
