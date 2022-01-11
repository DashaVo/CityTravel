import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserProfile, IUserSearchProperties, IUserUpdate } from '../models/user.model';
import { UserManagementDataService } from './userManagementService.data';

@Injectable()
export class UserManagementService {

    constructor(private dataService: UserManagementDataService) {}

    getUserProfile(username: string): Observable<IUserProfile> {
        return this.dataService.getUserProfile(username);
    }

    getUsers(props: IUserSearchProperties): Observable<IUserProfile[]> {
        return this.dataService.getUsers(props);
    }

    getUserRange(skip: number, take: number): Observable<IUserProfile[]> {
        return this.dataService.getUsersRange(skip, take);
    }

    updateUser(updateUser: IUserUpdate): Observable<IUserUpdate> {
        return this.dataService.updateUser(updateUser);
    }

    deleteUser(id: string): Observable<boolean> {
        return this.dataService.deleteUser(id);
    }
}
