import { IStatistic } from './../../../models/statistic.model';
import { StatisticService } from 'src/app/services/statistic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  constructor(private service: StatisticService) { }

  charts: any;
  acivity: any;

  async ngOnInit() {
    await this.getStatisticPie();
    await this.getStatisticAcivity();
  }
  async getStatisticPie(){
    this.charts  = await this.service.GetStatisticCharts();
  }
  async getStatisticAcivity(){
    this.acivity  = await this.service.GetStatisticActivity();
    console.log(this.acivity);
  }


}
