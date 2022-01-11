import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularUserEntrComponent} from './components/popularUserEntr/popularUserEntr.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-info', pathMatch: 'full' },
  { path: 'user/entr/:userId', component: PopularUserEntrComponent },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserProfileRoutingModule {}
