import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { IUserProfile, IUserSearchProperties, IUserUpdate } from '../models/user.model';

@Injectable()
export class UserManagementDataService {

    constructor(private client: HttpClient) {}


    getUserProfile(username: string): Observable<IUserProfile> {
        return this.client.get(`/api/user/username?username=${username}`)
        .pipe(first(), map((res: IUserProfile) => {
            return res as IUserProfile;
        }));
    }


    getUsers(userInfoForm: IUserSearchProperties): Observable<IUserProfile[]> {
        return this.client.get(`/api/user/search?name=${userInfoForm.name}&email=${userInfoForm.email}&gender=${userInfoForm.gender}`)
        .pipe(first(), map((res: IUserProfile[]) => res));
    }


    getUsersRange(skip: number, take: number): Observable<IUserProfile[]> {
        return this.client.get(`/api/user/users?skip=${skip}&take=${take}`)
        .pipe(first(), map((res: IUserProfile[]) => res),
        catchError(this.handleError('getUserRange'))
      ) as Observable<IUserProfile[]>
      ;
    }

    updateUser(updateUser: IUserUpdate): Observable<IUserUpdate> {
        return this.client.put<IUserUpdate>(`/api/user/update`, updateUser)
        }


    deleteUser(id: string): Observable<boolean> {
         return this.client.delete(`/api/user/delete?Id=${id}`)
           .pipe(first(), map((res: any) => {
             return res as boolean;
           }));
  }

  private handleError<T>(operation = 'operation') {
  return (error: HttpErrorResponse): Observable<T> => {
    console.error(error);
    if (error.error instanceof Event) {
      throw error.error;
    }
    const message = `server returned code ${error.status} with body "${error.error}"`;
    throw new Error(`${operation} failed: ${message}`);
    };
  }
}

