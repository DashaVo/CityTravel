import { IImageModel } from "./image.model";

export interface IReviewPreviewModel {
    id: string,
    userId: string,
    name: string,
    title: string,
    description: string,
    imageDTO: {
        source: string,
        title: string,
    },
    modified: string,
    ratingValue: number,
    ratingId: string;
    images: IImageModel[];
}
