import { Coordinates } from './map/coordinates.model';
import { IImageDTO } from './filters/trip.admin.model';

export interface IEntertainmentDTO {
  title: string,
  type: number,
  averagePrice: {
    title: string,
    value: number,
  }
  images: IImageDTO[],
  description: string,
  address: {
    coordinates: Coordinates,
    streetId: string,
    houseNumber: string,
    apartmentNumber: string,
  },
  begin: Date,
  end: Date,
}
