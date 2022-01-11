import { IImageModel } from './../../models/image.model';
import { Component, Inject, Optional, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginModalDialogComponent } from '../login/login.modal';
import { EmptyComponent } from './../../pages/Entertainment/components/empty/empty.component';

@Component({
  selector: 'gallery-modal',
  templateUrl: './gallery.modal.html',
  styleUrls: ['./gallery.modal.scss']
})
export class GalleryModalComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<GalleryModalComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: Array<IImageModel>) {
    this.gallery = data;
  }

  public gallery: Array<IImageModel>;

  ngOnInit() {}

  closeGallery() {
    this.dialogRef.close();
  }
}
