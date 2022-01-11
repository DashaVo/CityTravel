import { EntertainmentType } from "src/app/enums/entertainmentType";

export interface IFilterEntertainments {
   streetName : string,
   type : EntertainmentType,
   houseNumber: string,
   tripName: string,
   title: string,
   priceMore: number,
   priceLess: number,
   ratingMore: number,
   ratingLess: number
}
