import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IDefaultTrip } from "../models/defaultTrip.model";
import { IEntertainmentPreview } from "../models/entertainment.preview.model";
import { IEntertainmentShow } from "../models/entertainment.show.model";
import { IFilterEntertainments } from "../models/filters/filtertEntertainments";
import { IFilterTrips } from "../models/filters/filterTrips";
import { IFiltertUsers } from "../models/filters/filterUsers";
import { ITrip } from "../models/tripModel";
import { IUserProfile } from "../models/user.model";
import { EntertainmentPreviewComponent } from "../pages/Entertainment/entertainmentPreview/entertainment.preview.component";
import { ApiService } from "./generalServices/api.service";

@Injectable()
export class SearchService {

    constructor(private service: ApiService) { }
    getUsers(props: IFiltertUsers) : Promise<IUserProfile[]> {
        return this.service.get(`/api/search/users?UserName=${props.name}&EntertainmentName=${props.entertainmentName}&Gender=${props.gender}`);
    }
    getTrips(props: IFilterTrips) : Promise<ITrip[]> {
        return this.service.get(`/api/search/trips?TripStart=${props.tripStart}&EntertainmentName=${props.entertainmentName}&User=${props.user}&PriceMore=${props.priceMore}&PriceLess=${props.priceLess}&AverageRatingMore=${props.averageRatingMore}&AverageRatingLess=${props.averageRatingLess}&Title=${props.title}&Description=${props.description}&TripStatus=${props.tripStatus}`,false);
    }
    getEntertainments(props: IFilterEntertainments) : Promise<IEntertainmentPreview[]> {
        return this.service.get(`/api/search/entertainments?StreetName=${props.streetName}&Type=${props.type}&HouseNumber=${props.houseNumber}&TripName=${props.tripName}&Title=${props.title}&PriceMore=${props.priceMore}&PriceLess=${props.priceLess}&RatingMore=${props.ratingMore}&RatingLess=${props.ratingLess}`);
    }
}
