#!/bin/bash

while getopts ":s" opt; do
  case "$opt" in
    s)  
      skip_download="true"
      ;;
  esac
done

nextToken=""

base_url="https://api.imdbapi.dev/titles?types=MOVIE&minVoteCount=100000&sortBy=SORT_BY_USER_RATING&sortOrder=DESC"

rm -rf data
mkdir -p data
echo "[]" > data/top-250-movies.json

if [ "$skip_download" != "true" ]
then
  for i in 1 2 3 4 5
  do
    url=$base_url
    if [ "$nextToken" != "" ]
    then
      url="$url&pageToken=$nextToken"
    fi
    curl -s "$url" > download-$i.json
    nextToken="$(yq .nextPageToken download-$i.json)"
  done
fi

yq '.titles' download-*.json -o json > data/top-250-movies.json.tmp
cat data/top-250-movies.json.tmp | tr -d '\n' | sed 's/\]\[/,/g' > data/top-250-movies.json
rm -rf data/top-250-movies.json.tmp
