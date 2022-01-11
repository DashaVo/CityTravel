import { Component, Inject, Optional, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'empty-content',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit{

  constructor() {
  }

  @Input() public message = "";

  ngOnInit(){}

}
