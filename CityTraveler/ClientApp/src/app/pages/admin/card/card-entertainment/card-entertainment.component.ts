import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'card-entertaiment',
  templateUrl: './card-entertainment.component.html',
  styleUrls: ['./card-entertainment.component.scss']
})
export class CardEntertainmentComponent implements OnInit {
@Input() info :IEntertainmentPreview;

  constructor(private router: Router,public dialog: MatDialog,private service :AdminService,config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true; }

  ngOnInit() {
  }
  goTo(){
    this.router.navigate(["/admin/entertainment",this.info.id]);
    }
    openDeleteModal(): void {
    
      const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
        width: '300px',
        panelClass: 'dialog-modal',
        data: { email: '', password: '', isPersistent: false }
      });
      dialogRef.afterClosed().subscribe(async (result: boolean) => {
        if(result)
        {
          await this.service.deleteEntertaiment(this.info.id);
        }
       console.log("delete item id ",result, this.info.id )
      });
      window.scroll(0, 0);
    }
}
