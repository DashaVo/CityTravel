import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { IAdminTripPreview } from 'src/app/models/filters/trip.admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'card-trip',
  templateUrl: './card-trip.component.html',
  styleUrls: ['./card-trip.component.scss']
})
export class CardTripComponent implements OnInit {
  @Input() trip: IAdminTripPreview;

  constructor(private router: Router,public dialog: MatDialog,private service: AdminService,config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true; }

  ngOnInit() {
  }
  goTo(){
    this.router.navigate(["/admin/trip",this.trip.id]);
    }
    openDeleteModal(): void {
    
      const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
        width: '300px',
        panelClass: 'dialog-modal',
        data: { email: '', password: '', isPersistent: false }
      });
      dialogRef.afterClosed().subscribe(async (result: boolean) => {
       if(result){
         this.service.deleteTrip(this.trip.id);
       }
       console.log("delete item id ",result, )
      });
      window.scroll(0, 0);
    }
    }

