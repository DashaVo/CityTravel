import { IReviewPreviewModel } from "./reviewPreview.model";

export interface IEntertainmentShow {
    id: string,
    title: string,
    type: string,
    address: {
        street: {
            title: string,
        },
        houseNumber: string,
        apartmentNumber: string,
    },
    description: string,
    images: [],
    averageRating: number,
    mainImage: {source: string, title: string},
    averagePrice: {
        title: string,
        value: number,
      },
    begin: string,
    end: string,
    reviewsCount: number,
    tripsCount: number
}

export class Entertainment { }
