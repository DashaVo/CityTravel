import { SocialMediaService } from './../services/socialMediaService';
import { AddReviewModalDialogComponent } from './../modals/socialmedia/addReview.modal';
import { LoginRequest, RegisterRequest } from './../models/general.model';
import { AuthService } from '../services/generalServices/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem } from '../models/general.model';
import { IUserProfile } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalDialogComponent } from '../modals/login/login.modal';
import { ReviewModel } from '../models/review.model';
import { RegisterModalDialogComponenet } from '../modals/register/register.modal';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public config = {
    isLoggedIn: false,
    isAdmin: false,
    isExpanded: false
  };

  public menuItems: IMenuItem[] = [];

  private adminMenuItems: IMenuItem[] = [
    {url: '/admin', title: 'Admin'},
    {url: '/user', title: 'Profile'}
  ];
  private userMenuItems: IMenuItem[] = [
    {url: '/user', title: 'Profile'}
  ];
  private contentMenuItems: IMenuItem[] = [

  ];
  private guestMenuItems: IMenuItem[] = [
    { url: '/entertainment', title: 'Entertainments' },
    { url: '/search/tab1', title: 'Search' },
    { url: '/info', title: 'Info'}
  ];


  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog, public socialMedia: SocialMediaService) {
  }

  getMenuItems = role => {
    let items = [ ...this.guestMenuItems];
    switch (role) {
      case 'Admin':
        items = [ ...items, ...this.adminMenuItems];
        break;
      case 'User':
        items = [ ...items,  ...this.userMenuItems];
        break;
      default:
        break;
    }
    return items;
  }


  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: { email: '', password: '', isPersistent: false }
    });

    dialogRef.afterClosed().subscribe(async (result: LoginRequest) => {
      await this.login(result);
    });
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(RegisterModalDialogComponenet, {
      panelClass: 'dialog-modal',
      data: {name: '', userName: '', email: '',
            password: '', avatarSrc: ''  }
    });

    dialogRef.afterClosed().subscribe(async (result: RegisterRequest) => {
      await this.register(result);
    });
  }


  ngOnInit() {
    this.getUser();

    this.authService.getRefresh().subscribe((result: boolean) => {
      if (result) {
        this.getUser();
      }
    });
  }

  getUser() {
    const user = this.authService.getUser();
    if (user) {
      this.config.isLoggedIn = true;
      this.menuItems = this.getMenuItems(user.role);
    }
    else{
      this.menuItems = [ ...this.guestMenuItems];
    }
  }

  collapse() {
    this.config.isExpanded = false;
  }

  toggle() {
    this.config.isExpanded = !this.config.isExpanded;
  }

  public goTo(route: string) {
    this.router.navigate([route]);
  }

  private async login(request: LoginRequest) {
    await this.authService.login(request)
    .then((res: IUserProfile) => {
      if (res) {
        this.config.isLoggedIn = true;
        this.menuItems = this.getMenuItems(res.role);
      }
    });
  }
private async register(request: RegisterRequest) {
    await this.authService.register(request)
}

  public async logout() {
    await this.authService.logout().then(() => {
      this.goTo('/');
    }).then(() => {
      this.menuItems = this.getMenuItems('guest');
      this.config.isLoggedIn = false;
    });
  }


}

