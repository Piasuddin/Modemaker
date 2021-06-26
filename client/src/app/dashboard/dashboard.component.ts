import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notices: Notices[] = [];
  activities: Activities[] = [];
  incomeHighcharts: typeof Highcharts = Highcharts;
  incomePieHighcharts: typeof Highcharts = Highcharts;
  expenseHighcharts: typeof Highcharts = Highcharts;
  expensePieHighcharts: typeof Highcharts = Highcharts;
  incomeChartOptions: any;
  incomePieChartOption: any;
  expenseChartOptions: any;
  expensePieChartOption: any;
  constructor() { }

  ngOnInit(): void {
    this.notices = [
      { sl: 1, name: "Study Tour", description: "We decide to go to a Study tour next Sunday on 12/01/2019. The head of this institute", day: 12, month: "Jan", dayCount: "1 year ago" },
      { sl: 2, name: "Exam Notice", description: "Our second term exam will be held on (08/04/2019). This exam is taken by the decision", day: 8, month: "Apr", dayCount: "9 month ago"  },
      { sl: 3, name: "Holiday Notice", description: "Today (21/09/2019) is internal holiday. This holiday is declare by the goverment", day: 21, month: "Sep", dayCount: "5 year ago" }
    ];
    this.activities = [
      { sl: 1, name: "Approve Applicant", description: "You approved Md Rasel's applicantion", dayCount: "4 min ago", color: "#FF8A65"  },
      { sl: 2, name: "Collect Fee", description: "You collect fee form Md Rasel as Application fee", dayCount: "5 min ago", color: "#9A7BCF"  },
      { sl: 3, name: "Add Applicant", description: "You add Md Rasel as an Applicant", dayCount: "5 min ago", color: "#F16695"  },
      { sl: 4, name: "Add Dining Expense", description: "You have added dining expense of TK 4000.00", dayCount: "14 days ago", color: "#66828F"  },
      { sl: 5, name: "Approve Voucher", description: "You approved Rasel Korim's voucher", dayCount: "25 days ago", color: "#6AA2FA"  },
      { sl: 6, name: "Internal Transfer", description: "You sent taka 500.00 to korim as internal transfer", dayCount: "1 month ago",color: "#51B8AE"  },
      { sl: 7, name: "External Transfer", description: "You sent taka 900.00 to korim as external transfer", dayCount: "1 month ago",color: "#9A7BCF"  }
    ]
    this.incomeChartOptions = {
      title: {
        text: 'Total Income from 2010 to 2020'
      },

      subtitle: {
        text: null
      },

      yAxis: {
        title: {
          text: 'Amount'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },

      series: [{
        name: 'Collection 1',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
        name: 'Collection 2',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }, {
        name: 'Collection 3',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Collection 4',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
    this.incomePieChartOption = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Total income from 2010 to 2020'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Share',
        data: [
          { name: 'Collection 1', y: 61.41 },
          { name: 'Collection 2', y: 11.84 },
          { name: 'Collection 3', y: 10.85 },
          { name: 'Collection 4', y: 4.67 },
          { name: 'Other', y: 7.05 }
        ]
      }]
    }
    this.expenseChartOptions = {
      title: {
        text: 'Total Expense from 2010 to 2020'
      },

      subtitle: {
        text: null
      },

      yAxis: {
        title: {
          text: 'Amount'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },

      series: [{
        name: 'Voucher',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
        name: 'Donation',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: 'Transfer 1',
        data: [31744, 27722, 16005, 19771, 20185, 44377, 32147, 19387]
      },
      {
        name: 'Transfer 2',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Transfer 3',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
    this.expensePieChartOption = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Total income from 2010 to 2020'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Share',
        data: [
          { name: 'Voucher', y: 61.41 },
          { name: 'Donation', y: 11.84 },
          { name: 'Transfer 1', y: 10.85 },
          { name: 'Transfer 2', y: 10.85 },
          { name: 'Transfer 3', y: 4.67 },
          { name: 'Other', y: 7.05 }
        ]
      }]
    }
  }

}
export class Notices {
  sl: number;
  name: string;
  description: string;
  day: number;
  month: string;
  dayCount: string;
}
export class Activities {
  sl: number;
  name: string;
  description: string;
  dayCount: string;
  color: string;
}
