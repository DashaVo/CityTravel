import { IEntertainmentPreview } from "./entertainment.preview.model";

export interface ITrip{
  id:string,
  title:string,
  description:string,
  tagString:string,
  tripStart?: Date,
  tripEnd?: Date,
  optimalSpent: Date,
  realSpent?:Date,
  price: string,
  averageRating: string,
  tripStatus?: number,
  dafaultTrip?: boolean,
  images: [],
  mainImage?:{
    source: string,
    title: string,
  }
  reviews: [],
  entertainments: IEntertainmentPreview[],
  users: [],
}

export class Trip implements ITrip{
  id: string;
  title: string;
  description: string;
  tagString: string;
  tripStart?: Date;
  tripEnd?: Date;
  optimalSpent: Date;
  realSpent?: Date;
  price: string;
  averageRating: string;
  tripStatus?: number;
  dafaultTrip?: boolean;
  images: [];
  mainImage?: {
    source: string;
    title: string;
  };
  reviews: [];
  entertainments :[];
  users: [];
}
