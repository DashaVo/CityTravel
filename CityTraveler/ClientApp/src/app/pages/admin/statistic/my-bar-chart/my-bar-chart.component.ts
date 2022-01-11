import { IStatistic } from './../../../../models/statistic.model';
import { Component, Input, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.scss']
})
export class MyBarChartComponent implements OnInit{
 @Input() pie: IStatistic[]
 view: any[] = [500,300];
  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  maxLabelLength: number =13
  legendPosition: string = 'right';
  title: string = 'Entertaiment'

  colorScheme = {
    domain: ['#603F8B', '#A16AE8', '#FD49A0']
  };

  constructor() {
    Object.assign(this,this.pie);
  }
  ngOnInit(): void {


  }


}
