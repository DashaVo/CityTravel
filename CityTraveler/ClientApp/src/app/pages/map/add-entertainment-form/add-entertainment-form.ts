import { IImageDTO } from './../../../models/image.dto';
import { StreetModel } from './../../../models/map/street.model';
import { EntertainmentService } from './../../../services/entertainmentService';
import { IEntertainmentDTO } from './../../../models/entertainment.dto';
import { Coordinates } from './../../../models/map/coordinates.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CityArchitectureService } from './../../../services/city.architecture.service';
import { MapService } from './../../../services/map.service';
import { PointsStack } from './../../../models/map/points.stack';

@Component({
  selector: 'add-entertainment-form',
  templateUrl: './add-entertainment-form.html',
  styleUrls: ['./../../../pages/map/form-styles.scss']
})
export class AddEntertainmentForm implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityArchitectureService,
    private mapService: MapService,
    private entertainmentService: EntertainmentService) { }

  public minPhotoCount: number = 1;
  public maxPhotoCount: number = 7;
  public addEntertainmentForm: FormGroup;
  public point: Coordinates;
  public types: string[];
  public currentType: number;
  public currentStreetId: string;
  public isPhotoValid: boolean = false;
  public images: IImageDTO[] = []
  public files: {
    src: string,
    file: File
  }[] = [];
  public streets: {
    id: string,
    title: string,
  }[] = [];

  @Output() submitAddEntertainmentEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() cleanCanvasEmitter: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    this.validationForm();
    this.getTypes();
    this.getStreets();

    this.mapService.getAllPoints().subscribe((result: PointsStack) => {
      this.point = result.currentPoints[0];
    })

    this.mapService.getCurrentStreetId().subscribe((result: string) => {
      this.currentStreetId = result;
    })
  }

  setCurrentStreetId(streetId: string) {
    this.mapService.setCurrentStreetId(streetId);
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
    streets.forEach((street: StreetModel) => {
      var newStreet = {
        id: street.id,
        title: street.title
      }
      this.streets.push(newStreet);
    });
  }

  getTypes() {
    this.entertainmentService.getTypes()
    .then((res: string[]) => {
      res.pop();
      this.types = res;
    });
  }

  validationForm(){
    this.addEntertainmentForm = this.formBuilder.group({
      "title":['', Validators.required],
      "description":[''],
      "priceTitle":['', Validators.required],
      "priceValue":['', Validators.required],
      "houseNumber":['', Validators.required],
      "apartmentNumber":['', Validators.required],
      "eventBegin":[''],
      "eventEnd":[''],
    })
  }

  compareType(type: string): boolean {
    if(this.types && this.currentType - 1 == this.types.indexOf(type)) {
      return true;
    }
    return false;
  }

  submitAddEntertainment(form: NgForm) {
    if(form.valid) {
    var entertainmetDTO: IEntertainmentDTO = {
      title: form.value.title,
      description: form.value.description,
      type: this.currentType,
      averagePrice: {
        title: form.value.priceTitle,
        value: form.value.priceValue,
      },
      images: this.images,
      address: {
        coordinates: this.point,
        streetId: this.currentStreetId,
        houseNumber: form.value.houseNumber,
        apartmentNumber: form.value.apartmentNumber,
      },
      begin: form.value.eventBegin,
      end: form.value.eventEnd,
    }

    this.cityService.addEntertainment(entertainmetDTO)
    .then((res: boolean) => {
      if(res) {
        form.reset();
        this.cleanCanvas();
      }
      this.submitAddEntertainmentEmitter.emit(res);
    });
    }
  }

  loadImages(imageInput: any) {
    const indexes = Object.keys(imageInput.files);

    indexes.forEach((index) => {
      const file = imageInput.files[index];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('load', (event: any) => {
        var loadedFile = {src: event.currentTarget.result, file: file};

        if (!this.files.find(x => x.src === loadedFile.src) && this.files.length < this.minPhotoCount + 1) {
          this.files.push(loadedFile);

          var isMain: boolean;
          this.files.length == 1
          ? isMain = true
          : isMain = false;

          const value: IImageDTO = {isMain: isMain, source: loadedFile.src, title: '', description: ''};
          this.images.push(value);
        }

        this.isPhotoValid = this.files.length < this.maxPhotoCount && this.files.length > this.minPhotoCount;
      });
    });
  }

  cleanCanvas(){
    this.cleanCanvasEmitter.emit();
  }
}
