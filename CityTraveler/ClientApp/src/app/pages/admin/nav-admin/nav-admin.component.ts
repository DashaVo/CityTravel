import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminTabs } from '../admin.component';
import { IMenuItem } from 'src/app/models/general.model';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit {

  constructor(private router: Router) {
  }

  public menuItems: IMenuItem[] = [
      { url: 'statistic', title: 'Statistic' },

      { url: 'history', title: 'History' },
      { url: 'review', title: 'Review' },
      { url: 'address', title: 'Address' },
      { url: 'trip', title: 'Trip' },
      { url: 'user', title: 'User' },
      { url: 'entertainment', title: 'Еntertainment' },

    ];


  ngOnInit() {
  }

}

