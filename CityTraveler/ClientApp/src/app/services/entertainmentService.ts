import { ApiService } from './generalServices/api.service';
import { Injectable } from "@angular/core";
import { IEntertainmentPreview } from "../models/entertainment.preview.model";
import { IEntertainmentShow } from "../models/entertainment.show.model";

@Injectable()
export class EntertainmentService {

    constructor(private dataService: ApiService) { }

    getEntertainment(id: string): Promise<IEntertainmentShow> {
      return this.dataService.get(`/api/entertainment/id?Id=${id}`);
    }

    getAllEntertainment(type: number) : Promise<Array<IEntertainmentPreview>> {
        return this.dataService.get(`/api/entertainment/all?type=${type}`);
    }

    getTypes() : Promise<Array<string>> {
        return this.dataService.get(`/api/entertainment/types`);
    }
}
