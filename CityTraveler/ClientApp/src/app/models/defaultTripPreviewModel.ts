export interface IDefaultTripPreview{
    tripId: string,
    title: string,
    description: string,
    tagString: string
    mainImage: {
        source: string,
        title: string,
    }
    optimalSpent: Date,
    averageRating:string,
    entertainments: string[],
}
