import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
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

@ViewChild('myChart') chartRef: ElementRef<HTMLCanvasElement>;
  chart: Chart<"pie", string[], string>;

constructor (private http: HttpClient, private elementRef: ElementRef,) { }

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

    createChart(){
      let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
      this.chart = new Chart(htmlRef, {
        type: 'pie',

        data: this.dataSource,
        options: {
          aspectRatio:2.5
        }

      });

    }
}
