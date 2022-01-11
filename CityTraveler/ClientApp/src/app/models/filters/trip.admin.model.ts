export interface IImageDTO{

  source: string,
  title: string,
}

export interface IAdminTripPreview{

  id:string
  title: string,
  description: string,
  tagString: string,
  averageRating: string,
  optimalSpent: Date,
  mainImage: IImageDTO
}

export interface IAdminReviewPreview{

  modified: Date,
  ratingValue: number,
  userName: null
  id:string
  title: string,
  description: string,
  tagString: string,
  averageRating: string,
  optimalSpent: Date,
  mainImage: IImageDTO
}
