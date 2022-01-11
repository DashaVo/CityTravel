
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { Component, Input, OnInit } from '@angular/core';
import { IAdminReviewPreview } from 'src/app/models/filters/trip.admin.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.scss'],
  providers: [NgbRatingConfig]
})
export class CardReviewComponent implements OnInit {
  @Input() review : IAdminReviewPreview ;
  constructor(private router: Router,public dialog: MatDialog,config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
   }
   
  ngOnInit() {
  }
  goTo(){
    this.router.navigate(["/admin/review",this.review.id]);
    }
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
    }

