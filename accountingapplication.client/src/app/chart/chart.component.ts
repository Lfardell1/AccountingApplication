import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  cashFlowChart: any;
  financeChart: any;

  constructor() { }

  ngOnInit() {
    this.generateCharts();
  }

  generateCharts() {
    this.cashFlowChart = new Chart('cashFlowChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Cash Flow',
          data: [1000, 1200, 900, 1100, 950, 1050, 1300, 1400, 1000, 1150, 1250, 1350],
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.financeChart = new Chart('financeChart', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Income',
            data: [5000, 6000, 5500, 7000, 6500, 8000],
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Expenses',
            data: [3000, 4000, 3500, 4200, 3800, 4500],
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Cash Flow',
            data: [2000, 2000, 2000, 2800, 2700, 3500],
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
