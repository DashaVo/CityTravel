

export interface IEntertainmentPreview {
    images: any;
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
    tripsCount: number,
    reviewsCount: number,
    averageRating: number,
    mainImage: {
        source: string,
        title: string,
    }
    
}
