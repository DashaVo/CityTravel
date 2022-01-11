import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StreetModel } from './../../../models/map/street.model';
import { CityArchitectureService } from './../../../services/city.architecture.service';
import { MapService } from './../../../services/map.service';

@Component({
  selector: 'remove-street-form',
  templateUrl: './remove-street-form.html',
  styleUrls: ['./../../../pages/map/form-styles.scss']
})
export class RemoveStreetForm implements OnInit {

  constructor(
    private cityService: CityArchitectureService,
    private mapService: MapService) { }

  public currentStreetId: string;
  public streets: {
    id: string,
    title: string,
  }[];

  @Output() submitRemoveStreetEmitter: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.getStreets();

    this.mapService.getCurrentStreetId().subscribe((result: string) => {
      this.currentStreetId = result;
    })
  }

  setCurrentStreetId(streetId: string) {
    this.mapService.setCurrentStreetId(streetId);
  }

  submitRemoveStreet() {
    this.cityService.deleteStreet(this.currentStreetId)
      .then((res: boolean) => {
        if(res) {
          this.mapService.setRedrawingStreets();
          this.getStreets();
          this.submitRemoveStreetEmitter.emit(res);
        }
      });
  }

  getStreets() {
    this.mapService.getStreetsFromStorage()
    .then((streets: StreetModel[]) => {
      if(streets) {
        this.formatStreets(streets);
      }
    });
  }

  formatStreets(streets: StreetModel[]) {
    this.streets = [];
    streets.forEach((street: StreetModel) => {
      var newStreet = {
        id: street.id,
        title: street.title
      }
      this.streets.push(newStreet);
    });
  }
}
