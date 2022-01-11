import { LoaderService } from 'src/app/services/loader/loader.service';
import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers:  [ AdminService ]
})
export class AdminComponent  {

  constructor( public loaderService:LoaderService){}
  
}


export type AdminTabs = "user" | "address" | "review" | "trip" | "statistic" | "history" | "entertainment";
