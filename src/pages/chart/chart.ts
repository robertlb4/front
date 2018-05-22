import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'
import * as ChartLabels from 'chartjs-plugin-datalabels';

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  x: number = 0;
  data1: number = 3300 + this.x;
  data2: any = 2055;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    Chart.pluginService.register(ChartLabels);
  }
  public barChartOptions:any = {
    plugins: {
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'end',
        font: {
          weight: 'bold',
          size: 25,
        }
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      onClick: (e) => e.stopPropagation()
    },
    scales: {
      yAxes: [{
        id: 'U.S. Dollars',
          type: 'linear',
          position: 'left',
          ticks: {
            max: 5000,
            min: 0,
            stepSize: 500
          },
          gridLines: {
            display: false
          }
        }, {
        id: 'Years',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 2060,
            min: 2020,
            stepSize: 5
          },
          gridLines: {
            display: false
          }
        }]
    }
  };  

  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public barChartData:any[] = [
    {data: [this.data1], label: 'Monthly Benefit Amt.', datlabels: {display:true,align:'end',anchor:'end'}},
    {data: [this.data2], label: 'Break-Even Year'},
    
  ];

  public randomize():void {
    console.log()
    this.x += 50;
    let _barChartData:Array<any> = new Array(this.barChartData.length);
    for (let i = 0; i < this.barChartData.length; i++) {
      _barChartData[i] = {data: new Array(this.barChartData[i].data.length), label: this.barChartData[i].label};
      for (let j = 0; j < this.barChartData[0].data.length; j++) {
        _barChartData[i].data[j] = this.x;
      }
    }
    this.barChartData = _barChartData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

}
