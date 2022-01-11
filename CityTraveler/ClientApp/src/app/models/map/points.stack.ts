import { Coordinates } from "./coordinates.model"

export interface PointsStack {
  currentPoints: Coordinates[],
  streetPoints: Coordinates[],
  allPoints: Coordinates[]
}
