import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit, AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [``],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: [``]
};

constructor (private http: HttpClient) { }

ngOnInit(): void {
  this.http.get('http://localhost:3000/budget')
  .subscribe((res: any) => {
    for (var i = 0; i < res.myBudget.length; i++) {
      this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
      this.dataSource.labels[i] = res.myBudget[i].title;
      //this.createChart();
  }
  });
}
ngAfterViewInit(): void {
  setTimeout(() => {
    this.createChart();
  });
}

createChart() {
 // var ctx = document.getElementById('myChart').getContext('2d');
 var ctx = <HTMLCanvasElement>document.getElementById('myChart');
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
  });
}

}
