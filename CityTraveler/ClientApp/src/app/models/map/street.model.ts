import { Coordinates } from "./coordinates.model";

export interface StreetModel {
  id: string,
  title: string,
  description: string,
  coordinates: Coordinates[],
}
