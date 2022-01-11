import { Entertainment } from './../../../models/entertainment.show.model';
import { ClickBox } from './../../../models/map/click.box';
import { MapConfig } from './../../../models/map/map.config';
import { Coordinates } from './../../../models/map/coordinates.model';
import { StreetModel } from './../../../models/map/street.model';
import { MapService } from './../../../services/map.service';
import { Component, OnInit } from '@angular/core';
import { IEntertainmentMap } from 'src/app/models/map/entertainment.map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  public entertainmntTake = 5;
  public streets = [];
  public clickBoxes: ClickBox[] = [];
  streetsCanvas: HTMLCanvasElement;
  streetsContext: CanvasRenderingContext2D;
  selectionCanvas: HTMLCanvasElement;
  selectionContext: CanvasRenderingContext2D;
  entertainmentsCanvas: HTMLCanvasElement;
  entertainmentsContext: CanvasRenderingContext2D;

  async ngOnInit() {
    this.entertainmentsCanvas = document.querySelector('#entertainments');
    this.entertainmentsContext = this.entertainmentsCanvas.getContext('2d');
    this.streetsCanvas = document.querySelector('#streets');
    this.streetsContext = this.streetsCanvas.getContext('2d');

    this.mapService.getEntertainmentsToInit().subscribe((entertainments: IEntertainmentMap[]) => {
      if(entertainments) {
        entertainments.forEach(entertainment => {
          this.drawEntertainment(entertainment);
        });
      }
    })

    this.initEntertainments();

    this.mapService.getRedrawingStreets().subscribe((need: boolean) => {
      if(need) {
        this.initStreets();
      }
    });

    this.mapService.getCurrentStreetId().subscribe((result: string) => {
      this.selectionCanvas = document.querySelector('#selected-street');
      this.selectionContext = this.selectionCanvas.getContext('2d');
      this.selectionContext.clearRect(0, 0, this.selectionCanvas.width, this.selectionCanvas.height);

      if(result) {
        this.mapService.getStreetById(result).then((street) => {
          this.drawStreet(street, MapConfig.streets.selectedStreetColor, this.selectionContext);
        });
      }
    });
  }

  OnDestroy() {
    this.mapService.removeCurrentStreet();
  }

  initEntertainments() {
    this.streetsContext.clearRect(0, 0, this.entertainmentsCanvas.width, this.entertainmentsCanvas.height);
    this.mapService.loadEntertainmentsFromStorage(this.entertainmntTake);
  }

  drawEntertainment(entertainment: IEntertainmentMap, color: string = MapConfig.entertainment.color, context: CanvasRenderingContext2D = this.entertainmentsContext) {
    context.beginPath();

    context.strokeStyle = color;
    context.lineWidth = MapConfig.entertainment.size;
    context.lineTo(entertainment.coordinates.longitude - MapConfig.entertainment.size/2, entertainment.coordinates.latitude);
    context.lineTo(entertainment.coordinates.longitude + MapConfig.entertainment.size/2, entertainment.coordinates.latitude);
    context.stroke();

    context.closePath();
  }

  initStreets() {
    this.streetsContext.clearRect(0, 0, this.streetsCanvas.width, this.streetsCanvas.height);
    this.mapService.getStreetsFromStorage()
    .then((streets: StreetModel[]) => {
      this.streets = streets;
      this.pointsOutput(streets);

      this.streets.forEach((street: StreetModel) => {
        this.drawStreet(street);
        if(street.coordinates.length !=0 ){
          this.buildClickBox(street);
        }
      });
    });
  }

  public drawStreet(street: StreetModel, color: string = MapConfig.streets.color, context: CanvasRenderingContext2D = this.streetsContext){
    context.beginPath();

    street.coordinates.forEach((point: Coordinates) => {
      context.strokeStyle = color;
      context.lineWidth = MapConfig.streets.width;
      context.lineTo(point.longitude, point.latitude);
      context.stroke();
    });

    context.closePath();
  }

  selectStreet(streetId: string) {
    this.mapService.setCurrentStreetId(streetId);
  }

  buildClickBox(street: StreetModel) {
    var topPoints: Coordinates[] = [];
    var bottomPoints: Coordinates[] = [];
    var topPoint: Coordinates;
    var bottomPoint: Coordinates;

    street.coordinates.forEach(point => {

      if(street.coordinates.indexOf(point) < street.coordinates.length - 1){
        var index = street.coordinates.indexOf(point) + 1;
        var nextPoint: Coordinates = street.coordinates[index];
        var arcTan = Math.atan2(point.latitude - nextPoint.latitude, point.longitude - nextPoint.longitude); // (y1-y2, x1-x2)

        switch(true) {
          case (0 < arcTan && arcTan <= Math.PI / 4 || - Math.PI <= arcTan && arcTan <= - 3 * Math.PI / 4): {
            topPoint = {
              longitude: point.longitude - MapConfig.streets.width / 4,
              latitude: point.latitude + MapConfig.streets.width / 2,
            }
            bottomPoint = {
              longitude: point.longitude + MapConfig.streets.width / 4,
              latitude: point.latitude - MapConfig.streets.width / 2,
            }
          }
          case (Math.PI / 4 < arcTan && arcTan <= Math.PI / 2 || - 3 * Math.PI / 4 < arcTan && arcTan <= - Math.PI / 2): {
            topPoint = {
              longitude: point.longitude - MapConfig.streets.width / 2,
              latitude: point.latitude + MapConfig.streets.width / 4,
            }
            bottomPoint = {
              longitude: point.longitude + MapConfig.streets.width / 2,
              latitude: point.latitude - MapConfig.streets.width / 4,
            }
          }
          case (Math.PI / 2 < arcTan && arcTan <= 3 * Math.PI / 4 || - Math.PI / 2 < arcTan && arcTan <= - Math.PI / 4): {
            topPoint = {
              longitude: point.longitude + MapConfig.streets.width / 2,
              latitude: point.latitude + MapConfig.streets.width / 4,
            }
            bottomPoint = {
              longitude: point.longitude - MapConfig.streets.width / 2,
              latitude: point.latitude - MapConfig.streets.width / 4,
            }
          }
          case (3 * Math.PI / 4 < arcTan && arcTan <=  Math.PI || - Math.PI / 4 < arcTan && arcTan <= 0): {
            topPoint = {
              longitude: point.longitude + MapConfig.streets.width / 4,
              latitude: point.latitude + MapConfig.streets.width / 2,
            }
            bottomPoint = {
              longitude: point.longitude - MapConfig.streets.width / 4,
              latitude: point.latitude - MapConfig.streets.width / 2,
            }
          }
        }
      }

      topPoints.push(topPoint);
      bottomPoints.push(bottomPoint);
    });

    var prepearedPoints = [];
    topPoints.concat(bottomPoints).forEach(point => {
      prepearedPoints.push(point.longitude);
      prepearedPoints.push(point.latitude);
    });

    this.clickBoxes.push({
      streetId: street.id,
      points: prepearedPoints.toString(),
    });
  }

  pointsOutput(streets: StreetModel[]) {
    var result: Coordinates[] = [];
    streets.forEach(street => {
      result = result.concat(street.coordinates);
    });
    this.mapService.addPoints(result, []);
  }
}
