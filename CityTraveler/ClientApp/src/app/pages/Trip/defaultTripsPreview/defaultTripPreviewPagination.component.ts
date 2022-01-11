import {Component, Input, OnInit}from '@angular/core';
import { TripService } from 'src/app/services/tripService';

@Component({
  selector:"app-pagination",
  templateUrl:"./defaultTripPreviewPagination.component.html",
  styleUrls:["./defaultTripPreviewPagination.component.scss"]
})

export class DefaultTripPreviewPaginationComponenet implements OnInit{

  @Input() pages=[];

  ngOnInit(){}
}
