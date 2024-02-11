import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { DataService } from '../data.service'; // Import the DataService
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

interface BudgetData {
  myBudget: { title: string; budget: number }[];
}

@Component({
  selector: 'pb-d3chart',
  templateUrl: './d3chart.component.html',
  styleUrls: ['./d3chart.component.scss']
})
export class D3chartComponent implements OnInit {
  budgetData: BudgetData;

  constructor(
    private dataService: DataService, // Inject the DataService
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.fetchBudgetData();
  }

  fetchBudgetData(): void {
    this.dataService.fetchBudgetData() // Call the method from DataService to fetch data
      .subscribe(data => {
        this.budgetData = data;
        if (isPlatformBrowser(this.platformId)) {
          this.renderChart(); // Only render the chart if running in the browser environment
        }
      });
  }

  renderChart(): void {
    if (!this.budgetData || !this.budgetData.myBudget || this.budgetData.myBudget.length === 0) {
      console.error('Invalid data for rendering the chart.');
      return;
    }

    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal<string>()
      .domain(this.budgetData.myBudget.map(item => item.title))
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
      .data(pie(this.budgetData.myBudget.map(item => item.budget)))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', (d: any) => arc(d))
      .attr('fill', (d: any, i: number) => color(this.budgetData.myBudget[i].title));

    const labelArc = d3.arc<any, d3.DefaultArcObject>()
      .outerRadius(radius * 1.0)
      .innerRadius(radius * 0.9);

    arcs.append('text')
      .attr('transform', (d: any) => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text((d: any, i: number) => this.budgetData.myBudget[i].title);

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
