import { TripStatus } from "src/app/enums/tripStatus";

export interface IFilterTrips {
    tripStart: Date,
    entertainmentName: string,
    user: string,
    priceMore: number,
    priceLess: number,
    averageRatingMore: number,
    averageRatingLess: number,
    title: string,
    description: string,
    tripStatus: TripStatus
}
