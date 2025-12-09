var map, basemap, radarmain, sortedtimestamps, sortedtimestampsmini, satradsortedtimestamps, satellitemap, minimap, minibasemap, miniradar, interval, miniinterval;
var customMap = false;

function initBasemaps() {
	//main map
	mapboxgl.accessToken = map_key
	map = new mapboxgl.Map({
		container: 'radar-3', // container ID
		style: 'mapbox://styles/goldbblazez/cl10wz58y000q14ptdm3vkmxe', // style URL
		center: [maincitycoords.lon, maincitycoords.lat], // starting position [lng, lat]
		zoom: 7.7, // starting zoom
		sprite: "mapbox://sprites/goldbblazez/cl10wz58y000q14ptdm3vkmxe/f2jmfbiv3wccsb4w7xb1prfmc"
	});
	//render a whole separate map just to do dropshadow
	basemap = new maplibregl.Map({
		container: 'radar-1', // container ID // style URL
		style: {
				'version': 8,
				'sources': {
				'raster-tiles': {
				'type': 'raster',
					'tiles': [
						//'http://127.0.0.1/cgi-bin/qgis_mapserv.fcgi.exe?map=E:/desktop/mecratorproject/mapprojectforlater.qgz&BBOX={bbox-epsg-3857}&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&CRS=EPSG:3857&WIDTH=512&HEIGHT=512&LAYERS=USA_modified&format=image/png'
						'https://api.mapbox.com/styles/v1/goldbblazez/cl6jfozbb001h15sdx9ze69f7/tiles/{z}/{x}/{y}?access_token=' + map_key
						//'./test/{z}/{x}/{y}.png'
					],
					'tileSize': 512
					},
				},
				'layers': [
					{
					'id': 'basemap',
					'type': 'raster',
					'source': 'raster-tiles',
					'layout': { 'visibility': 'visible'},
					'minzoom': 0,
					'maxzoom': 22
					}
				]
		},
		center: [maincitycoords.lon, maincitycoords.lat], // starting position [lng, lat]
		zoom: 7.7, // starting zoom
	});
	radarmain = new maplibregl.Map({
		container: 'radar-2', // container ID // style URL
		style: {
				'version': 8,
				'sources': {
				'raster-tiles': {
				'type': 'raster',
				'tiles': [
				'https://api.weather.com/v3/TileServer/tile/radar?ts=1648291200&xyz={x}:{y}:{z}&apiKey=' + api_key
				],
				'tileSize': 256,
				}
			},
			'layers': [
				{
				'id': 'simple-tiles',
				'type': 'raster',
				'source': 'raster-tiles',
				'layout': { 'visibility': 'visible'},
				'minzoom': 0,
				'maxzoom': 22
				}
			]
		},
		center: [maincitycoords.lon, maincitycoords.lat], // starting position [lng, lat]
		zoom: 7.7 // starting zoom
	});
	//mainmap
	map.on('load', () => {
		//a bunch of code just to add the sim's city onto the map.

		if (customMap == true) {
			map.setPaintProperty('roadsigns','text-opacity', 0)
			map.setPaintProperty('roadsigns','icon-opacity', 0)
			map.setPaintProperty('minor city shadows','text-opacity', 0)
			map.setPaintProperty('minor cities','text-opacity', 0)
			map.setPaintProperty('minor cities','icon-opacity', 0)
			map.setPaintProperty('major city shadow','text-opacity', 0)
			map.setPaintProperty('major cities','text-opacity', 0)
			map.setPaintProperty('major cities','icon-opacity', 0)
			map.setPaintProperty('airport-label medium','icon-opacity', 0)
			map.setPaintProperty('airport-label large','icon-opacity', 0)
			map.addSource('customcitypoints', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.6557, 30.3322] //lon,lat
							},
							"properties": {
								"textvariableanchor": "left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Jacksonville",
								"offset": [0.45,-0.2], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.3124, 29.9012] //lon,lat
							},
							"properties": {
								"textvariableanchor": "left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "St. Augustine",
								"offset": [0.45,-0.1], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.6376, 29.6486] //lon,lat
							},
							"properties": {
								"textvariableanchor": "top", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Palatka",
								"offset": [-0.1,0.45], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.4626, 30.6697] //lon,lat
							},
							"properties": {
								"textvariableanchor": "left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Fernandina Beach",
								"offset": [0.45,0.1], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.3886, 31.1596] //lon,lat
							},
							"properties": {
								"textvariableanchor": "left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "St. Simons Island",
								"offset": [0.45,0.1], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.3540, 31.2136] //lon,lat
							},
							"properties": {
								"textvariableanchor": "top", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Waycross",
								"offset": [0,0.45], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-83.2785, 30.8327] //lon,lat
							},
							"properties": {
								"textvariableanchor": "bottom", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Valdosta",
								"offset": [0,-0.45], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.6393, 30.1897] //lon,lat
							},
							"properties": {
								"textvariableanchor": "right", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Lake City",
								"offset": [-0.55,0.1], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.1098, 29.9441] //lon,lat
							},
							"properties": {
								"textvariableanchor": "right", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Starke",
								"offset": [-0.45,0.1], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.3248, 29.6516] //lon,lat
							},
							"properties": {
								"textvariableanchor": "top-right", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Gainesville",
								"offset": [-0.45,0.3], //y+2
	        		}
						},
					]
				}
			});
			map.addSource('mainroadsigns', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.0789, 30.2736]
							},
							"properties": {
	            	"icon": "us-interstate-2 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "10"
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.3284, 29.7024]
							},
							"properties": {
	            	"icon": "us-interstate-2 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "95"
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-83.0756, 30.5388]
							},
							"properties": {
	            	"icon": "us-interstate-2 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "75"
	        		}
						},
					]
				}
			});
			map.addSource('mainairports', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.6556, 30.4621]
							},
						}
					]
				}
			});
			map.addLayer({
					'id': 'customcityshadow',
					'type': 'symbol',
					'source': 'customcitypoints', // reference the data source
					'layout': {
						'text-field': ['get', 'name'],
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-anchor': ['get', 'textvariableanchor'],
						'text-offset': ['get', 'offset'],
						'text-justify': 'auto',
						'icon-image': 'locatordot2',
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,11],
					'text-color': "#171717",
					'icon-opacity': 0,
				}
			});
			map.addLayer({
					'id': 'customcity',
					'type': 'symbol',
					'source': 'customcitypoints', // reference the data source
					'layout': {
						'text-field': ['get', 'name'],
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-anchor': ['get', 'textvariableanchor'],
						'text-offset': ['get', 'offset'],
						'text-justify': 'auto',
						'icon-image': 'locatordot2',
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
			map.addLayer({
					'id': 'mainroadsigns',
					'type': 'symbol',
					'source': 'mainroadsigns', // reference the data source
					'layout': {
						'text-field': ['get', 'text'],
						'text-font': ["Frutiger Bold"],
						'text-size': 22,
						'icon-image': ['get', 'icon'],
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.3
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
			map.addLayer({
					'id': 'mainairports',
					'type': 'symbol',
					'source': 'mainairports', // reference the data source
					'layout': {
						'icon-image': 'airplane',
						'icon-allow-overlap': true, // reference the image
				}
			});
			map.addSource('customcitypointszoom', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.6557, 30.3322] //lon,lat
							},
							"properties": {
	            	"textvariableanchor": "bottom", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Jacksonville",
								"offset": [-1,-0.45], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.3961, 30.2841] //lon,lat
							},
							"properties": {
	            	"textvariableanchor": "top-left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Jacksonville Beach",
								"offset": [0.5,0.45], //y+2
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.8604, 30.0689]
							},
							"properties": {
	            	"textvariableanchor": "right", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Middleburg",
								"offset": [-0.45,0.2],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.1221, 30.2822]
							},
							"properties": {
	            	"textvariableanchor": "right", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Macclenny",
								"offset": [-0.45,0.2],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.3124, 29.9012]
							},
							"properties": {
	            	"textvariableanchor": "top-left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "St. Augustine",
								"offset": [0.3,0.45],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.4300, 30.3924]
							},
							"properties": {
	            	"textvariableanchor": "left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Mayport",
								"offset": [0.45,0],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.6065, 30.6319]
							},
							"properties": {
	            	"textvariableanchor": "left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Yulee",
								"offset": [0.45,0.1],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.5306, 30.7479]
							},
							"properties": {
	            	"textvariableanchor": "left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "St. Mary's",
								"offset": [0.45,0],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.8001, 30.5077]
							},
							"properties": {
	            	"textvariableanchor": "bottom-right", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Ratliff",
								"offset": [-0.45,-0.45],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.5665, 30.6819]
							},
							"properties": {
	            	"textvariableanchor": "bottom", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Fargo",
								"offset": [0,-0.45],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.3248, 29.6516]
							},
							"properties": {
	            	"textvariableanchor": "bottom-right", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Gainesville",
								"offset": [-0.35,-0.55],
	        		}
						},
					]
				}
			});
			map.addSource('mainroadsignszoom', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.7542, 30.2031]
							},
							"properties": {
	            	"icon": "us-interstate-3 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "295"
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.9822, 30.2888]
							},
							"properties": {
	            	"icon": "us-interstate-2 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "10"
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.6524, 30.7656]
							},
							"properties": {
	            	"icon": "us-interstate-2 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "95"
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.5670, 29.9481]
							},
							"properties": {
	            	"icon": "us-interstate-2 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "75"
	        		}
						},
					]
				}
			});
			map.addSource('mainairportszoom', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [0, 0]
							},
						}
					]
				}
			});
			map.addLayer({
					'id': 'customcityshadowzoom',
					'type': 'symbol',
					'source': 'customcitypointszoom', // reference the data source
					'layout': {
						'text-field': ['get', 'name'],
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-anchor': ['get', 'textvariableanchor'],
						'text-offset': ['get', 'offset'],
						'text-justify': 'auto',
						'icon-image': 'locatordot2',
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,11],
					'text-color': "#171717",
					'icon-opacity': 0,
				}
			});
			map.addLayer({
					'id': 'customcityzoom',
					'type': 'symbol',
					'source': 'customcitypointszoom', // reference the data source
					'layout': {
						'text-field': ['get', 'name'],
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-anchor': ['get', 'textvariableanchor'],
						'text-justify': 'auto',
						'text-offset': ['get', 'offset'],
						'icon-image': 'locatordot2',
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
			map.addLayer({
					'id': 'mainroadsignszoom',
					'type': 'symbol',
					'source': 'mainroadsignszoom', // reference the data source
					'layout': {
						'text-field': ['get', 'text'],
						'text-font': ["Frutiger Bold"],
						'text-size': 22,
						'icon-image': ['get', 'icon'],
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.3
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
			map.addLayer({
					'id': 'mainairportszoom',
					'type': 'symbol',
					'source': 'mainairportszoom', // reference the data source
					'layout': {
						'icon-image': 'airplane',
						'icon-allow-overlap': true, // reference the image
				}
			});
		} else {
			//load in sim's city
			map.addSource('maincitypoint', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [maincitycoords.lon, maincitycoords.lat]
							},
						}
					]
				}
			});
			map.addLayer({
					'id': 'maincityshadow',
					'type': 'symbol',
					'source': 'maincitypoint', // reference the data source
					'layout': {
						'text-field': maincitycoords.displayname,
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-variable-anchor': ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'],
						'text-radial-offset': 0.45,
						'text-justify': 'auto',
						'icon-image': 'locatordot2', // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,11],
					'text-color': "#171717",
					'icon-opacity': 0,
				}
			});
			map.addLayer({
					'id': 'maincity',
					'type': 'symbol',
					'source': 'maincitypoint', // reference the data source
					'layout': {
						'text-field': maincitycoords.displayname,
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-variable-anchor': ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'],
						'text-radial-offset': 0.45,
						'text-justify': 'auto',
						'icon-image': 'locatordot2', // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
		}
		//default the map to fadeout
		fadeMap('radar-1', false, 7.7)
	});

	//satellitemap
	satellitemap = new mapboxgl.Map({
		container: 'satrad-1', // container ID // style URL
		style: 'mapbox://styles/goldbblazez/cl188bbm3000f14rmh9mcqbp8',
		center: [maincitycoords.lon, maincitycoords.lat], // starting position [lng, lat]
		zoom: 4.7, // starting zoom
		projection: {
			name: 'lambertConformalConic',
			center: [-98.8833, 30],
			parallels: [30, 30]
		}
	});
	satellitemap.on('load', () => {
		satellitemap.addSource('basemaptiles', {
			'type': 'raster',
				'tiles': [
					'https://api.mapbox.com/styles/v1/goldbblazez/cl6jfozbb001h15sdx9ze69f7/tiles/{z}/{x}/{y}?access_token=' + map_key
				],
				'tileSize': 512
			});
		satellitemap.addLayer({
				'id': 'basemp',
				'type': 'raster',
				'source': 'basemaptiles', // reference the data source
			}, 'counties blur');
			fadeMap('satrad-1', false)
		});

	//minimap
	minimap = new mapboxgl.Map({
		container: 'minimap-3', // container ID
		style: 'mapbox://styles/goldbblazez/cl11ctjbl000014s02fijkmyc', // style URL
		center: [maincitycoords.lon, maincitycoords.lat], // starting position [lng, lat]
		zoom: 6, // starting zoom
		sprite: "mapbox://styles/goldbblazez/cl11ctjbl000014s02fijkmyc/f2jmfbiv3wccsb4w7xb1prfmc"
	});
	minibasemap = new maplibregl.Map({
		container: 'minimap-1', // container ID // style URL
		style: {
				'version': 8,
				'sources': {
				'raster-tiles': {
				'type': 'raster',
					'tiles': [
						'https://api.mapbox.com/styles/v1/goldbblazez/cl6jfozbb001h15sdx9ze69f7/tiles/{z}/{x}/{y}?access_token=' + map_key
					],
					'tileSize': 512,
					'minzoom': 6,
					'maxzoom': 8,
					},
				},
				'layers': [
					{
					'id': 'basemap',
					'type': 'raster',
					'source': 'raster-tiles',
					'layout': { 'visibility': 'visible'},
					'minzoom': 0,
					'maxzoom': 22
					}
				]
		},
		center: [maincitycoords.lon, maincitycoords.lat], // starting position [lng, lat]
		zoom: 6, // starting zoom
	});
	//render a whole separate map just to do dropshadow
	miniradar = new maplibregl.Map({
		container: 'minimap-2', // container ID // style URL
		style: {
				'version': 8,
				'sources': {
				'raster-tiles': {
				'type': 'raster',
				'tiles': [
				'https://api.weather.com/v3/TileServer/tile/twcRadarMosaic?ts=1648291200&xyz={x}:{y}:{z}&apiKey=' + api_key
				],
				'tileSize': 256,
				}
			},
			'layers': [
				{
				'id': 'simple-tiles',
				'type': 'raster',
				'source': 'raster-tiles',
				'layout': { 'visibility': 'visible'},
				'minzoom': 0,
				'maxzoom': 22
				}
			]
		},
		center: [maincitycoords.lon, maincitycoords.lat], // starting position [lng, lat]
		zoom: 6, // starting zoom
	});
	minimap.on('load', () => {
		//a bunch of code just to add the sim's city onto the map.
		if (customMap == true) {
			minimap.setPaintProperty('minor city shadows','text-opacity', 0)
			minimap.setPaintProperty('minor cities','text-opacity', 0)
			minimap.setPaintProperty('minor cities','icon-opacity', 0)
			minimap.setPaintProperty('major city shadow','text-opacity', 0)
			minimap.setPaintProperty('major cities','text-opacity', 0)
			minimap.setPaintProperty('major cities','icon-opacity', 0)
			//insert custom minimap code
			minimap.addSource('customcitypoints', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.6557, 30.3322]
							},
							"properties": {
	            	"textvariableanchor": "top", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Jacksonville",
								"offset": [0.2,0.35],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-84.2807, 30.4383]
							},
							"properties": {
	            	"textvariableanchor": "top-left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Tallahassee",
								"offset": [0.25,0.25],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-82.3248, 29.6516]
							},
							"properties": {
	            	"textvariableanchor": "top", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Gainesville",
								"offset": [-0.1,0.25],
	        		}
						},
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-81.3789, 28.5384]
							},
							"properties": {
	            	"textvariableanchor": "bottom-left", //'top', 'bottom', 'left', 'right',"top-left", "top-right", "bottom-left", "bottom-right"
								"name": "Orlando",
								"offset": [0.1,-0.45],
	        		}
						},
					]
				}
		});
			/*minimap.addSource('mainroadsigns', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [maincitycoords.lon, maincitycoords.lat]
							},
							"properties": {
	            	"icon": "us-interstate-2 copyreal",//"us-interstate","us-highway",'state-highway'
								"text": "23"
	        		}
						}
					]
				}
			});
			minimap.addSource('mainairports', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [maincitycoords.lon, maincitycoords.lat]
							},
						}
					]
				}
			});*/
			minimap.addLayer({
					'id': 'customcityshadow',
					'type': 'symbol',
					'source': 'customcitypoints', // reference the data source
					'layout': {
						'text-field': ['get', 'name'],
						'text-font': ["Interstate Regular"],
						'text-size': 25,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-anchor': ['get', 'textvariableanchor'],
						'text-offset': ['get', 'offset'],
						'text-justify': 'auto',
						'icon-image': 'locatordot2',
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.30
				},
				'paint': {
					'text-translate': [0,11],
					'text-color': "#171717",
					'icon-opacity': 0,
				}
			});
			minimap.addLayer({
					'id': 'customcity',
					'type': 'symbol',
					'source': 'customcitypoints', // reference the data source
					'layout': {
						'text-field': ['get', 'name'],
						'text-font': ["Interstate Regular"],
						'text-size': 25,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-anchor': ['get', 'textvariableanchor'],
						'text-offset': ['get', 'offset'],
						'text-justify': 'auto',
						'icon-image': 'locatordot2',
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.30
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
			/*minimap.addLayer({
					'id': 'mainroadsigns',
					'type': 'symbol',
					'source': 'mainroadsigns', // reference the data source
					'layout': {
						'text-field': ['get', 'text'],
						'text-font': ["Frutiger Bold"],
						'text-size': 22,
						'icon-image': ['get', 'icon'],
						'icon-allow-overlap': true,
						'text-allow-overlap': true, // reference the image
						'icon-size': 1.3
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
			minimap.addLayer({
					'id': 'mainairports',
					'type': 'symbol',
					'source': 'mainairports', // reference the data source
					'layout': {
						'icon-image': 'airplane',
						'icon-allow-overlap': true, // reference the image
				}
			});*/
		} else {
			minimap.addSource('maincitypoint', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [maincitycoords.lon, maincitycoords.lat]
							},
						}
					]
				}
			});
			minimap.addLayer({
					'id': 'maincityshadow',
					'type': 'symbol',
					'source': 'maincitypoint', // reference the data source
					'layout': {
						'text-field': maincitycoords.displayname,
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-variable-anchor': ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'],
						'text-radial-offset': 0.45,
						'text-justify': 'auto',
						'icon-image': 'locatordot2', // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,11],
					'text-color': "#171717",
					'icon-opacity': 0,
				}
			});
			minimap.addLayer({
					'id': 'maincity',
					'type': 'symbol',
					'source': 'maincitypoint', // reference the data source
					'layout': {
						'text-field': maincitycoords.displayname,
						'text-font': ["Frutiger Bold"],
						'text-size': 28,
						'text-line-height': 1.2,
						'text-max-width': 10,
						'text-variable-anchor': ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'],
						'text-radial-offset': 0.45,
						'text-justify': 'auto',
						'icon-image': 'locatordot2', // reference the image
						'icon-size': 1.45
				},
				'paint': {
					'text-translate': [0,8],
					'text-color': "#d4d4d4"
				}
			});
		}
	});

}
function recenterMap(divID, lat, lon, zoom) {
	if (divID == 'radar-1') {
		radarmain.jumpTo({
			center: [lon, lat],
			zoom: zoom,
		});
		basemap.jumpTo({
			center: [lon, lat],
			zoom: zoom,
		});
		map.jumpTo({
			center: [lon, lat],
			zoom: zoom,
		});
	}
}
function fadeMap(divID, fadein, zoom) {
	if (divID == 'radar-1') {
		if (fadein === true) {
			$('#radar-1').fadeIn(0)
			$('#radar-2').fadeIn(0)
			$('#radar-3').fadeIn(0)
			map.resize()
			basemap.resize()
			radarmain.resize()
		} else {
			setTimeout(function() {
				$('#radar-1').fadeOut(0)
				$('#radar-2').fadeOut(0)
				$('#radar-3').fadeOut(0)
			}, 500)
		}
		map.setPaintProperty('counties blur','line-opacity', (fadein == true) ? 1 : 0)
		map.setPaintProperty('counties','line-opacity', (fadein == true) ? 1 : 0)
		map.setPaintProperty('country-boundaries blur','line-opacity', (fadein == true) ? 1 : 0)
		map.setPaintProperty('country-boundaries','line-opacity', (fadein== true) ? 1 : 0)
		map.setPaintProperty('state blur','line-opacity', (fadein== true) ? 1 : 0)
		map.setPaintProperty('state','line-opacity', (fadein== true) ? 1 : 0)
		map.setPaintProperty('state blur copy','line-opacity', (fadein== true) ? 1 : 0)
		map.setPaintProperty('state copy','line-opacity', (fadein== true) ? 1 : 0)
		map.setPaintProperty('Highways Outline','line-opacity', (fadein== true) ? 1 : 0)
		map.setPaintProperty('Highways','line-opacity', (fadein== true) ? 1 : 0)
		if (customMap == true) {
			if (zoom == 7.1 && fadein==true) {
				map.setPaintProperty('customcityshadow','text-opacity', 1)
				map.setPaintProperty('customcity','text-opacity', 1)
				map.setPaintProperty('customcity','icon-opacity', 1)
				map.setPaintProperty('mainroadsigns','icon-opacity', 1)
				map.setPaintProperty('mainroadsigns','text-opacity', 1)
				map.setPaintProperty('mainairports','icon-opacity', 1)
			} else if (zoom == 7.7 && fadein==true) {
				map.setPaintProperty('customcityshadowzoom','text-opacity', 1)
				map.setPaintProperty('customcityzoom','text-opacity', 1)
				map.setPaintProperty('customcityzoom','icon-opacity', 1)
				map.setPaintProperty('mainroadsignszoom','icon-opacity', 1)
				map.setPaintProperty('mainroadsignszoom','text-opacity', 1)
				map.setPaintProperty('mainairportszoom','icon-opacity', 1)
			} else if (fadein==false) {
				map.setPaintProperty('customcityshadow','text-opacity', 0)
				map.setPaintProperty('customcity','text-opacity', 0)
				map.setPaintProperty('customcity','icon-opacity', 0)
				map.setPaintProperty('customcityzoom','icon-opacity', 0)
				map.setPaintProperty('mainroadsigns','icon-opacity', 0)
				map.setPaintProperty('mainroadsigns','text-opacity', 0)
				map.setPaintProperty('mainairports','icon-opacity', 0)
				map.setPaintProperty('customcityshadowzoom','text-opacity', 0)
				map.setPaintProperty('customcityzoom','text-opacity', 0)
				map.setPaintProperty('mainroadsignszoom','icon-opacity', 0)
				map.setPaintProperty('mainroadsignszoom','text-opacity', 0)
				map.setPaintProperty('mainairportszoom','icon-opacity', 0)
			}
		} else {
			map.setPaintProperty('roadsigns','text-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('roadsigns','icon-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('minor city shadows','text-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('minor cities','text-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('minor cities','icon-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('major city shadow','text-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('major cities','text-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('major cities','icon-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('airport-label medium','icon-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('airport-label large','icon-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('maincityshadow','text-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('maincity','text-opacity', (fadein== true) ? 1 : 0)
			map.setPaintProperty('maincity','icon-opacity', (fadein== true) ? 1 : 0)
		}
		if (sortedtimestamps) {
		sortedtimestamps.forEach((timestamp, index) => {
			radarmain.setPaintProperty(
					`radarlayer_${timestamp.ts}`,
					"raster-opacity",
						(fadein == true) ? 1 : 0
			);
			map.setPaintProperty(
					`radarlayer_${timestamp.ts}`,
					"raster-opacity",
						(fadein == true) ? .5 : 0
			);
		});
		}
	} else if (divID == 'satrad-1') {
		if (fadein === true) {
			$('#satrad-1').fadeIn(0)
			satellitemap.resize()
		} else {
			setTimeout(function() {
				$('#satrad-1').fadeOut(0)
			},500)
		}
		satellitemap.setPaintProperty('state blur','line-opacity', (fadein== true) ? 1 : 0)
		satellitemap.setPaintProperty('state','line-opacity', (fadein== true) ? 1 : 0)
		satellitemap.setPaintProperty('state blur copy','line-opacity', (fadein== true) ? 1 : 0)
		satellitemap.setPaintProperty('state copy','line-opacity', (fadein== true) ? 1 : 0)
		satellitemap.setPaintProperty('country-boundaries blur','line-opacity', (fadein == true) ? 1 : 0)
		satellitemap.setPaintProperty('country-boundaries','line-opacity', (fadein== true) ? 1 : 0)
		if (satradsortedtimestamps) {
		satradsortedtimestamps.forEach((timestamp, index) => {
			satellitemap.setPaintProperty(
				`satradlayer_${timestamp.ts}`,
				"raster-opacity",
					(fadein == true) ? 1 : 0
				);
		});
		}
	} else if (divID == 'minimap') {
		if (sortedtimestampsmini) {
		sortedtimestampsmini.forEach((timestamp, index) => {
			miniradar.setPaintProperty(
				`radarlayer_${timestamp.ts}`,
				"raster-opacity",
					(fadein == true) ? 1 : 0
				);
			minimap.setPaintProperty(
				`radarlayer_${timestamp.ts}`,
				"raster-opacity",
					(fadein == true) ? .5 : 0
			);
		});
		}
	}
}
function loadRadarImages(divID) {
	var mapdiv;
	var radardiv;

	if (divID == 'radar-1') {
		if (interval) {clearInterval(interval)};
		mapdiv = map;
		radardiv = radarmain;
		if (sortedtimestamps) {
			sortedtimestamps.forEach((timestamp, index) => {
		    radardiv.removeLayer(`radarlayer_${timestamp.ts}`)
				radardiv.removeSource(`radarlayer_${timestamp.ts}`)
			});
			sortedtimestamps.forEach((timestamp, index) => {
		    mapdiv.removeLayer(`radarlayer_${timestamp.ts}`)
				mapdiv.removeSource(`radarlayer_${timestamp.ts}`)
			});
		}
	} else if (divID == 'minimap') {
		if (miniinterval) {clearInterval(miniinterval)};
		mapdiv = minimap;
		radardiv = miniradar;
		if (sortedtimestampsmini) {
			sortedtimestampsmini.forEach((timestamp, index) => {
		    radardiv.removeLayer(`radarlayer_${timestamp.ts}`)
				radardiv.removeSource(`radarlayer_${timestamp.ts}`)
			});
			sortedtimestampsmini.forEach((timestamp, index) => {
		    mapdiv.removeLayer(`radarlayer_${timestamp.ts}`)
				mapdiv.removeSource(`radarlayer_${timestamp.ts}`)
			});
		}
	} else if (divID == 'satrad-1') {
		if (interval) {clearInterval(interval)};
		if (satradsortedtimestamps) {
			satradsortedtimestamps.forEach((timestamp, index) => {
		    satellitemap.removeLayer(`satradlayer_${timestamp.ts}`)
			});
		}
		fetch("https://api.weather.com/v3/TileServer/series/productSet/PPAcore?filter=satrad&apiKey=" + api_key)
	    .then(timestampsobj => timestampsobj.json())
	    .then(data => {
				sortedtimestampsforfetch = data.seriesInfo.satrad.series.sort(function(a,b) {
					return a.ts - b.ts;
				})
				satradsortedtimestamps = sortedtimestampsforfetch
				sortedtimestampsforfetch.forEach(timestamp =>{
					satellitemap.addLayer({
	          id: `satradlayer_${timestamp.ts}`,
	          type: "raster",
	          source: {
	            type: "raster",
	            tiles: [
								`https://api.weather.com/v3/TileServer/tile/satrad?ts=${timestamp.ts}&xyz={x}:{y}:{z}&apiKey=` + api_key
	            ],
	            tileSize: 512
	          },
	          layout: { visibility: "visible" },
						paint: {'raster-fade-duration': .5, 'raster-opacity':0,'raster-brightness-max':1},
	          minzoom: 0,
	          maxzoom: 8,
	        });
	    })
			})
		}
	if (divID != 'satrad-1') {
	fetch("https://api.weather.com/v3/TileServer/series/productSet/PPAcore?filter=twcRadarMosaic&apiKey=" + api_key)
    .then(timestampsobj => timestampsobj.json())
    .then(data => {
			sortedtimestampsforfetch = data.seriesInfo.twcRadarMosaic.series.sort(function(a,b) {
				return a.ts - b.ts;
			})
			if (divID == 'radar-1') {sortedtimestamps = sortedtimestampsforfetch} else if (divID == 'minimap') {sortedtimestampsmini = sortedtimestampsforfetch};
			sortedtimestampsforfetch.forEach(timestamp =>{
				radardiv.addLayer({
          id: `radarlayer_${timestamp.ts}`,
          type: "raster",
          source: {
            type: "raster",
            tiles: [
							`https://api.weather.com/v3/TileServer/tile/twcRadarMosaic?ts=${timestamp.ts}&xyz={x}:{y}:{z}&apiKey=` + api_key
            ],
            tileSize: 512
          },
          layout: { visibility: "visible" },
					paint: {'raster-fade-duration': .5, 'raster-opacity':0,'raster-brightness-max':0.9},
          minzoom: 5,
          maxzoom: 8
        });
				mapdiv.addLayer({
          id: `radarlayer_${timestamp.ts}`,
          type: "raster",
          source: {
            type: "raster",
            tiles: [
							`https://api.weather.com/v3/TileServer/tile/twcRadarMosaic?ts=${timestamp.ts}&xyz={x}:{y}:{z}&apiKey=` + api_key
            ],
            tileSize: 512
          },
          layout: { visibility: "visible" },
					paint: {'raster-fade-duration': .5,'raster-opacity':0,'raster-brightness-max':0.9},
          minzoom: 5,
          maxzoom: 12
        });
			});
    })
    .catch(console.error);
		}
}
function animateRadar(divID, loopnum, maxloop) {
	var mapdiv;
	var radardiv;
	var sortedmaptimestamps;
	if (divID == 'radar-1') {
		mapdiv = map;
		radardiv = radarmain;
		sortedmaptimestamps = sortedtimestamps;
	} else if (divID == 'satrad-1') {
		mapdiv = null;
		radardiv = satellitemap;
		sortedmaptimestamps = satradsortedtimestamps;
	}
	let i = 0;
  interval = setInterval(() => {
    if (i > sortedmaptimestamps.length - 1) {
      clearInterval(interval);
			setTimeout(function() {
				if (divID == 'minimap') {
					animateRadar('minimap')
				} else if (divID == 'satrad-1' && loopnum < maxloop) {
					animateRadar('satrad-1', loopnum + 1, maxloop)
				} else if (divID == 'radar-1' && loopnum < maxloop) {
					animateRadar('radar-1', loopnum + 1, maxloop)
				}
				return;
			},500)
    } else {
		sortedmaptimestamps.forEach((timestamp, index) => {
	    radardiv.setLayoutProperty(
	        (divID == 'satrad-1') ? `satradlayer_${timestamp.ts}` : `radarlayer_${timestamp.ts}`,
	        "visibility",
	      		index === i ? "visible" : "none"
	     );
			 if (divID != 'satrad-1') {
			 	mapdiv.setLayoutProperty(
 	        `radarlayer_${timestamp.ts}`,
 	        "visibility",
 	      		index === i ? "visible" : "none"
 	     		);
	    	}
			});
      i += 1;
    }
  }, 100);
}
function animateMiniRadar() {
	let i = 0;
  miniinterval = setInterval(() => {
    if (i > sortedtimestampsmini.length - 1) {
      clearInterval(miniinterval);
			setTimeout(function() {
				animateMiniRadar()
				return;
			},500)
    } else {
		sortedtimestampsmini.forEach((timestamp, index) => {
	    miniradar.setLayoutProperty(
					`radarlayer_${timestamp.ts}`,
	        "visibility",
	      		index === i ? "visible" : "none"
	     );
		 	minimap.setLayoutProperty(
	        `radarlayer_${timestamp.ts}`,
	        "visibility",
	      		index === i ? "visible" : "none"
     		);
			});
      i += 1;
    }
  }, 100);
}


/*var mmap,mmmap
function Radar(divIDin, intervalHoursIn, zoomIn, latitudeIn, longitudeIn, withSat) {
	var map,
	divID = divIDin,
	intervalHours = intervalHoursIn,
	zoom = zoomIn,
	latitude  = latitudeIn,
	longitude = longitudeIn,
	timeLayers = [];
	this.setView = function(lat, long, zoomLevel){
		map.setView(L.latLng(lat, long), zoomLevel)
	};


	startAnimation();

	// snap date to 5 minute intervals
	function roundDate(date) {
		date.setUTCMinutes( Math.round(date.getUTCMinutes() / 5) * 5);
		date.setUTCSeconds(0);
		return date;
	}

	function startAnimation () {

		var endDate = roundDate(new Date()),
			player;
		if (divID == 'radar-1') {if (mmap !== undefined) { mmap.remove(); }};
		if (divID == 'minimap') {if (mmmap !== undefined) { mmmap.remove(); }};
		map = L.map(divID, {
			zoomSnap: 0.1,
			zoomDelta: 0.1,
			zoom: zoom,
			fullscreenControl: false,
			center: [latitude, longitude],
			dragging: false,
		});
		if (divID == "radar-1") {
			mmap = map;
		} else if (divID == "minimap") {
			mmmap = map;
		};

		// basemap
		// streets cj9fqw1e88aag2rs2al6m3ko2
		// satellite streets cj8p1qym6976p2rqut8oo6vxr
		// weatherscan green cj8owq50n926g2smvagdxg9t8
		// mapbox://styles/goldbblazez/ckgc7fwvr4qmn19pevtvhyabl
	//	https://api.mapbox.com/styles/v1/goldbblazez/ckgc8lzdz4lzh19qt7q9wbbr9.html?fresh=true&title=copy&access_token=pk.eyJ1IjoiZ29sZGJibGF6ZXoiLCJhIjoiY2tiZTRnb2Q2MGkxajJwbzV2bWd5dXI5MyJ9.jU-2DqGCBI14K-acyN9RCw
		/*L.tileLayer('https://api.mapbox.com/styles/v1/goldbblazez/ckgc8lzdz4lzh19qt7q9wbbr9/tiles/{z}/{x}/{y}?access_token=' + map_key, {
			tileSize: 512,
			zoomOffset: -1
		}).addTo(map)
		L.tileLayer.wms('http://127.0.0.1/cgi-bin/qgis_mapserv.fcgi.exe?map=E:/desktop/mapprojectforlater.qgz&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&CRS=EPSG:4326&WIDTH=5000&HEIGHT=2500', {
			layers: "USA_modified",
			uppercase: 'true',
			tileSize: 512,
			zoomOffset: -1
		}).addTo(map);
		if (divID == "radar-1") {
			L.tileLayer('https://api.mapbox.com/styles/v1/goldbblazez/cl10wz58y000q14ptdm3vkmxe/tiles/{z}/{x}/{y}?access_token=' + map_key, {
				tileSize: 512,
				zoomOffset: -1
			}).addTo(map)
		} else if (divID == "minimap") {
			L.tileLayer('https://api.mapbox.com/styles/v1/goldbblazez/cl11ctjbl000014s02fijkmyc/draft/tiles/{z}/{x}/{y}?access_token=' + map_key, {
				tileSize: 512,
				zoomOffset: -1
			}).addTo(map)
		}
		L.marker([30.33, 81.66]).addTo(map);
		/*; &WIDTH=1000&HEIGHT=500&BBOX=-{90},-180,90,180 &LAYERS=test
		if (weatherInfo.radarTempUnavialable == true) {

		} else {
		if (withSat == true) {
			$.getJSON("https://api.weather.com/v3/TileServer/series/productSet/PPAcore?filter=satrad&apiKey=" + api_key, function(data) {
				for (var i = 0; i < data.seriesInfo.satrad.series.length; i++) {
					timeLayers.push(
						L.tileLayer("https://api.weather.com/v3/TileServer/tile/satrad?ts="+ data.seriesInfo.satrad.series[i].ts +"&xyz={x}:{y}:{z}&apiKey=" + api_key, {
							opacity: 0
					}))
				}
				timeLayers.forEach(timeLayers => {

	          timeLayers.addTo(map);
	        });
			});
		} else {
		$.getJSON("https://api.weather.com/v3/TileServer/series/productSet/PPAcore?filter=radar&apiKey=" + api_key, function(data) {
			for (var i = 0; i < data.seriesInfo.radar.series.length; i++) {
				timeLayers.push(
					L.tileLayer("https://api.weather.com/v3/TileServer/tile/radar?ts="+ data.seriesInfo.radar.series[i].ts +"&xyz={x}:{y}:{z}&apiKey=" + api_key, {
						opacity: 0
				}))
			}
			timeLayers.forEach(timeLayers => {
          timeLayers.addTo(map);
					timeLayers.getContainer().className += ' radarTile';
        });
		});
	}
		const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

		async function animationLoop() {

		  for (let i = timeLayers.length; i > 0; i--) {
				timeLayers[i - 1].setOpacity(1)
		    await sleepNow(100)
				timeLayers[i - 1].setOpacity(0)
		    if (i === 1) {
				timeLayers[i - 1].setOpacity(1)
				await	sleepNow(1750)
				timeLayers[i - 1].setOpacity(0)
					animationLoop()
				}
		  }
		}
		setTimeout(function() {
				animationLoop()
		}, 1000);

	}
	}
}





/*
 * Workaround for 1px lines appearing in some browsers due to fractional transforms
 * and resulting anti-aliasing.
 * https://github.com/Leaflet/Leaflet/issues/3575


(function(){
	//return;
    var originalInitTile = L.GridLayer.prototype._initTile
    L.GridLayer.include({
        _initTile: function (tile) {
            originalInitTile.call(this, tile);

            var tileSize = this.getTileSize();

            tile.style.width = tileSize.x + 1 + 'px';
            tile.style.height = tileSize.y + 1 + 'px';
        }
    });
})()*/
