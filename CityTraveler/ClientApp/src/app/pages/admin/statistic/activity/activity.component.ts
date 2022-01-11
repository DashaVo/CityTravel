import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent  {
  @Input( ) content : any

  view: any[] = [700, 500];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'date';
  yAxisLabel: string = 'activity';
  timeline: boolean = true;
  title: string = 'activity'

  colorScheme = {
    domain: ['#FFF4BD', '#887BB0', '#F4B9B8']
  };

  constructor() {
    Object.assign(this, this.content);
  }

}
