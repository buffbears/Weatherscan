function Location() { // onReady, onRefresh, onAllComplete
	
	var that = this,
		$this = $(this),
		_forecastmgr,
		_observations=[];	
	
	this.temperature = function() {
		if (_observations[1]!=null && _observations[1].temperature.value) {
			return C2F(_observations[1].temperature.value);
		} else {
			return Math.round( _observations[0].item.condition.temp );					  
		}	
	}
			
	this.observations = function(i) {
		return _observations[i];
	};
	
	this.forecasts=function(type){return _forecastmgr.forecast(type)};
	
	this.init = function(searchString){
		checkRefresh(searchString);
	};
	
	this.initForecasts = function() {
		// start the forecast data pull
		_forecastmgr = new ForecastManager(_observations[0].item.lat, _observations[0].item.long, function() { 
			$this.trigger('ready');
		});	
	};
	
	this.initNWSObservations = function(){
		stationObservations();
	};

	
	// check to see if data needs to be refreshed
    function checkRefresh(location) {
		
		// check the expiration
		if ( _observations[0]!=undefined && dateFns.isFuture( _observations[0].xdate ) ) {
			setTimeout(checkRefresh, getRandom(5000, 10000));
			return;
		}
		
		// woeid is the id for the location to pull data for
		var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?format=json&q=' + 
			      'select * from weather.forecast where woeid' +
				  (that.woeid ? '='+that.woeid : ' in (select woeid from geo.places(1) where text="(' + location + ')")' )


		// ajax the latest observation
		$.getJSON(url, function(data) {
			_observations[0] = json = data.query.results.channel;
			
			$this.trigger('refresh');

			// the following block only runs on init
			if (that.woeid===undefined) {

				that.woeid = json.link.match(/(\d*)\/$/)[1];
				
				that.lat = json.item.lat;
				that.long = json.item.long;
				
				that.city = data.query.results.channel.location.city;

				$this.trigger('init');

			}
				
			// set the expiration date/time
			_observations[0].xdate = dateFns.addMinutes(json.lastBuildDate, json.ttl);			
			
			setTimeout(checkRefresh, getRandom(5000, 10000));
			
		});
		
    }
	
	
	// pull observations from the location observation station
	function stationObservations(){

		var url = that.stationUrl + '/observations/current';

		// check the expiration
		if ( _observations[1]!=undefined && dateFns.isFuture( _observations[1].xdate ) ) {
			setTimeout(checkRefresh, getRandom(5000, 10000));
			return;
		}

		// ajax the current conditions
		$.getJSON(url, function(data) {
			_observations[1] = data.properties;

			// set the expiration date/time
			_observations[1].xdate = dateFns.addMinutes(data.properties.timestamp, 60);				
			setTimeout(stationObservations, getRandom(5000, 10000));

		});	
	}	

}



function ForecastManager (latitude, longitude, readyCallback) {
	var _forecasts = {},
		keys =['daily','hourly'], 
		key,
		readycount = 0;

	for(key of keys) {
		_forecasts[key] = new Forecast(key, latitude, longitude, count);
	}		

	
	function count() {
		// count up completed forecast pulls
		readycount++;
		if (readycount===keys.length) {
			readyCallback();
		}
	}
	
	this.forecast = function(type) {
		try{
		return _forecasts[type].data;
		} catch(err){}
	}
	
}

function Forecast(type, lat, lon, readyCallback) {
	
	var that = this,
		url = 'https://api.weather.gov/points/' + lat + ',' + lon + '/forecast/' + (type==='hourly' ? type : '');
	
	this.data = {};
	
	checkRefresh();
	
    function checkRefresh() {
		
		// check the expiration
		if ( that.data!={} && dateFns.isFuture( that.data.xdate ) ) {
			setTimeout(checkRefresh, getRandom(5000, 10000));
			return;
		}

		// ajax the forecast
		$.getJSON(url, function(data) {
			that.data = data.properties.periods;
			
			// trigger ready callback on first data pull
			if (readyCallback){
				readyCallback();
			}
				
			// set the expiration date/time
			//that.data.xdate = dateFns.addMinutes(data.properties.updated, 60);				
			that.data.xdate = dateFns.addMinutes(new Date(), 5);				
			setTimeout(checkRefresh, getRandom(5000, 10000));
			
		});
		
    }	
}










