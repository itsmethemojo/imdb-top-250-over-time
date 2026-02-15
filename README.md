# whats that

a simple web application, that visualizes the spread of the top 250 movies from imdb over the time scale

# motivation
to prove https://github.com/nufuk wrong that there are no good movies anymore :)

# preview

see the [https://itsmethemojo.github.io/imdb-top-250-over-time/](https://itsmethemojo.github.io/imdb-top-250-over-time/) for visualization

# static data

since those ratings are pretty stable it does make no sense for now to fetch them everytime

i used [https://imdbapi.dev/](https://imdbapi.dev/) to retreived the data and choose only movies with more then 100000 votes

see [scripts\download-data.sh](scripts\download-data.sh) how the data was fetched

# test locally

`docker run --rm --name nginx-demo -p8080:80 -v $(pwd):/usr/share/nginx/html nginx`

# TODOs

* do not store static javascript libs in this repo, fetch as build process