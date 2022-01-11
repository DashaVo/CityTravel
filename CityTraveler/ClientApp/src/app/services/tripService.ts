import { BehaviorSubject, Observable } from 'rxjs';
import { ITrip, Trip } from './../models/tripModel';
import { ApiService } from './generalServices/api.service';
import { Injectable } from "@angular/core";
import { NewTrip } from "../models/newTripModel";
import { ITripPreviewModel } from '../models/tirpPreview.model';

@Injectable()
export class TripService {
    constructor(private service: ApiService){}

    private  entertainmentData = new BehaviorSubject({ id: '', title: '' });

    public setEntertainmentData(id: string, title: string){
      this.entertainmentData.next({id : id, title : title});
    }

    public getEntertainmentData():Observable<{id:string, title:string}>{
      return this.entertainmentData;
    }

    public async deleteTrip(tripId: string){
      return await this.service.delete(`/api/trips/trip?tripId=${tripId}`);
    }

    public async updateDefaultTrip(trip: Trip){
        return await this.service.put(`/api/trips/default-trip`, trip, true)
        .then((res:ITrip)=>{
          return res;
        })
    }

    public async getDefaultTripById(tripId: string){
      return await this.service.get(`/api/trips/default-trip?Id=${tripId}`, false)
      .then((res:ITrip)=>{
        return res;
      });
    }

    public async getDefaultTrips(skip: number, take: number){
      return await this.service.get(`/api/trips/default-trips?skip=${skip}&take=${take}`, false)
      .then((res:ITrip[])=>{
        return res;
      });
    }

    public createNewTrip(trip: NewTrip){
        return this.service.post(`/api/trips/trip`, trip, false, false);
    }

    public async getTripById(tripId: string):Promise<ITrip>{
      return await this.service.get(`/api/trips/trip?tripId=${tripId}`)
      .then((res:ITrip)=>{
        return res;
      })
    }

    public async getUserTrips(userId:string){
      return await this.service.get(`/api/trips/trips-by-user?userId=${userId}`)
      .then((res: ITrip[])=>{
        return res;
      })
    }

    public async getTripsByEntertainmentId(entertainmentId:string, skip:number, take:number){
      return await this.service.get(`/api/trips/trip-by-entertainment?entertainmentId=${entertainmentId}&skip=${skip}&take=${take}`)
      .then((res:ITripPreviewModel[])=>{
        return res;
      })
    }


    public async addEntertainmentToTrip(tripId: string, entertainmentId: string) {
      return await this.service.put(`/api/trips/entertainment?tripId=${tripId}`, entertainmentId)
    }

    public async getTripsByUserId(userId: string){
      return await this.service.get(`/api/trips/trips-preview-by-user?userId=${userId}`)
      .then((res: ITripPreviewModel[])=>{
        return res;
      })
    }
}

