export interface ITripPreviewModel {
  id: string,
  averageRating: number,
  title: string,
  description: string,
  tagSting: string,
  optimalSpent: string,
  dafaultTrip: boolean,
  mainImage: {
    source: string,
    title: string,
  }
}
