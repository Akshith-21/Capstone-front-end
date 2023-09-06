import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  constructor(private route: ActivatedRoute){}
  email: string = '';
  display: boolean = false;
  mockReportDataPL: any[] = [
    {
      instrumentName: 'Google',
      direction: 'BUY',
      quantity: 10,
      bidPrice: 120,
      askPrice: 140,
      profitLoss: 200
    },
    {
      instrumentName: 'Apple',
      direction: 'BUY',
      quantity: 10,
      bidPrice: 120,
      askPrice: 140,
      profitLoss: 200
    },
    {
      instrumentName: 'Microsoft',
      direction: 'BUY',
      quantity: 10,
      bidPrice: 120,
      askPrice: 140,
      profitLoss: 200
    }
  ]
  ngOnInit() {
    let e = this.route.snapshot.paramMap.get('email');
    this.email = e?e:'test@test.com';
  }


}
