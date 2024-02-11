import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from '../data.service';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  public dataSource: ChartConfiguration['data'] = {
    datasets: [{
      data: [],
      backgroundColor: [
        '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#fd6b19',
      ]
    }],
    labels: []
  };

  constructor(
    private dataService: DataService, // Inject the DataService Component
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    this.fetchData(); // Call the method to fetch data
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    }, 1000);
  }

  fetchData(): void {
    this.dataService.fetchBudgetData() // Call the method from DataService to fetch data
      .subscribe((res: any) => {
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data.push(res.myBudget[i].budget);
          this.dataSource.labels.push(res.myBudget[i].title);
        }
      });
  }

  createChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = <HTMLCanvasElement>document.getElementById('myChart');
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource,
      });
    }
  }
}
