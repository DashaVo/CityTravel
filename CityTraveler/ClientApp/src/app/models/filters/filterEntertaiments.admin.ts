import { EntertainmentType } from "src/app/enums/entertainmentType";


export interface IFilterAdminEntertainments
{
   streetName : string,
   type : EntertainmentType,
   title: string,
   description: string
   averagePriceMore: number,
   averagePriceLess: number,
   averageRatingMore: number,
   averageRatingLess: number
}
