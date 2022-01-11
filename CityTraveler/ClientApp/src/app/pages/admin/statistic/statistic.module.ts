import { StatisticService } from '../../../services/statistic.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon'
import { StatisticComponent } from './statistic.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
  declarations: [
    MyBarChartComponent,
    LineChartComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    NgxChartsModule,

  ],
  providers:
  [ StatisticService],
  exports:[
    MyBarChartComponent,
    LineChartComponent,
    ActivityComponent
  ],
  bootstrap: [StatisticComponent]
})
export class StatisticModule{ }
