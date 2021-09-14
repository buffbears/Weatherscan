var mmap
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
		if (mmap !== undefined) { mmap.remove(); }
		map = L.map(divID, {
			zoom: zoom,
			fullscreenControl: false,
			center: [latitude, longitude]
			 // 31.205482,-82.4331197 test coordinates
		});
		if (divID == "radar-1") {
			mmap = map;
		}

		// basemap
		// streets cj9fqw1e88aag2rs2al6m3ko2
		// satellite streets cj8p1qym6976p2rqut8oo6vxr
		// weatherscan green cj8owq50n926g2smvagdxg9t8
		// mapbox://styles/goldbblazez/ckgc7fwvr4qmn19pevtvhyabl
	//	https://api.mapbox.com/styles/v1/goldbblazez/ckgc8lzdz4lzh19qt7q9wbbr9.html?fresh=true&title=copy&access_token=pk.eyJ1IjoiZ29sZGJibGF6ZXoiLCJhIjoiY2tiZTRnb2Q2MGkxajJwbzV2bWd5dXI5MyJ9.jU-2DqGCBI14K-acyN9RCw
		L.tileLayer('https://api.mapbox.com/styles/v1/goldbblazez/ckgc8lzdz4lzh19qt7q9wbbr9/tiles/{z}/{x}/{y}?access_token=' + map_key, {
			tileSize: 512,
			zoomOffset: -1
		}).addTo(map);
		if (withSat == true) {
			$.getJSON("https://api.weather.com/v3/TileServer/series/productSet?filter=satrad&apiKey=" + api_key, function(data) {
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
		$.getJSON("https://api.weather.com/v3/TileServer/series/productSet?filter=radar&apiKey=" + api_key, function(data) {
			for (var i = 0; i < data.seriesInfo.radar.series.length; i++) {
				timeLayers.push(
					L.tileLayer("https://api.weather.com/v3/TileServer/tile/radar?ts="+ data.seriesInfo.radar.series[i].ts +"&xyz={x}:{y}:{z}&apiKey=" + api_key, {
						opacity: 0
				}))
			}
			timeLayers.forEach(timeLayers => {

          timeLayers.addTo(map);
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





/*
 * Workaround for 1px lines appearing in some browsers due to fractional transforms
 * and resulting anti-aliasing.
 * https://github.com/Leaflet/Leaflet/issues/3575
 */

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
})()
