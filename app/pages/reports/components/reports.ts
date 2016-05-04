import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
@Component({
	selector: 'chart',
	templateUrl: './pages/reports/components/reports.html'
})

export class ReportsCmp {
	constructor(private _router: Router) { }
	ngOnInit() {
        var snowDepth: any = $('#snow-depth');
        snowDepth.highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Follower / Unfollower / Blocked Counts'
            },
            subtitle: {
                text: 'Irregular time data in Highcharts JS'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: 'User count'
                },
                min: 0
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.1f} m'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Unfollower counts',
                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: [
                    [Date.UTC(2016, 4, 1), 1],
                    [Date.UTC(2016, 4, 2), 3],
                    [Date.UTC(2016, 4, 3), 5],
                    [Date.UTC(2016, 4, 4), 9],
                    [Date.UTC(2016, 4, 5), 5],
                    [Date.UTC(2016, 4, 6), 3],
                    [Date.UTC(2016, 4, 7), 6],
                    [Date.UTC(2016, 4, 8), 2],
                    [Date.UTC(2016, 4, 9), 1],
                    [Date.UTC(2016, 4, 10), 0],
                ]
            }, {
                name: 'Follower counts',
                data: [
                    [Date.UTC(2016, 4, 1), 5],
                    [Date.UTC(2016, 4, 2), 8],
                    [Date.UTC(2016, 4, 3), 5],
                    [Date.UTC(2016, 4, 4), 3],
                    [Date.UTC(2016, 4, 5), 1],
                    [Date.UTC(2016, 4, 6), 1],
                    [Date.UTC(2016, 4, 7), 1],
                    [Date.UTC(2016, 4, 8), 4],
                    [Date.UTC(2016, 4, 9), 5],
                    [Date.UTC(2016, 4, 10), 7],
                ]
            }, {
                name: 'Blocked counts',
                data: [
                    [Date.UTC(2016, 4, 1), 3],
                    [Date.UTC(2016, 4, 2), 2],
                    [Date.UTC(2016, 4, 3), 6],
                    [Date.UTC(2016, 4, 4), 8],
                    [Date.UTC(2016, 4, 5), 4],
                    [Date.UTC(2016, 4, 6), 3],
                    [Date.UTC(2016, 4, 7), 2],
                    [Date.UTC(2016, 4, 8), 7],
                    [Date.UTC(2016, 4, 9), 1],
                    [Date.UTC(2016, 4, 10), 7],
                ]
            }]
        });

	}
	gotoDashboard() {
		this._router.navigate(['Home']);
	}
}
