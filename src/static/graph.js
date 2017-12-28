var runner = function() {

  'use strict';

  $.getJSON('/imdb-top-250-data', function(data) {
    var lowestYear = 40000;
    var highestYear = 0;
    $.each(data, function(key, val) {
      if (val.year > highestYear) {
        highestYear = val.year;
      }
      if (val.year < lowestYear) {
        lowestYear = val.year;
      }
    });

    var years = {};
    var yearDetails = {};

    console.log(years.length);
    for (var i = lowestYear; i <= highestYear; i++) {
      years[i] = 0;
      yearDetails[i] = "";

    }

    $.each(data, function(key, val) {
      years[val.year] = years[val.year] + 1;
      yearDetails[val.year] = yearDetails[val.year]
                              + '<p><a href="http://www.imdb.com'
                              + val.link
                              + '">('
                              + val.rating
                              + ')'
                              + val.title
                              + '</a></p>'
    });

    var formattedYears = [];
    $.each(years, function(key, val) {
      formattedYears.push(val);
    });

    Highcharts.chart('container', {
      chart: {
          type: 'line'

        },

      title: {
          text: 'Movies per year from the IMDB Top 250'
        },

      yAxis: {
          title: {
              text: 'Number of Top Movies'
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
              pointStart: lowestYear * 1,
              turboThreshold: 1000
            }
        },
      series: [{
          name: 'Movies',
          data: formattedYears,
          allowPointSelect: true,
          point: {
                        events: {
                            select: function(e) {
                              $('#details').html(yearDetails[e.target.x]);
                              console.log(e.target.x);
                            }
                          }
                      }
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

    });
  });
};

runner();
