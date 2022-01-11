import { Injectable } from "@angular/core";
import { Data } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "./generalServices/api.service";

@Injectable({
  providedIn: 'root'
  })
export class StatisticService {

  constructor(private service: ApiService) {}

    public async  GetStatisticCharts(): Promise<any>{
      return await this.service.get(`/api/statistic/charts`, false)
      .then((res:any)=>{
        return res;
      });
    }
    public async  GetStatisticActivity(): Promise<any>{
      return await this.service.get(`/api/statistic/activity`, false)
      .then((res:any)=>{
        return res;
      });
    }
    public async  GetAverageUserAge(): Promise<Data>{
      return await this.service.get(`/api/statistic/users-average-age`, false)
      .then((res:Data)=>{
        return res;
      });
    }


}
