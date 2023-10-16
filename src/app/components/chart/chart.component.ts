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

  ngOnInit(){}
}
