import { PointsStack } from '../../../models/map/points.stack';
import { MapService } from '../../../services/map.service';
import { CityArchitectureService } from '../../../services/city.architecture.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StreetDTOModel } from 'src/app/models/map/street.dto.model';

@Component({
  selector: 'add-street-form',
  templateUrl: './add-street-form.html',
  styleUrls: ['./../../../pages/map/form-styles.scss']
})
export class AddStreetForm implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityArchitectureService,
    private mapService: MapService) { }

  public addStreetForm: FormGroup;

  @Input() points: PointsStack;
  @Output() submitAddStreetEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() cleanCanvasEmitter: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    this.mapService.getAllPoints().subscribe((result: PointsStack) => {
      this.points = result;
    })

    this.addStreetForm = this.formBuilder.group({
      "title":['', Validators.required],
      "description":['']
    })
  }

  submitAddStreet(form: NgForm) {
    if(form.valid) {
    var streetDTO: StreetDTOModel = {
      title: form.value.title,
      description: form.value.description,
      coordinates: this.points.currentPoints,
    }

    this.cityService.addStreet(streetDTO)
      .then((res: boolean) => {
        if(res) {
          form.reset();
          this.cleanCanvas();
          this.mapService.setRedrawingStreets();
        }
        this.submitAddStreetEmitter.emit(res);
      });
    }
  }

  cleanCanvas(){
    this.cleanCanvasEmitter.emit();
  }
}

