import { CityArchitectureService } from 'src/app/services/city.architecture.service';
import { EntertainmentExportModule } from '../../commonModules/entertainment-export.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { EntertainmentShowComponent } from './EntertainmentShow/entertainment.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EntertainmentService } from 'src/app/services/entertainmentService';
import { FindArea } from './FindArea/findArea.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    EntertainmentShowComponent,
    FindArea,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    EntertainmentExportModule,
    RouterModule.forRoot([
      { path: 'entertainment', component: FindArea, pathMatch: 'full' },
      { path: 'entertainment-profile/:id', component: EntertainmentShowComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    EntertainmentService,
    CityArchitectureService,
  ],
  bootstrap: [
    EntertainmentShowComponent,
    FindArea,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class EntertainmentModule { }
