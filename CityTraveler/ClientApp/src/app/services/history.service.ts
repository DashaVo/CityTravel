import { Injectable } from "@angular/core";
import { Data } from "@angular/router";
import { Observable } from "rxjs";
import { ICommentPreview } from "../models/comment.model";
import { IAdminTripPreview } from "../models/filters/trip.admin.model";
import { ApiService } from "./generalServices/api.service";

@Injectable({
  providedIn: 'root'
  })
export class HistoryService {

  constructor(private service: ApiService) {}

    public async  GetLastUserComment( username:string): Promise<ICommentPreview>{
      return await this.service.get(`/api/history/get-last-user-comment?username=${username}`, false)
      .then((res:ICommentPreview)=>{
        return res;
      });
    }
    public async  GetLastComment(): Promise<ICommentPreview>{
        return await this.service.get(`/api/history/get-last-comment`, false)
        .then((res:ICommentPreview)=>{
          return res;
        });
      }
    public async  GetLastTrip(): Promise<IAdminTripPreview>{
        return await this.service.get(`/api/history/get-last-trip`, false)
        .then((res:IAdminTripPreview)=>{
          return res;
        });
      }

}
