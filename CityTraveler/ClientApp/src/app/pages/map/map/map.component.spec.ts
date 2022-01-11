import {} from 'jasmine';
import { ComponentFixture, getTestBed, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

import { MapComponent } from "./map.component";
import { MapService } from "../../../services/map.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StreetModel } from 'src/app/models/map/street.model';


describe('Map component tests', () => {

    let injector: TestBed;
    let fixture: ComponentFixture<MapComponent>;
    let component: MapComponent;


    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

        TestBed.configureTestingModule({
            declarations: [ MapComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
              { provide: MapService, useValue: MapServiceStub }
            ]
        });

        injector = getTestBed();
        fixture = injector.createComponent(MapComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });


    afterEach(() => {
    });

    it('Component should exist', () => {
      expect(component).toBeDefined();
    });

    it('init streets check', async () => {
      await component.initStreets();
      //jasmine.createSpyObj()
      expect(component.streets.length).toEqual(1);
      //expect(component.canvases.length).toEqual(1);
    });
});


const MapServiceStub = {
  getAllStreets(): Promise<StreetModel[]> {
    return Promise.resolve([{
      id: 'superId1',
      title: 'superTitle1',
      description: 'superDescription1',
      coordinates: [],
    }, {
      id: 'superId2',
      title: 'superTitle2',
      description: 'superDescription2',
      coordinates: []
    }]);
  }
}
