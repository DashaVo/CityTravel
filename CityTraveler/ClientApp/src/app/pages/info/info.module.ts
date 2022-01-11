import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {InfoDataService} from '../../services/InfoService.data';
import {InfoService} from '../../services/InfoService';
import {InfoComponent} from './info.component';
import {PopularEntertainmentComponent} from './components/popularEntertainment/popularEntertainment.component';
import {PopularTripComponent} from './components/popularTrip/popularTrip.component';

@NgModule({
  declarations: [
    InfoComponent,
    PopularEntertainmentComponent,
    PopularTripComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    FormsModule,
    RouterModule.forRoot([
      {path: 'info', component: InfoComponent, pathMatch: 'full'},
    ])
  ],
  providers: [
    InfoDataService,
    InfoService
  ],
  bootstrap: [InfoComponent
  ]
})
export  class InfoModule {}
