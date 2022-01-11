import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { RegisterRequest } from './../../models/general.model';
import { StorageService } from './storage.service';
import { IUserProfile } from 'src/app/models/user.model';
import { ApiService } from './api.service';
import { LoginRequest } from '../../models/general.model';
import { Injectable } from '@angular/core';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private service: ApiService, private storageService: StorageService) {}

  private refresh = new BehaviorSubject(false);

  public getRefresh(): Observable<boolean> {
    return this.refresh
  }

  public login(request: LoginRequest) {
    return this.service.post('/api/auth/login', request, false, false)
    .then((res: IUserProfile) => {
      this.storageService.set('user', res, 'session');
      this.storageService.set('token', res.accessToken, 'session');
      this.storageService.set('token', res.accessToken, request.isPersistent ? 'global' : 'session');
      this.refresh.next(true);
      return res;
    });
  }

  public register(request:RegisterRequest){
    return this.service.post('/api/auth/register', request, false, false)
    .then((res:IUserProfile)=>{
      this.refresh.next(true);
      return res;
    })
  }

  public logout() {
    return this.service.post('/api/auth/logout', {}, true, false)
    .then(() => {
      this.storageService.clear('session');
      this.storageService.remove('token', 'global');
      this.refresh.next(true)
    });
  }

  public getUser(): IUserProfile {
    const userJson = this.storageService.get('user', 'session');
    return userJson ? JSON.parse(userJson) : null;
  }
}
function fromNav(fromNav: any) {
  throw new Error('Function not implemented.');
}

