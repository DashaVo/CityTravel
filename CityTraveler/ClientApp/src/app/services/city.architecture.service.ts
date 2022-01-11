import { IEntertainmentDTO } from './../models/entertainment.dto';
import { StreetDTOModel } from './../models/map/street.dto.model';
import { ApiService } from './generalServices/api.service';
import { Injectable } from "@angular/core";

@Injectable()
export class CityArchitectureService {

    constructor(private dataService: ApiService) { }

    deleteEntertainment(id: string): Promise<boolean> {
      return this.dataService.delete(`/api/city-architecture/remove-entertainment?id=${id}`);
    }

    addEntertainment(entertainment: IEntertainmentDTO): Promise<boolean> {
      return this.dataService.post(`/api/city-architecture/add-entertainment`, entertainment);
    }

    deleteStreet(streetId: string): Promise<boolean> {
      return this.dataService.delete(`/api/city-architecture/remove-street?id=${streetId}`);
    }

    addStreet(streetDto: StreetDTOModel): Promise<boolean> {
      return this.dataService.post('/api/city-architecture/add-street', streetDto);
    }
}
