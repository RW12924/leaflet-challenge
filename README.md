# leaflet-challenge

The purpose of this code is to make an API call to retrieve earthquake data from the USGS GeoJSON website
and use the retrieved data to generate a map which visualizes earthquakes around the world.  

Each earthquake on the map is represented by a circle.  These circles scale in size based on the magnitude
of each earthquake.  The color of each circle is determined by the depth at which the earthquake begins
to rupture.  Exact measurements of each earthquake are included in popup messages which can be viewed by
clicking on a circle.