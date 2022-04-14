function Intro() {
let animationtime, rotatex, rotatey, rotatez;
function spinything() {
    animationtime = Math.floor(Math.random() * (12 - 3 + 1)) + 3
    rotatex = (Math.floor(-100 + Math.random()*(100 + 1 - -100)))/100
    rotatey = (Math.floor(-100 + Math.random()*(100 + 1 - -100)))/100
    rotatez = (Math.floor(-100 + Math.random()*(100 + 1 - -100)))/100
    $("#headendid").text("headend id: 028471")
    $("#serialnumber").text("serial number: N/A")
    $("#affilatename").text("affiliate name: XFINITY TV")
    $(".intellistarlogo").css( { transition: `transform 5s linear`,
    transform: `rotate3d(${rotatex}, ${rotatey}, ${rotatez}, ${.25 + Math.random()}turn)` } );
    setTimeout(function () {
      $("#startup").fadeOut(0);
    }, 5000)

  };
  spinything()
};
$(function(){
  Intro()
})

//time manager
setInterval(
  function () {
    var today = new Date();

    $('#date').text( today.toString().slice(4,10).trimRight() );
    $('#time').text( today.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' }).replace(/ /g,'') );
  }
, 1000);
//location pull
var maincitycoords = {name:"",lat:"",lon:""}, marinelocation,
locList = [], citySlideList = [], state, ccTickerCitiesList = [];


  //If there is a location inputted, use that.

queryString = window.location.search;

function getMainLoc(onInit) {
  if (queryString) {
    $.getJSON("https://api.weather.com/v3/location/search?query="+queryString.split("?")[1]+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
    if (onInit==true){
      getExtraLocs(data.location.latitude[0],data.location.longitude[0],true);
      maincitycoords.lat = data.location.latitude[0]
      maincitycoords.lon = data.location.longitude[0]
      maincitycoords.name = data.location.displayName[0]
      $("#locationname").text("location name: "+data.location.displayName[0])
      maincitycoords.displayname = data.location.displayName[0]
      state = data.location.adminDistrict[0];
      //init data
      getStatePopularCities(state, true)
      grabAlamanacSlidesData()
      grabHealthData()
      grabSideandLowerBarData()
    } else {
      //for settings
      mainlocationdata = {name:data.location[0].displayName,displayname:data.location[0].displayName,lat:data.location[0].latitude,lon:data.location[0].longitude,state:data.location.adminDistrict[0]};
      updateonResetMainLoc()
    }
    });
  } else {
    // get lat lon from user's ip
    $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    if (onInit==true){
      getExtraLocs(data.lat,data.lon,true);
      maincitycoords.name = data.city
      $("#locationname").text("location name: "+data.city)
      maincitycoords.displayname = data.city
      maincitycoords.lat = data.lat
      maincitycoords.lon = data.lon
      state = data.regionName
      //init data
      getStatePopularCities(state, true)
      grabAlamanacSlidesData()
      grabHealthData()
      grabSideandLowerBarData()
    } else {
      //for settings
      mainlocationdata = {name:data.city,displayname:data.city,lat:data.lat,lon:data.lon,state:data.regionName};
      updateonResetMainLoc()
    }
    });

  }
}
getMainLoc(true);

function getExtraLocs(lat,lon, onInit, whichReset) {
    $.getJSON('https://api.weather.com/v3/location/near?geocode=' + lat + ',' + lon + '&product=observation&format=json&apiKey=' + api_key, function(data) {

			var feature = data.location, geo, station, dist, ti=0;
      var minRadiusMiles = 0, maxRadiusMiles = 45;
      getLocLoop(0);
			function getLocLoop(i) {
        $.getJSON("https://api.weather.com/v3/location/point?geocode="+ feature.latitude[i] + "," + feature.longitude[i] + "&language=en-US&format=json&apiKey=" + api_key, function(dataii){
  				latgeo = feature.latitude[i];
  				longeo = feature.longitude[i];
  				dist = feature.distanceMi[i];
        displayname = dataii.location.displayName
        if (onInit == true) {
         if (displayname == maincitycoords.displayname || displayname == state) {
          if ((dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != maincitycoords.displayname && dataii.location.locale.locale4)) {
            displayname = (dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
          } else {
            if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
            return
          }
        }
        for (var li = 0; li < citySlideList.length; li++) {
          if (displayname == citySlideList[li].displayname) {
            if ((dataii.location.locale.locale3 != citySlideList[li].displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != citySlideList[li].displayname && dataii.location.locale.locale4)) {
              displayname = (dataii.location.locale.locale3 != citySlideList[li].displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
            } else {
              if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
              return
            }
          }
        }
      } else {
        if (displayname == maincitycoords.displayname || displayname == state) {
         if ((dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != maincitycoords.displayname && dataii.location.locale.locale4)) {
           displayname = (dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
         } else {
           if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
           return
         }
       }
       for (var li = 0; li < city8slidedata.length; li++) {
         if (displayname == city8slidedata[li].displayname) {
           if ((dataii.location.locale.locale3 != citySlideList[li].displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != citySlideList[li].displayname && dataii.location.locale.locale4)) {
             displayname = (dataii.location.locale.locale3 != citySlideList[li].displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
           } else {
             if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
             return
           }
         }
       }
      }
        if (i!=0) {
          if (onInit==true) {
            citySlideList.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname});
          } else {
            //for settings
            if (whichReset=="8slide"){
              city8slidedata.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname});
            }
          }
        };
        if (onInit == true) {
        displayname = dataii.location.displayName
        if (displayname == maincitycoords.displayname || displayname == state) {
            if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
            return
        }
        for (var li = 0; li < locList.length; li++) {
          if (displayname == locList[li].displayname) {
            if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
            return
          }
        }
      } else {
        displayname = dataii.location.displayName
        if (displayname == maincitycoords.displayname || displayname == state) {
            if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
            return
        }
        for (var li = 0; li < extralocsdata.length; li++) {
          if (displayname == extralocsdata[li].displayname) {
            if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
            return
          }
        }
      }
				if (dist >= minRadiusMiles && dist <= maxRadiusMiles) {
          if (ti < 3) {
            if (onInit==true) {
              locList.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname});
            } else {
              //for settinngs
              if (whichReset=="extralocation") {
                extralocsdata.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname});
              }
              }
            }
          } else {
            ti = ti - 1
          }
        //for the 8 city slide
        if (onInit == true) {
        if (i < data.location.stationName.length && (citySlideList.length < 8 || locList.length < 3)) {
          ti = ti + 1
          i = i + 1
          getLocLoop(i)
        } else {onExtraAjaxFinish()};
        } else {
          if (i < data.location.stationName.length && (city8slidedata.length < 8 || extralocsdata.length < 3)) {
            ti = ti + 1
            i = i + 1
            getLocLoop(i)
          } else {onExtraAjaxFinish()};
        }

      }).fail(function(){
        if (feature.latitude.length >= (i + 1) || i >= 9) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
      })
			}

			// sort list by distance
    function onExtraAjaxFinish () {
      if (onInit==true) {
  			locList.sort(function(a, b) {
  				return parseInt(a.distance) - parseInt(b.distance);
  			});
        grabCity8SlidesData()
        grabCitySlidesData()
      } else {
        //for settings
        if (whichReset=="extralocation") {
          extralocsdata.sort(function(a, b) {
            return parseInt(a.distance) - parseInt(b.distance);
  			  });
        }
        updateLocs(whichReset)
      }
			// set the station for location 0
			//_locations[0].stationUrl = locList[0].stationUrl
      //start datapull
    }
		});
  }

  function getStatePopularCities(state, onInit) {
    $.getJSON("https://examples.opendatasoft.com/api/records/1.0/search/?dataset=largest-us-cities&q=&sort=population&facet=city&facet=state&refine.state=" + state, function(data) {
      if (data !== undefined && data.records.length != 0) {
      data.records.forEach((city, i) => {
        if (onInit==true) {
          ccTickerCitiesList.push({name:city.fields.city,displayname:city.fields.city,lat:(city.fields.coordinates).split(';')[0],lon:(city.fields.coordinates).split(';')[1]})
        } else {
          cctickerdata.push({name:city.fields.city,displayname:city.fields.city,lat:(city.fields.coordinates).split(';')[0],lon:(city.fields.coordinates).split(';')[1]})
          updateLocs("cctickerloc")
        };
        if (i == (data.records.length - 1)) {pullCCTickerData()};
      });
     } else {
       //if nothing just run the function and use placeholder locs
       pullCCTickerData();
     }
    });
  }


var weatherInfo = { currentCond: {
  sidebar: {noReport:false,displayname:"",temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""},visibility:"",uvidx:"",ceiling:""},
  //loc:{noReport:"",displayname:"",temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""},},
  weatherLocs:[],
  //cityLoc:{noReport:false,displayname:"",temp:"",icon:"",wind:"",windspeed:""}
  city8slides:{noReport:false, cities:[]},
}, dayPart: {
  lowerbar:{noReport:false,displayname:"",daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]},
  /*loc:{noReport:"",displayname:"",daytitle:"",hour:[
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
  ]},*/
  weatherLocs:[],
}, dayDesc: {
  lowerbar: {noReport:false,displayname:"",day:[{name:"",desc:""},{name:"",desc:""},{name:"",desc:""},{name:"",desc:""}]},
  /*loc:{noReport:"",displayname:"",day:[
    {name:"",desc:""},
    {name:"",desc:""},
    {name:"",desc:""},
    {name:"",desc:""}
  ]},*/
  weatherLocs:[]
}, fiveDay: {
    lowerbar: {noReport:false,displayname:"",day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""}]},
    /*loc:{noReport:"",displayname:"",day:[
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""}
    ]},*/
    weatherLocs:[]
  }, alamanac: {displayname:"",date:"",avghigh:"",avglow:"",rechigh:"",reclow:"",rechighyear:"",reclowyear:"",sunrise:"",sunset:"",moonphases:[
    {name:"NEW",date:"Feb 10"},
    {name:"FIRST",date:"Feb 16"},
    {name:"FULL",date:"Feb 21"},
    {name:"LAST",date:"Feb 27"},
  ]}, bulletin: {
    //loc:{displayname:"",pages:[]},
    includesevereonbulletin: false,
    weatherLocs:[],
    severewarnings:[],
    //{name:"", desc:"", status:""}
    marqueewarnings:[],
    severeweathermode: false
    //{name:"", desc:"", status:"", significance:""}
  }, healthforecast: {noReport:false, displayname:"",dayidx:0, day:"", high:"", low:"", precipChance:"", humid:"", wind:"",windspeed:"", icon:""
  }, healthPollen: {noReport:false, displayname:"", total:"", totalcat:"", date:"", types:[
    {type:"tree", treetype:"", pollenidx:""},
    {type:"grass", pollenidx:""},
    {type:"weed", pollenidx:""},
    {type:"mold", pollenidx:""},
  ]}, healthAcheBreath: {noReport:false, date:"",achesindex:"",achescat:"",breathindex:"",breathcat:""
  },  airquality: {noReport:false, date:"",ozoneactin: false, primarypolute:"", airqualityindex:""
  },  uvindex: {noReport:false, currentuv:{index:"",desc:""},forecast:[
    {day:"",time:"",index:"",desc:""},
    {day:"",time:"",index:"",desc:""},
    {day:"",time:"",index:"",desc:""}
  ]}, airport: {noReport: false, mainairports:[
    {displayname:"",iata:"MSP",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""},
    {displayname:"",iata:"RST",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""}
  ], delays: [],
    //{iato:"",type:"",amount:"",amountmin:"",reason:""}
   otherairports:[
    {displayname:"New York / LaGaurdia",iata:"LGA",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Chicago O'hare Int'l",iata:"ORD",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Los Angeles Int'l",iata:"LAX",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Atlanta International",iata:"LAX",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Dallas / Ft. Worth Int'l",iata:"DFW",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Denver International",iata:"DEN",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Boston / Logan Int'l",iata:"BOS",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Salt Lake City Int'l",iata:"SLC",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Miami International",iata:"MIA",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Phoenix / Sky Harbor",iata:"PHX",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Minneapolis - St. Paul",iata:"MSP",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Washington Dulles Int'l",iata:"IAD",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"San Francisco Int'l",iata:"SFO",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Philadelphia Int'l",iata:"PHL",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Seattle - Tacoma Int'l",iata:"SEA",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Lambert - St. Louis Int'l",iata:"STL",delay:"No Delay",temp:"",icon:"",windspeed:""},
  ]},
  ccticker: {noReportCC:false,noReportFC:false,noReportAC:false,arrow:"",ccLocs:[],ccairportdelays:[]},
  radarTempUnavialable: false,
  radarWinterLegend: false,
  reboot: false,
  ad: "With Comcast Spotlight, utilize the impact of interactive advertising. Specifically target areas of Minneapolis on TV with commercials on networks like ESPN and TNT - and on the internet at XFINITY.com and FoxNews.com. For your custom advertising solution, call 244-2122."
}

//start data functions. these are run after their respective location functions finish
function grabCity8SlidesData() {
  weatherInfo.currentCond.city8slide = [];
  var url = "https://api.weather.com/v3/aggcommon/v3-wx-observations-current?geocodes="
  citySlideList.forEach((loc, i) => {
    url += `${loc.lat},${loc.lon};`
  });
  url += "&language=en-US&units=e&format=json&apiKey=" + api_key

  $.getJSON(url, function(data) {
    data.forEach((ajaxedLoc, i) => {
      var city8sldieslocs = {displayname:"",temp:"",icon:"",wind:"",windspeed:""}
      city8sldieslocs.temp = ajaxedLoc["v3-wx-observations-current"].temperature
      city8sldieslocs.icon = ajaxedLoc["v3-wx-observations-current"].iconCode
      city8sldieslocs.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'Calm' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal) + ' ' + ((ajaxedLoc["v3-wx-observations-current"].windSpeed === 0) ? '' : ajaxedLoc["v3-wx-observations-current"].windSpeed)
      city8sldieslocs.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
      city8sldieslocs.displayname = (citySlideList[i].displayname)
      weatherInfo.currentCond.city8slides.cities.push(city8sldieslocs)
    });
  });
}
function grabCitySlidesData() {
  console.log("grabbed city data")
  weatherInfo.currentCond.weatherLocs = [];
  weatherInfo.dayPart.weatherLocs = [];
  weatherInfo.dayDesc.weatherLocs = [];
  weatherInfo.fiveDay.weatherLocs = [];
  weatherInfo.bulletin.weatherLocs = [];
  var url = "https://api.weather.com/v3/aggcommon/v3alertsHeadlines;v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-wx-forecast-hourly-2day?geocodes="
  url += `${maincitycoords.lat},${maincitycoords.lon};`
  locList.forEach((loc, i) => {
    url += `${loc.lat},${loc.lon};`
  });
  url += "&language=en-US&units=e&format=json&apiKey=" + api_key

  $.getJSON(url, function(data) {
    data.forEach((ajaxedLoc, i) => {
        //Extra locations

        var weatherLocscc = {noReport:false,displayname:"",temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""}}
        weatherLocscc.temp = ajaxedLoc["v3-wx-observations-current"].temperature
        weatherLocscc.cond = ajaxedLoc["v3-wx-observations-current"].wxPhraseLong
        weatherLocscc.icon = ajaxedLoc["v3-wx-observations-current"].iconCode
        weatherLocscc.humid = ajaxedLoc["v3-wx-observations-current"].relativeHumidity
        weatherLocscc.dewpt = ajaxedLoc["v3-wx-observations-current"].temperatureDewPoint
        weatherLocscc.pressure = (ajaxedLoc["v3-wx-observations-current"].pressureAltimeter).toFixed(2)
        weatherLocscc.pressureTrend = ((ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 1 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 3) ? '↑' : (ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 2 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 4) ? '↓' : ' S')
        weatherLocscc.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'calm' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal) + ' ' + ((ajaxedLoc["v3-wx-observations-current"].windSpeed === 0) ? '' : ajaxedLoc["v3-wx-observations-current"].windSpeed)
        weatherLocscc.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
        weatherLocscc.gust = ((ajaxedLoc["v3-wx-observations-current"].windGust!=undefined) ? ajaxedLoc["v3-wx-observations-current"].windGust + " mph": "none")
        weatherLocscc.feelslike.type = ((ajaxedLoc["v3-wx-observations-current"].temperature != ajaxedLoc["v3-wx-observations-current"].temperatureHeatIndex) ? "Heat Index" : ((ajaxedLoc["v3-wx-observations-current"].temperatureWindChill != ajaxedLoc["v3-wx-observations-current"].temperature) ? "Wind Chill" : "dontdisplay"))
        weatherLocscc.feelslike.val = ajaxedLoc["v3-wx-observations-current"].temperatureFeelsLike
        weatherLocscc.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
        weatherInfo.currentCond.weatherLocs.push(weatherLocscc)
        //day part
        //functions converting hourly data into daypart
        var indexes = calcHourlyReport(ajaxedLoc["v3-wx-forecast-hourly-2day"]);
        function buildHourlyTimeTitle(time){
          var hour=dateFns.getHours(time);
          if (hour===0) {
            return 'Midnight';
          } else if (hour===12){
            return 'Noon';
          }
          return (dateFns.format(time,'h a')).replace(" ", "");
        }
        //get reporting hours: 12am, 6am, 12pm, 3pm, 5pm, 8pm...
        function calcHourlyReport(data) {
          var ret = [],
            targets = [0, 6, 12, 15, 17, 20],   // hours that we report
            current = dateFns.getHours(new Date()),
            now = new Date(),
            //firsthour = targets[ getNextHighestIndex(targets, current) ],
            start,
            hour, hi=0;

            switch (true) {
              case (current < 3):
                start = 6; //before 3:00
              case (current < 9):
                start = 12; break; //before 9:00 after 3:00
              case (current < 12):
                start = 15; break; //before 12:00 after 9:00
              case (current < 14):
                start = 17; break; //before 2:00 after 12:00
              case (current < 17):
                start = 6; break; //before 5:00 after 2:00
              case (current < 20):
                  start = 6; break; //before 8:00 after 5:00
              default:
                start = 6;
            }
          while(ret.length<4){
            // hour must be equal or greater than current
            hour = dateFns.getHours(data.validTimeLocal[hi] );
            if ( dateFns.isAfter(data.validTimeLocal[hi], now) && (hour==start || ret.length>0) )  {
              if ( targets.indexOf(hour)>=0 ) { // it is in our target list so record its index
                ret.push(hi);
              }
            }
            hi++;
          }
          return ret;
        }
        function buildHourlyHeaderTitle(time) {
          var today = new Date(),
            tomorrow = dateFns.addDays(today, 1);

          // title based on the first hour reported
          switch (dateFns.getHours(time)) {

          case 6: // 6 - Nextday's Forecast / Today's Forecast
            // if 6am today
            if (dateFns.isToday(time)) {
              return "Today's Forecast";
            }
            case 0: // 0 - Nextday's Forecast
              return "Tomorrow's Forecast";

            case 12:
              return "Today's Forecast";

            case 15:
              return "Today's Forecast";

            case 17:
              return "Tonight's Forecast";

            case 20:
              return "Tonight's Forecast"
          }
        }

        var weatherLocsDP = {noReport:false,displayname:"",daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]};
        weatherLocsDP.daytitle = buildHourlyHeaderTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[0]])
        for (var hi = 0; hi < 4; hi++) {
          weatherLocsDP.hour[hi].time = buildHourlyTimeTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[hi]])
          weatherLocsDP.hour[hi].cond = ajaxedLoc["v3-wx-forecast-hourly-2day"].wxPhraseLong[indexes[hi]].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers").replace('/',', ');
          weatherLocsDP.hour[hi].icon = ajaxedLoc["v3-wx-forecast-hourly-2day"].iconCode[indexes[hi]]
          weatherLocsDP.hour[hi].temp = ajaxedLoc["v3-wx-forecast-hourly-2day"].temperature[indexes[hi]]
          weatherLocsDP.hour[hi].wind = ajaxedLoc["v3-wx-forecast-hourly-2day"].windDirectionCardinal[indexes[hi]] + ' ' + ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
          weatherLocsDP.hour[hi].windspeed= ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
        }
        weatherLocsDP.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
        weatherInfo.dayPart.weatherLocs.push(weatherLocsDP)
        //daydesc
        var weatherLocsDD = {noReport:false,displayname:"",day:[{name:"",desc:""},{name:"",desc:""},{name:"",desc:""},{name:"",desc:""}]}
        var daycorrection = 0;
        if (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) {
          daycorrection = 1;
        }
        for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0; hi < 4 + daycorrection; hi++) {
          weatherLocsDD.day[hi - daycorrection].name = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[hi].replace('Tomorrow', ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[1]))
          weatherLocsDD.day[hi - daycorrection].desc = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi] + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] : '') + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi - daycorrection] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi] : '')
        }
        weatherLocsDD.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
        weatherInfo.dayDesc.weatherLocs.push(weatherLocsDD)
        //fiveday
        var weatherLocsFD = {noReport:false,displayname:"",day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""}]};
        for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0, hidp = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 2 : 0; hi < 5 + daycorrection; hi++, hidp = hidp + 2) {
          weatherLocsFD.day[hi - daycorrection].name = ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[hi].substring(0,3)
          weatherLocsFD.day[hi - daycorrection].icon = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].iconCode[hidp]
          weatherLocsFD.day[hi - daycorrection].cond = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseLong[hidp].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers").replace('/',', ');
          weatherLocsFD.day[hi - daycorrection].high = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[hi]
          weatherLocsFD.day[hi - daycorrection].windspeed = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windSpeed[hidp]
          weatherLocsFD.day[hi - daycorrection].low = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[hi]
        }
        weatherLocsFD.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
        weatherInfo.fiveDay.weatherLocs.push(weatherLocsFD)
        //bulletin
        var weatherLocsWA = {displayname:"",pages:[],enabled: false};
        weatherLocsWA.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
        if (ajaxedLoc["v3alertsHeadlines"] != undefined){
          var displayday;
          var bulletintext = "";
          var ret = [];
    			var ai=0;
    			//info
    			//get only weather alers
    			for (ai=0; ai<=ajaxedLoc["v3alertsHeadlines"].alerts.length - 1; ai++) {
    				warning = ajaxedLoc["v3alertsHeadlines"].alerts[ai].categories[0].category;
    				if ((warning == "Met" && weatherInfo.bulletin.includesevereonbulletin == true) || (warning == "Met" && i != 0) || (warning == "Met" && ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription != "Severe Thunderstorm Warning" && ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Flash Flood Warning" != ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription != "Tornado Warning"))  {
    					ret.push({idx:ai, priority: getWarningPosition(ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription)})
    				}
    			};
    			if (ret.length != 0) {
    				ret.sort(function(a,b) {return a.priority - b.priority;});

          for (ai of ret) {
            var icount = 0;
            getexpiredate = function(expiretime) {
              dateFns.format(new Date(expiretime), "h:mm");
              if (dateFns.isToday(expiretime) != true) {
                var numday = dateFns.getDay(expiretime);
                displayday = {"0":"SUN","1":"MON","2":"TUE","3":"WED","4":"THU","5":"FRI","6":"SAT"}[numday] + ".";
              } else {
                displayday = "Today."
              }
              return dateFns.format(new Date(expiretime), "h:mm A ") + displayday
            }
            if (icount != ret.length - 1) {
              bulletintext += ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].eventDescription + " in effect until " + (getexpiredate(ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].expireTimeLocal) + "\n \n")
            } else {
              bulletintext += ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].eventDescription + " in effect until " + (getexpiredate(ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].expireTimeLocal) + "\n \n")
            }
            var icount = icount + 1;
          }

          function splitLines() {

             var warningsplitstr = bulletintext.split(/(?![^\n]{1,40}$)([^\n]{1,40})\s/g)
             warningsplitstr.pop()
             warningsplitstr.pop()
             var warningpageidx = 0;
             var warninglineidx = 0;
             warningsplitstr.forEach(warningline => {
              if (warningline != "") {
                if (warninglineidx == 0) {
                  weatherLocsWA.pages[warningpageidx] = ""
                }
              weatherLocsWA.pages[warningpageidx] += (warningline + '<br>')
              warninglineidx += 1;
              if (warninglineidx == 7) {
                warningpageidx += 1
                warninglineidx = 0
              }
            }
          });
          }
          splitLines()
          weatherLocsWA.enabled = true
          weatherInfo.bulletin.weatherLocs.push(weatherLocsWA)
        }
      } else {weatherInfo.bulletin.weatherLocs.push(weatherLocsWA)}
    });
  })
}

function grabSideandLowerBarData() {
  weatherInfo.bulletin.marqueewarnings = [];
  weatherInfo.bulletin.severewarnings = [];
  var url = "https://api.weather.com/v3/aggcommon/v3alertsHeadlines;v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-wx-forecast-hourly-2day?geocodes="
  url += `${maincitycoords.lat},${maincitycoords.lon};`
  url += "&language=en-US&units=e&format=json&apiKey=" + api_key

  $.getJSON(url, function(data) {
        //Extra locations
        var ajaxedLoc = data[0]
        weatherInfo.currentCond.sidebar.temp = ajaxedLoc["v3-wx-observations-current"].temperature
        weatherInfo.currentCond.sidebar.cond = ajaxedLoc["v3-wx-observations-current"].wxPhraseLong
        weatherInfo.currentCond.sidebar.icon = ajaxedLoc["v3-wx-observations-current"].iconCode
        weatherInfo.currentCond.sidebar.humid = ajaxedLoc["v3-wx-observations-current"].relativeHumidity
        weatherInfo.currentCond.sidebar.dewpt = ajaxedLoc["v3-wx-observations-current"].temperatureDewPoint
        weatherInfo.currentCond.sidebar.pressure = (ajaxedLoc["v3-wx-observations-current"].pressureAltimeter).toFixed(2)
        weatherInfo.currentCond.sidebar.pressureTrend = ((ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 1 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 3) ? '↑' : (ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 2 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 4) ? '↓' : ' S')
        weatherInfo.currentCond.sidebar.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'calm' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal) + ' ' + ((ajaxedLoc["v3-wx-observations-current"].windSpeed === 0) ? '' : ajaxedLoc["v3-wx-observations-current"].windSpeed)
        weatherInfo.currentCond.sidebar.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
        weatherInfo.currentCond.sidebar.gust = ((ajaxedLoc["v3-wx-observations-current"].windGust!=undefined) ? ajaxedLoc["v3-wx-observations-current"].windGust + " mph" : "none")
        weatherInfo.currentCond.sidebar.visibility = ajaxedLoc["v3-wx-observations-current"].visibility
        weatherInfo.currentCond.sidebar.uvidx = ajaxedLoc["v3-wx-observations-current"].uvDescription
        weatherInfo.currentCond.sidebar.ceiling = ajaxedLoc["v3-wx-observations-current"].cloudCeiling
        weatherInfo.currentCond.sidebar.feelslike.type = ((ajaxedLoc["v3-wx-observations-current"].temperature != ajaxedLoc["v3-wx-observations-current"].temperatureHeatIndex) ? "heat index" : ((ajaxedLoc["v3-wx-observations-current"].temperatureWindChill != ajaxedLoc["v3-wx-observations-current"].temperature) ? "wind chill" : "dontdisplay"))
        weatherInfo.currentCond.sidebar.feelslike.val = ajaxedLoc["v3-wx-observations-current"].temperatureFeelsLike
        weatherInfo.currentCond.sidebar.displayname = maincitycoords.displayname
        //day part
        //functions converting hourly data into daypart
        var indexes = calcHourlyReport(ajaxedLoc["v3-wx-forecast-hourly-2day"]);
        function buildHourlyTimeTitle(time){
          var hour=dateFns.getHours(time);
          if (hour===0) {
            return 'Midnight';
          } else if (hour===12){
            return 'Noon';
          }
          return (dateFns.format(time,'h a'))//.replace(" ", "");
        }
        //get reporting hours: 12am, 6am, 12pm, 3pm, 5pm, 8pm...
        function calcHourlyReport(data) {
          var ret = [],
            targets = [0, 6, 12, 15, 17, 20],   // hours that we report
            current = dateFns.getHours(new Date()),
            now = new Date(),
            //firsthour = targets[ getNextHighestIndex(targets, current) ],
            start,
            hour, hi=0;

          switch (true) {
            case (current < 3):
              start = 6; //before 3:00
            case (current < 9):
              start = 12; break; //before 9:00 after 3:00
            case (current < 12):
              start = 15; break; //before 12:00 after 9:00
            case (current < 14):
              start = 17; break; //before 2:00 after 12:00
            case (current < 17):
              start = 20; break; //before 5:00 after 2:00
            case (current < 20):
                start = 0; break; //before 8:00 after 5:00
            default:
              start = 6;
          }
          while(ret.length<4){
            // hour must be equal or greater than current
            hour = dateFns.getHours(data.validTimeLocal[hi] );
            if ( dateFns.isAfter(data.validTimeLocal[hi], now) && (hour==start || ret.length>0) )  {
              if ( targets.indexOf(hour)>=0 ) { // it is in our target list so record its index
                ret.push(hi);
              }
            }
            hi++;
          }
          return ret;
        }
        function buildHourlyHeaderTitle(time) {
          var today = new Date(),
            tomorrow = dateFns.addDays(today, 1);
            sforecast = "'s Forecast";

          // title based on the first hour reported
          switch (dateFns.getHours(time)) {

            case 6: // 6 - Nextday's Forecast / Today's Forecast
          		// if 6am today
          		if (dateFns.isToday(time)) {
          			return dateFns.format(today, 'dddd') + sforecast;
          		}
          	case 0: // 0 - Nextday's Forecast
          		return dateFns.format(tomorrow, 'dddd') + sforecast;

          	case 12:
          		return 'This Afternoon';

          	case 15:
          		return "Today's Forecast";

          	case 17:
          		return "Tonight's Forecast";

          	case 20:
          		return dateFns.format(today, 'ddd') + ' Night/' + dateFns.format(tomorrow, 'ddd');

          }
        }

        weatherInfo.dayPart.lowerbar.daytitle = buildHourlyHeaderTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[0]])
        for (var hi = 0; hi < 4; hi++) {
          weatherInfo.dayPart.lowerbar.hour[hi].time = buildHourlyTimeTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[hi]])
          weatherInfo.dayPart.lowerbar.hour[hi].cond = ajaxedLoc["v3-wx-forecast-hourly-2day"].wxPhraseLong[indexes[hi]].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers").replace('/',', ')
          weatherInfo.dayPart.lowerbar.hour[hi].icon = ajaxedLoc["v3-wx-forecast-hourly-2day"].iconCode[indexes[hi]]
          weatherInfo.dayPart.lowerbar.hour[hi].temp = ajaxedLoc["v3-wx-forecast-hourly-2day"].temperature[indexes[hi]]
          weatherInfo.dayPart.lowerbar.hour[hi].wind = ajaxedLoc["v3-wx-forecast-hourly-2day"].windDirectionCardinal[indexes[hi]] + ' ' + ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
          weatherInfo.dayPart.lowerbar.hour[hi].windspeed= ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
        }
        weatherInfo.dayPart.lowerbar.displayname = maincitycoords.displayname
        //daydesc
        var daycorrection = 0;
        if (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) {
          daycorrection = 1;
        }
        for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0; hi < 4 + daycorrection; hi++) {
          weatherInfo.dayDesc.lowerbar.day[hi - daycorrection].name = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[hi].replace('Tomorrow', ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[1]))
          weatherInfo.dayDesc.lowerbar.day[hi - daycorrection].desc = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi] + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] : '') + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi - daycorrection] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi] : '')
        }
        weatherInfo.dayDesc.lowerbar.displayname =  maincitycoords.displayname
        //fiveday
        var weatherLocsFD = {displayname:"",day:[{name:"",cond:"",icon:"",high:"",low:""},{name:"",cond:"",icon:"",high:"",low:""},{name:"",cond:"",icon:"",high:"",low:""},{name:"",cond:"",icon:"",high:"",low:""},{name:"",cond:"",icon:"",high:"",low:""}]};
        for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0, hidp = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 2 : 0; hi < 5 + daycorrection; hi++, hidp = hidp + 2) {
          weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].name = ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[hi].substring(0,3)
          weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].windspeed = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windSpeed[hidp]
          weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].icon = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].iconCode[hidp]
          weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].cond = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseLong[hidp].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers").replace('/',', ');
          weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].high = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[hi]
          weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].low = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[hi]
          weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].weekend = ((dateFns.isWeekend(ajaxedLoc["v3-wx-forecast-daily-5day"].validTimeLocal[hi])) ? ' weekend' : '')
        }
        weatherInfo.fiveDay.lowerbar.displayname =  maincitycoords.displayname

        //bulletin
        if (ajaxedLoc["v3alertsHeadlines"] != undefined){
          var displayday;
          var bulletintext = "";
          var ret = [], sret = [];
    			var ai=0;
    			//info
    			//get only weather alers
          for (ai=0; ai<=ajaxedLoc["v3alertsHeadlines"].alerts.length - 1; ai++) {
    				warning = ajaxedLoc["v3alertsHeadlines"].alerts[ai].categories[0].category;
    				if (warning == "Met")  {
    					ret.push({idx:ai, priority: getWarningPosition(ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription)})
    					if (ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Severe Thunderstorm Warning" || ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Flash Flood Warning" || ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Tornado Warning") {
    						sret.push({idx:ai, priority:ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription})
    					}
    				}
    			};
    			if (ret.length != 0) {
    				ret.sort(function(a,b) {return a.priority - b.priority;});
              function pushAlert(aai) {
                $.getJSON('https://api.weather.com/v3/alerts/detail?alertId='+ ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].detailKey +'&format=json&language=en-US&apiKey=' + api_key, function(adata) {
                  var alertt = {name:"", desc:"", status:"", significance:""}
                  alertt.name = ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].eventDescription
                  alertt.significance = ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].significance
                  alertt.status = ((ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].messageType == " Update") ? 'UPDATE' : (ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].messageType == "Cancel") ? "CANCELLATION" : "")
                  alertt.desc = adata.alertDetail.texts[0].description
                  weatherInfo.bulletin.marqueewarnings.push(alertt)
                  if (aai < (ret.length - 1)) {pushAlert(aai + 1)};
                });
              };
              pushAlert(0)
            }

            if (sret.length != 0) {
              weatherInfo.bulletin.severeweathermode = true;
      				sret.sort(function(a,b) {return a.priority - b.priority;});
              function pushSevereAlert(aai) {
                $.getJSON('https://api.weather.com/v3/alerts/detail?alertId='+ ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].detailKey +'&format=json&language=en-US&apiKey=' + api_key, function(sdata) {
                  var severewarn = {warningname:"", warningdesc:"", warningstatus:""}
                  severewarn.warningname = ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].eventDescription
                  severewarn.warningstatus = ((ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].messageType == "Update") ? 'UPDATE' : (ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].messageType == "Cancel") ? "CANCELLATION" : "")
                  severewarn.warningdesc = sdata.alertDetail.texts[0].description
                  weatherInfo.bulletin.severewarnings.push(severewarn)
                  if (aai < (sret.length - 1)) {pushSevereAlert(aai + 1)};
                });
              };
              pushSevereAlert(0)
            }
  };

});
}
function grabAlamanacSlidesData() {
  url = 'https://api.weather.com/v3/aggcommon/v3-wx-almanac-daily-1day;v3-wx-observations-current?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&format=json&language=en-US&units=e" + "&day=" + dateFns.format(new Date(), "D") + "&month=" + dateFns.format(new Date(),"M") + "&apiKey=" + api_key
    $.getJSON(url, function(data) {
      weatherInfo.alamanac.displayname = maincitycoords.displayname
      weatherInfo.alamanac.date = dateFns.format(new Date(),"MMMM D")
      weatherInfo.alamanac.avghigh = data["v3-wx-almanac-daily-1day"].temperatureAverageMax[0]
      weatherInfo.alamanac.avglow = data["v3-wx-almanac-daily-1day"].temperatureAverageMin[0]
      weatherInfo.alamanac.rechigh = data["v3-wx-almanac-daily-1day"].temperatureRecordMax[0]
      weatherInfo.alamanac.reclow = data["v3-wx-almanac-daily-1day"].temperatureRecordMin[0]
      weatherInfo.alamanac.rechighyear = data["v3-wx-almanac-daily-1day"].almanacRecordYearMax[0]
      weatherInfo.alamanac.reclowyear = data["v3-wx-almanac-daily-1day"].almanacRecordYearMin[0]
      weatherInfo.alamanac.sunset = dateFns.format(new Date(data["v3-wx-observations-current"].sunsetTimeLocal),"h:mm a")
      weatherInfo.alamanac.sunrise = dateFns.format(new Date(data["v3-wx-observations-current"].sunriseTimeLocal),"h:mm a")
    });
}
function grabHealthData() {
  $.getJSON('https://api.weather.com/v3/wx/forecast/daily/5day?geocode='+ maincitycoords.lat + ',' + maincitycoords.lon +"&format=json&language=en-US&units=e&apiKey=" + api_key, function(data) {
    var healthforecastdata = data
    var starthidx = 0;
    var starthidxdayonly = 0;
    if (healthforecastdata.daypart[0].daypartName[0] == undefined) {
      starthidx = 2;
      starthidxdayonly = 1;
      weatherInfo.healthforecast.dayidx = 2;
    }
    weatherInfo.healthforecast.displayname = maincitycoords.displayname
    weatherInfo.healthforecast.day = healthforecastdata.dayOfWeek[starthidxdayonly];
    weatherInfo.healthforecast.icon = healthforecastdata.daypart[0].iconCode[starthidx]
    weatherInfo.healthforecast.high = healthforecastdata.temperatureMax[starthidxdayonly]
    weatherInfo.healthforecast.low = healthforecastdata.temperatureMin[starthidxdayonly]
    weatherInfo.healthforecast.precipChance = healthforecastdata.daypart[0].precipChance[starthidx] + '%'
    weatherInfo.healthforecast.humid = healthforecastdata.daypart[0].relativeHumidity[starthidx] + '%'
    weatherInfo.healthforecast.wind = (((healthforecastdata.daypart[0].windDirectionCardinal[starthidx] == "CALM") ? 'calm' :  healthforecastdata.daypart[0].windDirectionCardinal[starthidx]) + ' ' + ((healthforecastdata.daypart[0].windSpeed[starthidx] === 0) ? '' : healthforecastdata.daypart[0].windSpeed[starthidx]))
    weatherInfo.healthforecast.windspeed = healthforecastdata.daypart[0].windSpeed[starthidx]
  });
  $.getJSON('https://api.weather.com/v1/geocode/'+ maincitycoords.lat + '/' + maincitycoords.lon + '/observations/pollen.json?language=en-US&apiKey=' + api_key, function(pollendata) {
    if (pollendata.pollenobservations !== undefined) {
    if (pollendata.pollenobservations[0].stn_cmnt != "No Report" && pollendata.pollenobservations[0].stn_cmnt != "Equipment Failure" && pollendata.pollenobservations[0].stn_cmnt != "Reports only during weed pollen season" && pollendata.pollenobservations[0].stn_cmnt != "Does not report year round" && pollendata.pollenobservations[0].stn_cmnt != "Reports Suspended") {
      if (pollendata.pollenobservations[0].total_pollen_cnt <= 9) {
        weatherInfo.healthPollen.totalcat = 'Low'
      } else if (pollendata.pollenobservations[0].total_pollen_cnt >= 10 && pollendata.pollenobservations[0].total_pollen_cnt <= 49) {
        weatherInfo.healthPollen.totalcat = 'Moderate'
      } else if (pollendata.pollenobservations[0].total_pollen_cnt >= 50 && pollendata.pollenobservations[0].total_pollen_cnt <= 499) {
        weatherInfo.healthPollen.totalcat = 'High'
      } else if (pollendata.pollenobservations[0].total_pollen_cnt >= 500) {
        weatherInfo.healthPollen.totalcat = 'Very High'
      };
        weatherInfo.healthPollen.total = pollendata.pollenobservations[0].total_pollen_cnt
        weatherInfo.healthPollen.types[0].treetype = ((pollendata.pollenobservations[0].treenames[0].tree_nm != "No Report") ? pollendata.pollenobservations[0].treenames[0].tree_nm : "")
        weatherInfo.healthPollen.date = dateFns.format(new Date(pollendata.pollenobservations[0].rpt_dt), "MMMM D")
        var pollentypes = ['tree', 'grass', 'weed', 'mold'];
        pollentypes.forEach((pollentype, i) => {
          weatherInfo.healthPollen.types[i].pollenidx = pollendata.pollenobservations[0].pollenobservation[i].pollen_idx
        });
    }
    }
  });
  $.getJSON('https://api.weather.com/v2/indices/achePain/daypart/3day?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
    var achesindexdata = data
    var startidx = 0;
    if (achesindexdata.achesPainsIndex12hour.dayInd[0] == 'N') {
      startidx = 1;
    }
    weatherInfo.healthAcheBreath.achesindex = achesindexdata.achesPainsIndex12hour.achesPainsIndex[startidx]
    weatherInfo.healthAcheBreath.achescat = achesindexdata.achesPainsIndex12hour.achesPainsCategory[startidx]
    weatherInfo.healthAcheBreath.date = dateFns.format(new Date(achesindexdata.achesPainsIndex12hour.fcstValidLocal[0]), "dddd")
  });
  $.getJSON('https://api.weather.com/v2/indices/breathing/daypart/3day?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
    var breathindexdata = data
    var startidx = 0;
    if (breathindexdata.breathingIndex12hour.dayInd[0] == 'N') {
      startidx = 1;
    }
    weatherInfo.healthAcheBreath.breathindex = breathindexdata.breathingIndex12hour.breathingIndex[startidx]
    weatherInfo.healthAcheBreath.breathcat = breathindexdata.breathingIndex12hour.breathingCategory[startidx]
  });
  $.getJSON('https://api.weather.com/v3/wx/globalAirQuality?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&scale=EPA&format=json&apiKey=" + api_key, function(data) {
    var airqualitydata = data
    weatherInfo.airquality.airqualityindex = airqualitydata.globalairquality.airQualityCategoryIndex
    weatherInfo.airquality.primarypolute = (airqualitydata.globalairquality.primaryPollutant).replace('PM10','Fine Particulate').replace('PM2.5','Fine Particulate').replace('O3','Ozone')
    weatherInfo.airquality.date = dateFns.format(new Date(airqualitydata.globalairquality.expireTimeGmt * 1000), "dddd")
  });
  $.getJSON('https://api.weather.com/v2/indices/uv/current?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
    var uvData = data
    weatherInfo.uvindex.currentuv.index = uvData.uvIndexCurrent.uvIndex
    weatherInfo.uvindex.currentuv.desc = uvData.uvIndexCurrent.uvDesc
  });
  $.getJSON('https://api.weather.com/v2/indices/uv/hourly/48hour?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
    var uvData = data
    var indexes = calcHourlyReport(uvData.uvIndex1hour);
    var i;
    for (var i = 0; i < 3; i++) {
      weatherInfo.uvindex.forecast[i].day = dateFns.format(new Date(uvData.uvIndex1hour.fcstValidLocal[indexes[i]]), 'ddd')
      weatherInfo.uvindex.forecast[i].time = buildHourlyTimeTitle(uvData.uvIndex1hour.fcstValidLocal[indexes[i]])
      weatherInfo.uvindex.forecast[i].index = uvData.uvIndex1hour.uvIndex[indexes[i]]
      weatherInfo.uvindex.forecast[i].desc = uvData.uvIndex1hour.uvDesc[indexes[i]]
    }

    //get reporting hours: 6am, 12pm, 3pm
    function buildHourlyTimeTitle(time){
      var hour=dateFns.getHours(time);
      return (dateFns.format(time,'h a')).replace(" ", "");
    }
    function calcHourlyReport(data) {
      var hret = [],
        targets = [9, 12, 15],   // hours that we report
        current = dateFns.getHours(new Date()),
        now = new Date(),
        //firsthour = targets[ getNextHighestIndex(targets, current) ],
        start,
        hour, i=0;
      switch (true) {
        case (current < 6):
          start = 9;
        case (current < 9):
          start = 12; break;
        case (current < 12):
          start = 15; break;
        case (current < 13):
          start = 9; break;
        default:
          start = 9;
      }
      while(hret.length<3){

        // hour must be equal or greater than current
        hour = dateFns.getHours(data.fcstValidLocal[i] );
        if ( dateFns.isAfter(data.fcstValidLocal[i], now) && (hour==start || hret.length>0) )  {

          if ( targets.indexOf(hour)>=0 ) { // it is in our target list so record its index
            hret.push(i);
          }

        }
        i++;
      }
      return hret;
    }
  })
}
function grabAirportDelayData() {
    $.getJSON('http://127.0.0.1:8081/https://nasstatus.faa.gov/api/airport-events', function(eventdata) {
      for (const airportevent of eventdata) {
        var airportdelay = {iata:"",type:"",amount:"",reason:""}
        if (airportevent.airportClosure) {
          airportdelay.iata = airportevent.airportId
          airportdelay.type = 'Closure'
          airportdelay.amount = 'Closed'
          airportdelay.amountmin = 99999999999999999999999999999999999999999999999999
          airportdelay.reason = ''
          weatherInfo.airport.delays.push(airportdelay)
        }
        if (airportevent.arrivalDelay) {
          airportdelay.iata = airportevent.airportId
          airportdelay.type = 'Arrival'
          airportdelay.amount = formatMinutes(airportevent.arrivalDelay.averageDelay)
          airportdelay.amountmin = airportevent.departureDelay.averageDelay
          airportdelay.reason = airportevent.arrivalDelay.reason
          weatherInfo.airport.delays.push(airportdelay)
        }
        if (airportevent.departureDelay) {
          airportdelay.iata = airportevent.airportId
          airportdelay.type = 'Departure'
          airportdelay.amount = formatMinutes(airportevent.departureDelay.averageDelay)
          airportdelay.amountmin = airportevent.departureDelay.averageDelay
          airportdelay.reason = airportevent.departureDelay.reason
          weatherInfo.airport.delays.push(airportdelay)
        }
        if (airportevent.groundDelay) {
          airportdelay.iata = airportevent.airportId
          airportdelay.type = 'Arrival'
          airportdelay.amount = formatMinutes(airportevent.groundDelay.avgDelay)
          airportdelay.amountmin = airportevent.groundDelay.avgDelay
          airportdelay.reason = airportevent.groundDelay.impactingCondition
          weatherInfo.airport.delays.push(airportdelay)
        }
        if (airportevent.groundStop) {
          airportdelay.iata = airportevent.airportId
          airportdelay.type = 'Arrival'
          airportdelay.amount = 'until...'
          airportdelay.reason = airportevent.groundStop.impactingCondition
          weatherInfo.airport.delays.push(airportdelay)
        }
      };
      grabAirportData()
    })
}
grabAirportDelayData()
function grabAirportData() {
  var mairporturl = 'https://api.weather.com/v3/aggcommon/v3-location-point;v3-wx-observations-current?iataCodes='
  for (var i = 0; i < weatherInfo.airport.mainairports.length; i++) {
    mairporturl += weatherInfo.airport.mainairports[i].iata + ';'
  }
  mairporturl += '&language=en-US&units=e&format=json&apiKey='+ api_key
  //{displayname:"New York / LaGaurdia",iata:"LGA",delay:"No Delay",temp:""}
  $.getJSON(mairporturl, function(data) {
    data.forEach((airport, i) => {
      var marqueedelay = {iato:"",type:"",amount:"",amountmin:0,reason:""};
      var airportdepartdelay = {iato:"",type:"",amount:"",amountmin:0,reason:""};
      var airportarrivaldelay = {iato:"",type:"",amount:"",amountmin:0,reason:""};
      var marqueeairport = {displayname:"",iata:"LGA",delay:"No Delay",temp:"",cond:""}
      weatherInfo.airport.mainairports[i].displayname = airport['v3-location-point'].location.airportName
      weatherInfo.airport.mainairports[i].temp = airport['v3-wx-observations-current'].temperature
      weatherInfo.airport.mainairports[i].cond = airport['v3-wx-observations-current'].wxPhraseLong
      weatherInfo.airport.mainairports[i].icon = airport['v3-wx-observations-current'].iconCode
      weatherInfo.airport.mainairports[i].windspeed = airport['v3-wx-observations-current'].windSpeed
      marqueeairport.displayname = airport['v3-location-point'].location.airportName
      marqueeairport.temp = airport['v3-wx-observations-current'].temperature
      marqueeairport.cond = airport['v3-wx-observations-current'].wxPhraseLong.toLowerCase();
      marqueeairport.iata = weatherInfo.airport.mainairports[i].iata
      for (const delay of weatherInfo.airport.delays) {
        if (delay.iata == weatherInfo.airport.mainairports[i].iata) {
          if (delay.amountmin > marqueedelay.amountmin) {
            marqueedelay = delay
            marqueeairport.delay = (delay.amount).replace('<em>','').replace('</em>','')
          }
          if (delay.type == 'Arrival') {
            if (delay.amountmin > airportarrivaldelay.amountmin) {
              airportarrivaldelay = delay
              weatherInfo.airport.mainairports[i].arrivals.delay = delay.amount
              weatherInfo.airport.mainairports[i].arrivals.reason = delay.reason
            }
          } else if (delay.type == 'Departure') {
            if (delay.amountmin > airportdepartdelay.amountmin) {
              airportdepartdelay = delay
              weatherInfo.airport.mainairports[i].departures.delay = delay.amount
              weatherInfo.airport.mainairports[i].departures.reason = delay.reason
            }
          } else if (delay.type == 'Closure'){
            airportdepartdelay = delay
            airportarrivaldelay = delay
            weatherInfo.airport.mainairports[i].arrivals.delay = 'Closed'
            weatherInfo.airport.mainairports[i].departures.delay = 'Closed'
          }
        }
      };
      weatherInfo.ccticker.ccairportdelays.push(marqueeairport)
    });
  });

  //otherairport
  var oairporturl = 'https://api.weather.com/v3/aggcommon/v3-wx-observations-current?iataCodes='
  for (var i = 0; i < weatherInfo.airport.otherairports.length; i++) {
    oairporturl += weatherInfo.airport.otherairports[i].iata + ';'
  }
  oairporturl += '&language=en-US&units=e&format=json&apiKey='+ api_key
  $.getJSON(oairporturl, function(data) {
    data.forEach((airport, i) => {
      var airportdelays = {iato:"",type:"",amount:"",amountmin:0,reason:""};
      weatherInfo.airport.otherairports[i].temp = airport['v3-wx-observations-current'].temperature
      weatherInfo.airport.otherairports[i].icon = airport['v3-wx-observations-current'].iconCode
      weatherInfo.airport.otherairports[i].windspeed = airport['v3-wx-observations-current'].windSpeed
      weatherInfo.airport.delays.forEach((delay, delayi) => {
        if (delay.iata == weatherInfo.airport.otherairports[i].iata) {
          if (delay.amountmin > airportdelays.amountmin) {
            airportdelays = delay
            weatherInfo.airport.otherairports[i].delay = delay.amount
          }
        }
      });
    });
  });
}

function pullCCTickerData() {
  var ccurl = 'https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-location-point?geocodes=';
  // ajax the latest observation
  if (ccTickerCitiesList.length != 0) {
    ccTickerCitiesList.forEach((loc, i) => {
      ccurl += `${loc.lat},${loc.lon};`
    });
    ccurl += '&language=en-US&units=e&format=json&apiKey='+ api_key
  } else {
    ccurl = 'https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-location-point?geocodes=41.881832,-87.623177;44.986656,-93.258133;33.427204,-111.939896;46.877186,-96.789803;34.187042,-118.381256;33.660057,-117.998970;36.114647,-115.172813;21.315603,-157.858093;28.538336,-81.379234;43.0,-75.0;&language=en-US&units=e&format=json&apiKey='+ api_key
  }
  weatherInfo.ccticker.ccLocs = [];
  $.getJSON(ccurl, function(data) {
        data.forEach((locationdata, i) => {
          var ccLoc = {displayname:"",currentCond:{cond:"",temp:""},forecast:{cond:"",temp:""}}
          var marqueeidx = 1;
          if (locationdata['v3-wx-forecast-daily-5day'].daypart[0].daypartName[0] == undefined) {marqueeidx = 2;};
          if (locationdata['v3-wx-forecast-daily-5day'].daypart[0].daypartName[marqueeidx] == "Tonight") {weatherInfo.ccticker.arrow = 'tonight';} else {weatherInfo.ccticker.arrow = (locationdata['v3-wx-forecast-daily-5day'].dayOfWeek[1].substring(0,3)).toLowerCase()};
          ccLoc.displayname = locationdata['v3-location-point'].location.displayName + ': '
          ccLoc.currentCond.temp = locationdata['v3-wx-observations-current'].temperature
          ccLoc.currentCond.cond = (locationdata['v3-wx-observations-current'].wxPhraseLong).toLowerCase()
          ccLoc.forecast.temp = locationdata['v3-wx-forecast-daily-5day'].daypart[0].temperature[marqueeidx]
          ccLoc.forecast.cond = (locationdata['v3-wx-forecast-daily-5day'].daypart[0].wxPhraseLong[marqueeidx]).toLowerCase()
          weatherInfo.ccticker.ccLocs.push(ccLoc)
        });

      });
  };
//loop data collection, slide loops data functions is done based on full cycle
setInterval(function(){
  grabSideandLowerBarData();
  pullCCTickerData();
}, 300000)

//init 1 second before intro stops
var loops, slides;
setTimeout(function() {
  loops = new Loops();
  slides = new Slides();
  MarqueeMan();
}, 4000)

function simulateReboot() {
  weatherInfo.reboot = true
  setTimeout(function () {
    $("#info-slides-bg").hide()
    $("#template").hide()
    $("#logo-area").hide()
    $("#marquee2").hide()
    setTimeout(function () {
      $("#info-slides-container").hide()
      $("#date-time").hide()
      $("#city").hide()
      $("#conditions-icon").hide()
      $("#current-conditions").hide()
      $("#minimap-title").hide()
      $("#minimap").hide()
    }, 250)
    setTimeout(function () {
      window.location.reload();
    }, (Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000))
  }, (Math.floor(Math.random() * (45000 - 30000 + 1)) + 30000))
}
