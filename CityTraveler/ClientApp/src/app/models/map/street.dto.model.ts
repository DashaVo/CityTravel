import { Coordinates } from "./coordinates.model";

export interface StreetDTOModel {
  title: string,
  description: string,
  coordinates: Coordinates[],
}
