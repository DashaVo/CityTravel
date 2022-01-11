
    import { TripStatus } from "src/app/enums/tripStatus";

export interface IFilterAdminTrips
{
    tripStart: Date,
    tripEnd: Date,
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
