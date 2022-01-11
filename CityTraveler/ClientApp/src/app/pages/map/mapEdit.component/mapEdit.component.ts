import { entertainmentPreview } from './../../../models/initialValues';
import { MapService } from './../../../services/map.service';
import { StreetModel } from './../../../models/map/street.model';
import { MapConfig } from './../../../models/map/map.config';
import { Coordinates } from './../../../models/map/coordinates.model';
import { CityArchitectureService } from '../../../services/city.architecture.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { PointsStack } from 'src/app/models/map/points.stack';

@Component({
  selector: 'app-map-edit',
  templateUrl: './mapEdit.component.html',
  styleUrls: ['./mapEdit.component.scss']
})
export class MapEditComponent implements OnInit {

  constructor(private mapService: MapService) { }
  private map: HTMLCanvasElement;
  private canvas: HTMLCanvasElement
  private canvasContex;
  private activeListeners: {
    type: string,
    func: (event: Event) => void
  }[] = [];
  public config = {
    currentAction: {object: '', mode: ''},
    cursor: {
      x: 0,
      y: 0,
    },
  }
  public points: PointsStack = {
    currentPoints: [],
    streetPoints: [],
    allPoints: [],
  }
  public isSucceeded: boolean;
  public removeStreetForm: FormGroup;
  public router = [
    {name: 'Street',
     modes: [{name: 'Add', method: () => this.addStreetMode('Street' ,'Add')},
             {name: 'Remove', method: ()=> this.removeStreetMode('Street' ,'Remove')},
             {name: 'Update', method: ()=> this.updateStreetMode('Street' ,'Update')}]},
    {name: 'Entertainment',
     modes: [{name: 'Add', method: ()=> this.addEntertainmentMode('Entertainment' ,'Add')},
             {name: 'Remove', method: ()=> this.removeEntertainmentMode('Entertainment' ,'Remove')},
             {name: 'Update', method: ()=> this.updateEntertainmentMode('Entertainment' ,'Update')}]},
  ]

  ngOnInit() {
    this.mapService.removeCurrentStreet();

    this.canvas = document.querySelector('#map');
    this.canvasContex = this.canvas.getContext('2d');

    this.mapService.getAllPoints().subscribe((result: PointsStack) => {
      this.points = result;
    })

    this.map = document.querySelector('#map-area');
    this.map.addEventListener('mousemove', (event: MouseEvent) => {
      this.config.cursor.x = event.offsetX;
      this.config.cursor.y = event.offsetY;
    })
  }

  addStreetMode(object: string, mode: string) {
    this.setActiveMode(object, mode);
    this.cleanCanvas();
    this.cleanListeners();
    this.addListener('click', this.addPointToStreet);
  }

  removeStreetMode(object: string, mode: string) {
    this.setActiveMode(object, mode);
    this.cleanCanvas();
    this.cleanListeners();
  }

  updateStreetMode(object: string, mode: string) {
    this.setActiveMode(object, mode);
    this.cleanCanvas();
    this.cleanListeners();
  }

  addEntertainmentMode(object: string, mode: string) {
    this.setActiveMode(object, mode);
    this.cleanCanvas();
    this.cleanListeners();
    this.addListener('click', this.addEntertainmentLocation);
  }

  removeEntertainmentMode(object: string, mode: string) {
    this.setActiveMode(object, mode);
    this.cleanCanvas();
    this.cleanListeners();
  }

  updateEntertainmentMode(object: string, mode: string) {
    this.setActiveMode(object, mode);
    this.cleanCanvas();
    this.cleanListeners();
  }

  addPointToStreet = (event: MouseEvent) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const newPoint: Coordinates = this.nearestPoint(x, y);
    this.mapService.addPoints([newPoint], [newPoint]);

    this.canvasContex.strokeStyle = MapConfig.streets.newStreetColor;
    this.canvasContex.lineWidth = MapConfig.streets.width;
    this.canvasContex.lineTo(newPoint.longitude, newPoint.latitude);
    this.canvasContex.stroke();
  }

  addEntertainmentLocation = (event: MouseEvent) => {
    this.cleanCanvas();

    const x = event.offsetX;
    const y = event.offsetY;
    const newPoint: Coordinates = {
      longitude: x,
      latitude: y,
    };
    this.mapService.addPoints([], [newPoint]);

    this.canvasContex.strokeStyle = MapConfig.entertainment.newEntertainmentColor;
    this.canvasContex.lineWidth = MapConfig.entertainment.size;
    this.canvasContex.lineTo(newPoint.longitude - MapConfig.entertainment.size/2, newPoint.latitude);
    this.canvasContex.lineTo(newPoint.longitude + MapConfig.entertainment.size/2, newPoint.latitude);
    this.canvasContex.stroke();
  }

  nearestPoint(longitude: number, latitude: number): Coordinates {
    var distances: number[] = []
    var newPoint: Coordinates = {longitude, latitude};

    this.points.allPoints.forEach(point => {
      distances.push(this.getDistance(point, newPoint));
    });

    var minDistance = Math.min.apply(null, distances);

    if(minDistance < MapConfig.streets.connectAreaRadius) {
      var nearestPoint = this.points.allPoints[distances.indexOf(minDistance)];
      return nearestPoint;
    }
    else {
      return {longitude: longitude, latitude: latitude};
    }
  }

  getDistance(firstPoint: Coordinates, secondPoint: Coordinates): number {
      var distance = Math.sqrt(Math.pow(firstPoint.longitude-secondPoint.longitude, 2)
        + Math.pow(firstPoint.latitude-secondPoint.latitude, 2));
      return distance;
  }

  cleanCanvas() {
    this.canvasContex.closePath();
    this.canvasContex.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContex.beginPath();
    this.mapService.removeCurrentPoints();
  }

  setActiveMode(object: string, mode: string) {
    this.mapService.removeCurrentStreet();
    this.isSucceeded = false;
    this.config.currentAction = {
      object: object,
      mode: mode
    }
  }

  addListener(type: string, func: (event: Event) => void) {
    this.map.addEventListener(type, func);
    this.activeListeners.push({type: type, func: func});
  }

  cleanListeners(){
    this.activeListeners.forEach(listener => {
      this.map.removeEventListener(listener.type, listener.func);
    });
  }
}

