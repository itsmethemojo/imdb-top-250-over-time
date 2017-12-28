var express = require('express');

var app = express();

app.use('/static', express.static(__dirname + '/static'));

app.get('/imdb-top-250-data', function(req, res) {
  'use strict';

  var cheerio = require('cheerio');

  var curl = require('curl');

  var jsonData = [];

  curl.get(
    'http://www.imdb.com/chart/top?sort=us,desc&mode=simple&page=1',
    [],
    function(err, response, body) {
      var $ = cheerio.load(body);
      $('tbody.lister-list tr').each(function() {
        var rating = $(this).find('td.ratingColumn.imdbRating strong').html();
        var title = $(this).find('td.titleColumn a').html();
        var link = $(this).find('td.posterColumn a').attr('href');
        var year = $(this).find('td span.secondaryInfo').html();
        year = year.replace('(', '').replace(')', '');

        jsonData.push({
          'title': title,
          'link': link,
          'rating': rating,
          'year': year
        });
      });
      res.send(JSON.stringify(jsonData));
    });
});

app.listen(8080);
