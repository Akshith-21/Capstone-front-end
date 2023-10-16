import { CurrencyPipe } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexOptions, ApexResponsive } from 'ng-apexcharts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @Input()
  chartData: any[] = [];
  chartColors: any[]= ["#234d20", "#36802d", "#77ab59"];
  title = 'Holdings';

  // @Input()
  chartLabels: string[] = ["Stock", "Govt", "CD"];

  dollarFormatter = function(value: any) {
    return '$' + (Math.round(value * 100) / 100).toString();
  }

  dollarFormatterTotal = function(value: any) {
    let result = value.globals.seriesTotals.reduce((a:number, b:number) => a + b, 0)
    return '$' + (Math.round(result * 100) / 100).toString()
  }

  ngOnInit(){}
}
