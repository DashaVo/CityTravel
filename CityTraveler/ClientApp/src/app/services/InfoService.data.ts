import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {IEntertainmentPreview } from '../models/entertainment.preview.model';
import {IDefaultTrip} from '../models/defaultTrip.model';

@Injectable()
export class InfoDataService {

    constructor(private client: HttpClient) {}

    getUserPopularEntertainment(userId: string): Observable<IEntertainmentPreview> {
        return this.client.get(`/api/info/user/popular-entertaiment?userId=${userId}`)
        .pipe(first(), map((res: any) => {
            return res as IEntertainmentPreview;
        }));
    }
    getPopularEntertainment(): Observable<IEntertainmentPreview> {
      return this.client.get(`/api/info/popular-entertaiment`)
      .pipe(first(), map((res: any) => {
          return res as IEntertainmentPreview;
      }));
  }
    getGetMostPopularTrip(): Observable<IDefaultTrip> {
      return  this.client.get(`/api/info/trip-popular`)
      .pipe(first(), map((res: any) => {
        return res as IDefaultTrip;
      }));
    }
    GetLastTripsByPeriod(): Observable<IDefaultTrip[]> {
      return  this.client.get(`/api/info/trips-lastperiod`)
      .pipe(first(), map((res: IDefaultTrip[]) => {
        return res;
      }));
    }
}
