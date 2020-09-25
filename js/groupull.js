function GroupDataManager() {
	var locations = 
		[
			{name:'Chicago', n2:'IL'},
			{name:'Minneapolis', n2:'MN'},
			{name:'Tempe', n2:'AZ'},
			{name:'Fargo', n2:'ND'},
			{name:'North Hollywood', n2:'CA'},
			{name:'Los Angeles', n2:'CA'},
			{name:'Huntington Beach'},
			{name:'Las Vegas', n2:'NV'},
			{name:'Honolulu', n2:'HI'},
			{name:'Orlando', n2:'FL'},
			{name:'New York', n2:'NY'},
			{name:'Napa', n2:'CA'},
			{name:'Montego Bay', n2:''},
			{name:'Kona', n2:'HI'},
			{name:'Kalipaki Beach', n2:''},
			{name:'Ixtapa', n2:'MX'}
		]
	;
	
	checkRefresh();	
	setInterval(checkRefresh, 300000);


	// check to see if data needs to be refreshed
    function checkRefresh() {
		var woeid, location;
		
		for (location of locations) {
			
			// check the expiration
			if (location.hasOwnProperty('xdate') && dateFns.isFuture(location.xdate)) { continue; }
		
			woeid = location.hasOwnProperty('woeid') ? location.woeid : '';


			// woeid is the id for the location to pull data for
			var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?format=json&q=' + 
					  'select * from weather.forecast where woeid' +
					  (woeid ? '='+woeid : ' in (select woeid from geo.places(1) where text="(' + (location.name + ' ' + location.n2).trim() + ')")' );
			
			pullData(url, location);

		}
		
    }
	
	function pullData(url, location) {
		var $span;
		
		// ajax the latest observation
		$.getJSON(url, function(data) {
			location.data = data.query.results.channel;

			if ( !location.hasOwnProperty('woeid') ) {
				location.woeid = location.data.link.match(/(\d*)\/$/)[1];
				$span = $("<span id='" + location.woeid + "'></span>").appendTo('#marquee-now');					
			} else {
				$span = $('#marquee-now>span#' + location.woeid);							  
			}

			// display the current info
			$span.text(location.name + ': ' + location.data.item.condition.temp + ' ' + location.data.item.condition.text.toLowerCase());
						

			// set the expiration date/time
			location.xdate = dateFns.addMinutes(location.data.lastBuildDate, location.data.ttl);			

		});
	
	}
	
	
}
var groupDataManager = new GroupDataManager;
