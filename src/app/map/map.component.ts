import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() coordinates: number[][] = [];
  constructor() { }

  ngOnInit(): void {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });
    const markers = this.coordinates.map(coord => {
      const marker = new Feature({
        geometry: new Point(fromLonLat(coord)),
      });

      const markerStyle = new Style({
        image: new Icon({
          src: '../../assets/marker.png',
          scale: 0.05
        })
      });

      marker.setStyle(markerStyle);

      return marker;
    });

    const markerSource = new VectorSource({
      features: markers
    });

    const markerLayer = new VectorLayer({
      source: markerSource
    });

    map.addLayer(markerLayer);
  }
}
