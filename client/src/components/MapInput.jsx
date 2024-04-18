import React, { useEffect } from "react";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { View } from "ol";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay";
import Geocoder from "ol-geocoder";

const MapComponent = ({ handleLocationSelect }) => {
  useEffect(() => {
    const container = document.getElementById("popup");

    // Create a new overlay for the popup
    const popup = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    // Create the base layer
    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    // Create the view
    const olview = new View({
      center: [0, 0],
      zoom: 2,
    });

    // Create the map instance
    const map = new Map({
      target: null,
      view: olview,
      layers: [baseLayer],
    });

    // Add the map to the DOM
    map.setTarget("map");

    // Add the popup overlay to the map
    map.addOverlay(popup);

    // Instantiate the Geocoder control
    const geocoder = new Geocoder("nominatim", {
      provider: "osm",
      lang: "en",
      placeholder: "Search for ...",
      limit: 5,
      debug: false,
      autoComplete: true,
      keepOpen: true,
    });

    // Add the Geocoder control to the map
    map.addControl(geocoder);

    // Listen for the 'addresschosen' event
    geocoder.on("addresschosen", function (evt) {
      handleLocationSelect(evt);
      window.setTimeout(function () {
        popup.show(evt.coordinate, evt.address.formatted);
      }, 3000);
    });

    // Cleanup function
    return () => {
      map.setTarget(null);
    };
  }, [handleLocationSelect]); // Ensure useEffect dependency on handleLocationSelect

  return <div id="map" style={{ width: "100%", height: "300px" }}></div>;
};

export default MapComponent;
