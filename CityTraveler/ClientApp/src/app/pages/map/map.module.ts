import { RemoveStreetForm } from './remove-street-form/remove-street-form';
import { MapEditComponent } from './mapEdit.component/mapEdit.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { AddStreetForm } from './add-street-form/add-street-form';
import { AddEntertainmentForm } from './add-entertainment-form/add-entertainment-form';



@NgModule({
  declarations: [
    MapEditComponent,
    MapComponent,
    AddStreetForm,
    AddEntertainmentForm,
    RemoveStreetForm,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot([
      {path: 'map-edit', component: MapEditComponent, pathMatch: 'full'},
      {path: 'map', component: MapComponent, pathMatch: 'full'},
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ReactiveFormsModule,
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
