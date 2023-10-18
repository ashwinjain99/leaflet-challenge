# Part 1: Earthquake Visualization with Leaflet
This project visualizes earthquake data provided by the USGS (United States Geological Survey) using the Leaflet JavaScript library. The data is updated every 5 minutes and is available in GeoJSON format.

## Getting the Dataset
Retrieve earthquake data for visualization by selecting the "All Earthquakes from the Past 7 Days" dataset from the [USGS GeoJSON Feed]([url](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)) and utilizing the provided JSON URL.

## Visualizing the Data
To visualize the earthquake data, we use Leaflet to create an interactive map with the following features:

- The map plots all earthquakes based on their longitude and latitude coordinates.
- Data markers represent the magnitude of each earthquake. Higher magnitude earthquakes appear larger.
- The color of the data markers reflects the depth of the earthquake. Deeper earthquakes appear darker in color.
- Popups provide additional information about each earthquake. Clicking on a marker displays the earthquake's details.
- A legend is included to provide context for the map data, indicating the relationship between marker size and earthquake magnitude, as well as the color code for earthquake depth.

## Dependencies
This project relies on the following dependencies:
- Leaflet: A JavaScript library for interactive maps.
- D3.js: A JavaScript library for data visualization.
