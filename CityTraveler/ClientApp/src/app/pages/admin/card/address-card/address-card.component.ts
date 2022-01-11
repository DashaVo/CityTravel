import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { IAdminAddress } from 'src/app/models/adminAddress.model';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';

@Component({
  selector: 'address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class CardAddressComponent  {

  hide:boolean = false;
  @Input() item : IAdminAddress;
  entertaiments: IEntertainmentPreview[] = [];

  constructor(public dialog: MatDialog,private service :AdminService,private router: Router) { }

  openDeleteModal(): void {
    
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: { email: '', password: '', isPersistent: false }
    });
    dialogRef.afterClosed().subscribe(async (result: boolean) => {
     console.log("delete",result)
    });
    window.scroll(0, 0);
  }
  async toggle(){
    this.hide = !this.hide;
    console.log(this.hide);
    if(this.hide){
      this.entertaiments = await this.service.GetEntertaimentOnAddress(this.item);
      console.log(this.entertaiments);
    }
  }
}
