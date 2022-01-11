import { Component, Input, OnInit } from '@angular/core';
import { IStatistic } from 'src/app/models/statistic.model';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() reg: IStatistic[]
  view: any[] = [500,300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Quantity of trips';
  barPadding = 20;

  colorScheme = {
    domain: ['#FFF4BD', '#887BB0', '#F4B9B8', '#FF395C' ]
  };

  constructor() {
    Object.assign(this, this.reg)
  }

  onSelect(event) {
    console.log(event);
  }
  ngOnInit() {
  }

}
