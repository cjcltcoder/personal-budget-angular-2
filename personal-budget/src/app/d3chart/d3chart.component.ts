import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

interface ChartData {
  data: number[];
  labels: string[];
}

@Component({
  selector: 'pb-d3chart',
  templateUrl: './d3chart.component.html',
  styleUrl: './d3chart.component.scss'
})
export class D3chartComponent implements OnInit {
  chartData: ChartData;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.http.get<ChartData>('http://localhost:3000/chart')
      .subscribe(data => {
        this.chartData = data;
        this.renderChart();
      });
  }

  renderChart(): void {
    if (!this.chartData || !this.chartData.labels || this.chartData.labels.length === 0) {
      console.error('Invalid data for rendering the chart.');
      return;
    }

    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal<string>()
      .domain(this.chartData.labels)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    const pie = d3.pie<number>()
      .sort(null)
      .value((d: any) => d);

    const arc = d3.arc<any, d3.DefaultArcObject>()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3.arc<any, d3.DefaultArcObject>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const svg = d3.select('#d3PieChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arcs = svg.selectAll('.arc')
      .data(pie(this.chartData.data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', (d: any) => arc(d))
      .attr('fill', (d: any, i: number) => color(this.chartData.labels[i] || ''));

    const labelArc = d3.arc<any, d3.DefaultArcObject>()
      .outerRadius(radius * 1.0) // Adjust the outer radius to move labels further outside
      .innerRadius(radius * 0.9); // Set the same inner radius as the outer radius to prevent labels from being hidden

    arcs.append('text')
      .attr('transform', (d: any) => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text((d: any, i: number) => this.chartData.labels[i]);

    arcs.append('polyline')
      .attr('points', (d: any) => {
        const pos = outerArc.centroid(d);
        return [arc.centroid(d), outerArc.centroid(d), pos].join(' ');
      })
      .style('fill', 'none')
      .style('stroke', '#666')
      .style('stroke-width', '1px');
  }
}
