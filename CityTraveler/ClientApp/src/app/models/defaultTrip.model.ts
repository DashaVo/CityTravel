import { IUserProfile } from 'src/app/models/user.model';
import { Time } from "@angular/common";
import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Identifier } from "typescript";

export interface IDefaultTrip{
    id:string
    title: string,
    description: string,
    tagString: string,
    price: string,
    averageRating: string,
    optimalSpent: Date,
    images: [],
    entertainments: [],
    users: [],
    tripStatus:number,
    reviews:[],
    realSpent:Date
}

export class DefaultTrip{
}
