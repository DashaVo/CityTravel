import { IEntertainmentMap } from './../models/map/entertainment.map.model';
import { StreetModel } from 'src/app/models/map/street.model';
import { StorageService } from './generalServices/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates } from './../models/map/coordinates.model';
import { Injectable } from '@angular/core';
import { ApiService } from './generalServices/api.service';
import { PointsStack } from '../models/map/points.stack';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private dataService: ApiService, private storageService: StorageService) { }

  /// What does it have:
  /// - Entertainment redrawing
  /// - Get Entertainment
  /// - Streets redrawing
  /// - Current points
  /// - Current street
  /// - Get streets

  //ENTERTAINMENTS REDRAWING

  private isNeededToLoadEntertainments: boolean = false;
  private isNeededToRedrawEntertainments: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public getRedrawingEntertainments(): Observable<boolean> {
    return this.isNeededToRedrawEntertainments;
  }

  public setRedrawingEntertainments() {
    this.isNeededToLoadEntertainments = true;
    this.isNeededToRedrawEntertainments.next(true);
  }

  //GET ENTERTAINMENT

  private entertainmentsToInit: BehaviorSubject<IEntertainmentMap[]> = new BehaviorSubject(null);

  getEntertainmentsToInit(): Observable<IEntertainmentMap[]>{
    return this.entertainmentsToInit;
  }

  public getEntertainmentsCount(): Promise<number> {
    return this.dataService.get('/api/map/entertainments-count');
  }

  public getEntertainmentsFromServer(skip: number, take: number): Promise<IEntertainmentMap[]> {
    return new Promise((resolve, reject) => {
      try {
        this.dataService.get(`/api/map/entertainments?skip=${skip}&take=${take}`)
        .then((entertainments: IEntertainmentMap[]) => {
          resolve(entertainments);
        });
      }
      catch {
        reject([]);
      }
    })
  }

  public loadEntertainmentsFromStorage(take: number) {
    const entertainmentsJson = this.storageService.get('entertainments', 'session');
    var entertainmentsArray: IEntertainmentMap[] = JSON.parse(entertainmentsJson);

    if(!entertainmentsArray || this.isNeededToLoadEntertainments) {
      this.getEntertainmentsCount()
        .then((count) => {
          const iterationCount = Math.ceil(count / take);
          this.storageService.set('entertainments', [], 'session');

          for (let i = 0; i < iterationCount; i++) {
            const skip = i * take;
            this.getEntertainmentsFromServer(skip, take).then((entertainments: IEntertainmentMap[]) => {
              if(entertainments) {
                this.entertainmentsToInit.next(entertainments);
                this.storageService.push('entertainments', entertainments, 'session');
              }
            });
          }
          this.isNeededToLoadEntertainments = false;
        })
    }
    else {
      this.entertainmentsToInit.next(entertainmentsArray);
    }
  }

  // STREETS REDRAWING

  private isNeededToLoadStreets: boolean = false;
  private isNeededToRedrawStreets: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public getRedrawingStreets(): Observable<boolean> {
    return this.isNeededToRedrawStreets;
  }

  public setRedrawingStreets() {
    this.isNeededToLoadStreets = true;
    this.isNeededToRedrawStreets.next(true);
  }

  //CURRENT POINTS

  private points: BehaviorSubject<PointsStack> = new BehaviorSubject({
    currentPoints: [],
    streetPoints: [],
    allPoints: [],
  });

  public getAllPoints(): Observable<PointsStack> {
    return this.points;
  }

  public addPoints(allStreetsPoints: Coordinates[] = [], currentPoints: Coordinates[] = [],) {
    var newAllPoints = this.points.value.allPoints.concat(allStreetsPoints);
    var newCurrentPoints = this.points.value.currentPoints.concat(currentPoints);
    this.points.next({
      currentPoints: newCurrentPoints,
      streetPoints: this.points.value.streetPoints,
      allPoints: newAllPoints,
    });
  }

  public removeCurrentPoints() {
    this.points.next({
      currentPoints: [],
      streetPoints: this.points.value.streetPoints,
      allPoints: this.points.value.streetPoints,
    });
  }

  //CURRENT STREET

  private currentStreetId = new BehaviorSubject(null);

  public setCurrentStreetId(streetId: string) {
    this.currentStreetId.next(streetId);
  }

  public getCurrentStreetId(): Observable<string> {
    return this.currentStreetId;
  }

  public removeCurrentStreet() {
    this.currentStreetId.next(null);
  }

  //GET STREETS

  public getStreetsFromServer(): Promise<StreetModel[]> {
    return new Promise((resolve, reject) => {
      try {
        this.dataService.get('/api/map/streets')
        .then((streets: StreetModel[]) => {
          this.storageService.set('streets', streets, 'session');
          this.isNeededToLoadStreets = false;
          resolve(streets);
        });
      }
      catch {
        reject([]);
      }
    })
  }

  public getStreetsFromStorage(): Promise<StreetModel[]> {
    const streetsJson = this.storageService.get('streets', 'session');
    var streetsArray: StreetModel[] = JSON.parse(streetsJson);

    if(!streetsArray || this.isNeededToLoadStreets) {
      return new Promise<StreetModel[]>((resolve) => {
        this.getStreetsFromServer().then((streets: StreetModel[]) => {
          if(streets) {
            resolve(streets);
          }
        });
      });
    }
    else {
      return new Promise<StreetModel[]>((resolve) => resolve(streetsArray));
    }
  }

  public getStreetById(streetId: string): Promise<StreetModel> {
    var streetsJson = this.storageService.get('streets', 'session');

    streetsJson = null;

    if(streetsJson) {
      const streetArray: StreetModel[] = JSON.parse(streetsJson);
      return new Promise((resolve) => resolve(streetArray.find(x => x.id === streetId)));
    }
    else {
      return new Promise((resolve, reject) => {
        try {
          this.dataService.get(`/api/map/street?id=${streetId}`)
          .then((res: StreetModel) => {
            resolve(res);
          });
        }
        catch {
          reject(null);
        }
      });
    }
  }
}
