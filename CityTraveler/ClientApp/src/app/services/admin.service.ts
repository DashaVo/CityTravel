import { IDefaultTripPreview } from './../models/defaultTripPreviewModel';
import { IUserProfile } from 'src/app/models/user.model';
import { IReviewPreviewModel } from '../models/reviewPreview.model';

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAdminAddress } from "../models/adminAddress.model";
import { map } from "rxjs/operators";
import { ApiService } from "./generalServices/api.service";
import { IEntertainmentPreview } from '../models/entertainment.preview.model';
import { IFilterAdminEntertainments } from '../models/filters/filterEntertaiments.admin';
import { IFilterAdminReviews } from "../models/filters/filterReviews.admin";
import { IFilterAdminUsers } from '../models/filters/filterUser.admin';
import { IFilterAdminTrips } from '../models/filters/filterTrip.admin';
import { IAdminReviewPreview, IAdminTripPreview } from '../models/filters/trip.admin.model';


@Injectable({
    providedIn: 'root'
    })
export class AdminService {

    constructor(private service: ApiService) {}

    public   FilterAddressStreets(filter: string ,skip:number,take:number) : Promise<IAdminAddress[]>{
      return  this.service.post(`/api/admin/streets?skip=${skip}&take=${take}`,filter, false)
      .then((res:IAdminAddress[])=>{
        return res;
      });
    }
    public async FilterEntertaiments(filter: IFilterAdminEntertainments,skip:number,take:number) : Promise<IEntertainmentPreview[]>{
      return await this.service.post(`/api/admin/entertaiments?skip=${skip}&take=${take}`,filter, false)
      .then((res:IEntertainmentPreview[])=>{
        return res;
      });

    }
    public async FilterReviews(filter: IFilterAdminReviews,skip:number,take:number): Promise<IAdminReviewPreview[]>{
      return await this.service.post(`/api/admin/reviews?skip=${skip}&take=${take}`,filter, false)
      .then((res:IAdminReviewPreview[])=>{
        return res;
      });

    }
    public async ReviewsByUser(username:string): Promise<IAdminReviewPreview[]>{
      return await this.service.get(`/api/admin/reviews-by-user?username=${username}`, false)
      .then((res:IAdminReviewPreview[])=>{
        return res;
      });

    }
    public async TripsByUser(username:string): Promise<IAdminTripPreview[]>{
      return await this.service.get(`/api/admin/trips-by-user?username=${username}`, false)
      .then((res:IAdminTripPreview[])=>{
        return res;
      });

    }
    public async getTripsByEntertainmentId(entertainmentId:string, skip:number, take:number): Promise<IAdminTripPreview[]>{
      return await this.service.get(`/api/trips/trip-by-entertainment?entertainmentId=${entertainmentId}&skip=${skip}&take=${take}`)
      .then((res:IAdminTripPreview[])=>{
        return res;
      })
    }

    getObjectReviews(objectId:string, skip:number, take:number): Promise<IAdminReviewPreview[]> {
      return this.service.get(`/api/socialmedia/object-reviews?id=${objectId}&skip=${skip}&take=${take}`);
  }
    public async FilterUsers(filter: IFilterAdminUsers,skip:number,take:number): Promise<IUserProfile[]>{
      return await this.service.post(`/api/admin/users?skip=${skip}&take=${take}`,filter, false)
      .then((res:IUserProfile[])=>{
        return res;
      });

    }
    public async FilterTrips(filter: IFilterAdminTrips,skip:number,take:number): Promise<IAdminTripPreview[]>{
      return await this.service.post(`/api/admin/trips?skip=${skip}&take=${take}`,filter, false)
      .then((res:IAdminTripPreview[])=>{
        return res;
      });

    }
    public   GetEntertaimentOnAddress(filter: IAdminAddress) : Promise<IEntertainmentPreview[]>{
      return  this.service.post(`/api/admin/entertaiments-on-streets`,filter, false)
      .then((res:IEntertainmentPreview[])=>{
        return res;
      });
    }
    public   GetEntertaimentinTrip(id: string) : Promise<IEntertainmentPreview[]>{
      return  this.service.get(`/api/admin/entertaiments-in-trip?id=${id}`, false)
      .then((res:IEntertainmentPreview[])=>{
        return res;
      });
    }
    public deleteEntertaiment(objectId: string):Promise<boolean>{
      return this.service.delete(`/api/admin/delete-entertaiment?objectId=${objectId}`);
  }
  public deleteTrip(objectId: string):Promise<boolean>{
    return this.service.delete(`/api/admin/delete-trip?tripId=${objectId}`);
}
    public async getUserByUsername(username: string){
      return await this.service.get(`/api/admin/username?username=${username}`, false)
      .then((res:IUserProfile)=>{
        return res;
      });
    }
}
