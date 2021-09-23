import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexLegend,
  ApexFill,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-radial-bar',
  templateUrl: './radial-bar.component.html',
  styleUrls: ['./radial-bar.component.scss'],
})
export class RadialBarComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() rate: number;
  @Input() title: string;

  constructor() {}
  ngOnInit(): void {
    this.chartOptions = {
      series: [this.rate],
      chart: {
        height: 140,
        width: 140,
        foreColor: '#c74545',
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          track: {
            background: '#e0e0e0',
          },

          dataLabels: {
            show: true,

            name: {
              show: false,
            },

            value: {
              fontSize: '20px',
              fontWeight: 500,
            },
          },
        },
      },
    };
  }
}
