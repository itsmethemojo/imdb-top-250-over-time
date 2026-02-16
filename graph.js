var runner = function() {

  'use strict';

  $.getJSON('data/top-250-movies.json', function(data) {
    var lowestYear = 40000;
    var highestYear = 0;
    
    $.each(data, function(key, val) {
      if (val.startYear > highestYear) {
        highestYear = val.startYear;
      }
      if (val.startYear < lowestYear) {
        lowestYear = val.startYear;
      }
    });

    var years = {};
    var yearDetails = {};

    for (var i = lowestYear; i <= highestYear; i++) {
      years[i] = 0;
      yearDetails[i] = "";

    }

    $.each(data, function(key, val) {
      years[val.startYear] = years[val.startYear] + 1;
      yearDetails[val.startYear] = yearDetails[val.startYear]
                              + '<p><a target="blank" href="http://www.imdb.com/de/title/'
                              + val.id
                              + '/">('
                              + val.rating.aggregateRating
                              + ') '
                              + val.primaryTitle
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
          text: 'Movies per year from the IMDB Top 250<br/><href="https://github.com/itsmethemojo/imdb-top-250-over-time">[see on Github]</a>'
        },

      yAxis: {
          title: {
              text: 'Number of Top 250 Movies per Year'
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
