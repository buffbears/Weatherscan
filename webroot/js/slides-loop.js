/*

headings:
RADAR < MAIN CITY < CITY 1 < CITY 2
*/
var buildHeaderGlobal;
var showsevercityslides = false;
var mainMap
	// load slide data
	function Slides() {
		severemode = false;
		var radarSlideDuration = 60000,
			slideDelay = 10000;
						// for later
		var selectval = 0;

		buildHeader();
		setTimeout(function() {
			if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeOut(500)} else {$('.radar-color-legend').fadeOut(500)}
			$('.radar-content').fadeOut(500, function() {
				$('.radar-slide').fadeOut(0);
				nextCity()
			});
		}, 800);
		// loop cities
		function nextCity(){
			//severe weather mode
			if (weatherInfo.bulletin.severeweathermode == true) {
				$('.city-slide-intro .segment').text(location.city);
				$('#info-slides-header .hscroller').empty();
				$('#info-slides-header .hscroller').append("<span class='severe'>SEVERE WEATHER UPDATE</span>");

				$('#current-info').fadeOut(0)
				$('#current-info-severe').fadeIn(0)
				$('#current-info-details').fadeIn(0)
				loopssevereweathermode = true
				$('#minimap').fadeOut(0)
				$('#minimap-title').fadeOut(0)
				$('.radar-slide .info-subheader').css('background', 'linear-gradient(to top, #868686 0, #868686 100%)')
				displaySevereAtmospheric(0)
				showSevereSlides(0);
			} else {
				//non severe
			advanceHeader();

			var city = $('#info-slides-header .city.current');

			// is radar or city?
			if (city[0].dataset.dname) {
				// show slide deck for the current city
				showCitySlides(city[0].dataset.dname, 0 );

			} else {

				if (city[0].classList.contains("radar")) {
					showRadar(maincitycoords.lat, maincitycoords.lon, 8, 60000, false);
					setTimeout(nextCity, 60500);
				} else if (city[0].classList.contains("airport")) {
					showAirport(0);
				} else if (city[0].classList.contains("healthh")) {
					showHealth(0);
				} else if (city[0].classList.contains("beach")) {
					showMarine(0);
				}

			}
		}
		}

		function showSevereSlides(idx) {
			if (showsevercityslides == true) {
							var currentDisplay,
								displays = {
								showBulletin() {
										if (weatherInfo.bulletin.weatherLocs[0].enabled == true) {
										$('.bulletin .frost-pane .cityname').text(weatherInfo.bulletin.weatherLocs[0].displayname + " Area");
										//fade in
										$('.bulletin').fadeIn(0);
										$('.bulletin .frost-pane').fadeIn(500);

										$('#subhead-noaa').fadeIn(500);
										pages = weatherInfo.bulletin.weatherLocs[0].pages
										makewarningPage(0)
										function makewarningPage(warningpagenum) {
											if (warningpagenum > 0) {
												$('.bulletin .frost-pane').fadeOut(500, function() {
													$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
													$('.bulletin .frost-pane').fadeIn(500);
												});
											} else {
												$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
												$('.bulletin .frost-pane').fadeIn(500);
											}
											setTimeout(function() {
												if (warningpagenum < (pages.length - 1)) {
													makewarningPage(warningpagenum + 1)
												} else {
													$('.bulletin').fadeIn(0);
													$('.bulletin .frost-pane').fadeOut(500);
													$('#subhead-noaa').fadeOut(500, function() {
														$('.bulletin').fadeOut(0);
														wait(0)
													});
												}
											}, slideDelay);
										}
								} else {wait(0)};
								}

								// Currently (10 sec)
								,currentConditions() {
									$('.severe-city-info-slide .subhead-title').text('Currently');
									$('.severe-city-info-slide #subhead-city').text(weatherInfo.currentCond.weatherLocs[0].displayname);
									if (weatherInfo.currentCond.weatherLocs[0].noReport == true) {
										$('.severe-city-info-slide .noreport').fadeIn(500)
										$('.severe-city-info-slide').fadeIn(0);
										setTimeout(function() {
											$('.severe-city-info-slide .noreport').fadeOut(500, function(){
												$('.severe-city-info-slide').fadeOut(0);
												wait(0);
										});
										}, slideDelay);
									} else {
									var	strLabels =	'Humidity<br>Dew Point<br>Pressure<Br>Wind<br>',
										strData = weatherInfo.currentCond.weatherLocs[0].humid + '%<br>' + weatherInfo.currentCond.weatherLocs[0].dewpt + '<br>' + weatherInfo.currentCond.weatherLocs[0].pressure + " " + weatherInfo.currentCond.weatherLocs[0].pressureTrend + '<br>' + weatherInfo.currentCond.weatherLocs[0].wind + '<br>';
										strLabels+='Gusts<Br>';
										strData+=weatherInfo.currentCond.weatherLocs[0].gust +	'<br>';
									if (weatherInfo.currentCond.weatherLocs[0].feelslike.type != "dontdisplay") {
										strLabels+=weatherInfo.currentCond.weatherLocs[0].feelslike.type
										strData+=weatherInfo.currentCond.weatherLocs[0].feelslike.val
									}

									$('.severe-city-info .frost-pane .labels').html(strLabels);
									$('.severe-city-info .frost-pane .data').html(strData);

									// right pane
									$('.severe-city-info .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.currentCond.weatherLocs[0].icon, weatherInfo.currentCond.weatherLocs[0].windspeed) + '")');
									//$('.info-slide-content.airport .frost-pane.right .icon').css('background-image', 'url("' + getCCicon(+obsData(0).iconCode, obsData(0).current.wind_speed) + '")');
									$('.severe-city-info .conditions').text(weatherInfo.currentCond.weatherLocs[0].cond);
									$('.severe-city-info .temp').text(weatherInfo.currentCond.weatherLocs[0].temp);
									weatherAudio.playCurrentConditions();

									//fadein
									$('.severe-city-info-slide').fadeIn(0);
									$('.severe-city-info').fadeIn(500);
									//fadeout and switch
									setTimeout(function() {
										$('.severe-city-info').fadeOut(500, function(){
											wait(0);
									});
									}, slideDelay);
								}
								}
								,city8slides(pidx){
									var pages = Math.ceil(citySlideList.length/4);
									if (weatherInfo.currentCond.city8slides == true) {
										$('.severe-city-info-slide #subhead-city').fadeOut(500);
										$('.severe-city-info-slide .subhead-title').text('Currently');
										$('.severe-city-info-slide .tempunavailable').fadeIn(500)
										setTimeout(function() {
											$('.info-slide-content.severe-aroundcityinfo').fadeOut(500);
											$('.severe-city-info-slide .tempunavailable').fadeOut(500, function(){
												$('.severe-city-info-slide').fadeOut(0)
												$('.severe-city-info-slide #subhead-city').fadeIn(0);
												wait(0);
										});
										}, slideDelay);
									} else {
										$('.severe-city-info-slide #subhead-city').fadeOut(0);
									function fillinfo() {

										pidx = (pidx===undefined ? 1 : pidx);

										//replace tomorrow
										var di = 0;
										for (var i = (pidx == 1) ? 0 : 4; i < 4*pidx || i < citySlideList.length; i++) {
											if (weatherInfo.currentCond.city8slides.cities[i]) {
												var divnumbers = ['i','ii','iii','iv']
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .cityname').text(weatherInfo.currentCond.city8slides.cities[i].displayname);
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .temp').text(weatherInfo.currentCond.city8slides.cities[i].temp);
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.currentCond.city8slides.cities[i].icon, weatherInfo.currentCond.city8slides.cities[i].windspeed) + '")');
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .wind').text(weatherInfo.currentCond.city8slides.cities[i].wind);
											} else {
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .cityname').text("");
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .temp').text("");
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .icon').css('background-image', 'url("' + "" + '")');
												$('.info-slide-content.severe-aroundcityinfo .city.' + divnumbers[di] + ' .wind').text("")
											}
											di = di + 1
										}


									}
								fillinfo();
								$('.info-slide-content.severe-aroundcityinfo').fadeIn(500);

									setTimeout( function() {

										if (pidx<pages) {
											$('.info-slide-content.severe-aroundcityinfo').fadeOut(500, function() {
												currentDisplay(pidx+1);
												//fillinfo();
											});
										} else {
											$('.info-slide-content.severe-aroundcityinfo').fadeOut(500, function() {
												$('.severe-city-info-slide #subhead-city').fadeIn(0);
												$('.severe-city-info-slide').fadeOut(0);
												wait(0);
											});
										}

									}, slideDelay)
								}
								}
								// Local Doppler Radar or Radar/Satellite (15 sec, zoomed out with cloud cover)
								,localDoppler(){
									var showsat = Math.random()
									if (showsat <=  .5) {
										showRadar(maincitycoords.lat, maincitycoords.lon, 6, slideDelay, true);
									} else {
										showRadar(maincitycoords.lat, maincitycoords.lon, 8, slideDelay, false);
									}
									wait(slideDelay + 500);
								}

								// daypart / hourly
								,forecast(fidx) {
									//pick between day part or local forecast
									if (selectval === 2 || selectval === 3) {
										// reset tempbar animation
										if (weatherInfo.dayPart.weatherLocs[0].noReport == true) {
											$('.severe-city-info-slide .subhead-title').text(weatherInfo.dayPart.weatherLocs[0].daytitle);
											$('.severe-city-info-slide').fadeIn(0);
											$('.severe-city-info-slide .tempunavailable').fadeIn(500)
											setTimeout(function() {
												$('.severe-city-info-slide .tempunavailable').fadeOut(500, function(){
													wait(0);
											});
											}, slideDelay);
										} else {
										$('.info-slide-content.severe-daypart .hour').each(function(){
												$('.info-slide-content.severe-daypart .hour .tempbar').css("height", "0px")
												$('.info-slide-content.severe-daypart .hour .tempbar .temp').css("opacity", "0%");
												$('.info-slide-content.severe-daypart .hour .tempbar .wind').css("opacity", "0%");
											i = i + 1
										});
										//hour title
										$('.info-slide-content.severe-daypart .hour.i .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[0].hour[0].time);
										$('.info-slide-content.severe-daypart .hour.ii .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[0].hour[1].time);
										$('.info-slide-content.severe-daypart .hour.iii .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[0].hour[2].time);
										$('.info-slide-content.severe-daypart .hour.iv .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[0].hour[3].time);

										//temp
										$('.info-slide-content.severe-daypart .hour.i .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[0].hour[0].temp);
										$('.info-slide-content.severe-daypart .hour.ii .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[0].hour[1].temp);
										$('.info-slide-content.severe-daypart .hour.iii .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[0].hour[2].temp);
										$('.info-slide-content.severe-daypart .hour.iv .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[0].hour[3].temp);

										//wind
										$('.info-slide-content.severe-daypart .hour.i .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[0].hour[0].wind);
										$('.info-slide-content.severe-daypart .hour.ii .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[0].hour[1].wind);
										$('.info-slide-content.severe-daypart .hour.iii .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[0].hour[2].wind);
										$('.info-slide-content.severe-daypart .hour.iv .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[0].hour[3].wind);

										$('.info-slide-content.severe-daypart .hour.i .condition').text(weatherInfo.dayPart.weatherLocs[0].hour[0].cond);
										$('.info-slide-content.severe-daypart .hour.ii .condition').text(weatherInfo.dayPart.weatherLocs[0].hour[1].cond);
										$('.info-slide-content.severe-daypart .hour.iii .condition').text(weatherInfo.dayPart.weatherLocs[0].hour[2].cond);
										$('.info-slide-content.severe-daypart .hour.iv .condition').text(weatherInfo.dayPart.weatherLocs[0].hour[3].cond);

										//icon
										$('.info-slide-content.severe-daypart .hour.i .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[0].hour[0].icon, weatherInfo.dayPart.weatherLocs[0].hour[0].windspeed) + '")');
										$('.info-slide-content.severe-daypart .hour.ii .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[0].hour[1].icon, weatherInfo.dayPart.weatherLocs[0].hour[1].windspeed) + '")');
										$('.info-slide-content.severe-daypart .hour.iii .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[0].hour[2].icon, weatherInfo.dayPart.weatherLocs[0].hour[2].windspeed) + '")');
										$('.info-slide-content.severe-daypart .hour.iv .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[0].hour[3].icon, weatherInfo.dayPart.weatherLocs[0].hour[3].windspeed) + '")');

										// calculate height of tempbars
										$('.severe-city-info-slide .subhead-title').text(weatherInfo.dayPart.weatherLocs[0].daytitle);
										var temps = [];
										for (var i = 0; i < 4; i++) {
											temps.push(weatherInfo.dayPart.weatherLocs[0].hour[i].temp);
										}
										var min = Math.min(...temps),  // 54
											max = Math.max(...temps),  // 73
											range = ((max-min) != 0) ? (max-min) : .001,
											prange = (100-78), // percent range for bar height
											hourlable = ['i', 'ii', 'iii', 'iv'],
											temp, value, i = 0;
										$('.info-slide-content.severe-daypart .hour').each(function(){
											temp = weatherInfo.dayPart.weatherLocs[0].hour[i].temp
											value = ((temp-min)/range) * prange + 78; // find percentage of range and translate to percent and add that to the starting css % height number
											valueii = (value/100) * 165 // multiply percentage by max height
											$('.info-slide-content.severe-daypart .hour.' + hourlable[i] + ' .tempbar').animate({height:valueii+"px"}, 1500,function(){
												$('.info-slide-content.severe-daypart .hour .tempbar .temp').fadeTo('slow', 1);
												$('.info-slide-content.severe-daypart .hour .tempbar .wind').fadeTo('slow', 1);
											});
											i = i + 1
										})
										//play narration
										weatherAudio.playLocalforecastii();
										//fade in
										$('.severe-city-info-slide').fadeIn(0);
										$('.info-slide-content.severe-daypart').fadeIn(500);
										//for calculating when to show daypart
										selectval = selectval + 1
										//fadeout
										setTimeout(function() {
											$('.info-slide-content.severe-daypart').fadeOut(500, function() {
												wait(0)
											});
										}, slideDelay);
									}
									} else {
										// Local Forecast -Today (10 sec)
											var div = '.info-slide-content.severe-forecast '
											if (weatherInfo.dayDesc.weatherLocs[0].noReport == true) {
												$('.severe-city-info-slide .subhead-title').text('Local Forecast');
												$('.severe-city-info-slide').fadeIn(0);
												$('.severe-city-info-slide .tempunavailable').fadeIn(500)
												$('.info-slide-content.severe-forecast').fadeIn(500);
												$(div + '.title').empty()
												$(div + '.content').empty()
												setTimeout(function() {
													$('.info-slide-content.severe-forecast').fadeOut(500);
													$('.severe-city-info-slide .tempunavailable').fadeOut(500, function(){
														wait(0);
												});
												}, slideDelay);
											} else {
											function fillinfo() {

												fidx = (fidx===undefined ? 0 : fidx);

												$('.severe-city-info-slide .subhead-title').text('Local Forecast');
												//replace tomorrow

												$(div + '.title').text(weatherInfo.dayDesc.weatherLocs[0].day[fidx].name);

												// content
												resizeText(weatherInfo.dayDesc.weatherLocs[0].day[fidx].desc);
												$(div + '.content').text(weatherInfo.dayDesc.weatherLocs[0].day[fidx].desc);

											}
										if (fidx === undefined) {
											weatherAudio.playLocalforecasti();
										}

										$('.severe-city-info-slide').fadeIn(0);
										fillinfo();
										$('.info-slide-content.severe-forecast').fadeIn(500);

											setTimeout( function() {

												if (fidx<3) {
													$('.info-slide-content.severe-forecast').fadeOut(500, function() {
														currentDisplay(fidx+1);
														//fillinfo();
													});
												} else {
													$('.info-slide-content.severe-forecast').fadeOut(500, function() {
														selectval = selectval + 1
														if (selectval === 4) {selectval = 0}
														wait(0);
													});
												}

											}, slideDelay)
										}
									}
								}



								// Extended Forecast(5 day columns)
								,extendedForecast() {
									$('.severe-city-info-slide .subhead-title').text('Extended Forecast');
									if (weatherInfo.fiveDay.weatherLocs[0].noReport == true) {
										$('.severe-city-info-slide .tempunavailable').fadeIn(500)
										setTimeout(function() {
											$('.severe-city-info-slide .tempunavailable').fadeOut(500, function(){
												$('.severe-city-info-slide').fadeOut(0);
												wait(0);
										});
										}, slideDelay);
									} else {
									//days
									$('.info-slide-content.severe-extended-forecast .thingday.i').text(weatherInfo.fiveDay.weatherLocs[0].day[0].name)
									$('.info-slide-content.severe-extended-forecast .thingday.iiw').text(weatherInfo.fiveDay.weatherLocs[0].day[1].name)
									$('.info-slide-content.severe-extended-forecast .thingday.iiiw').text(weatherInfo.fiveDay.weatherLocs[0].day[2].name)
									$('.info-slide-content.severe-extended-forecast .thingday.ivw').text(weatherInfo.fiveDay.weatherLocs[0].day[3].name)
									$('.info-slide-content.severe-extended-forecast .thingday.vw').text(weatherInfo.fiveDay.weatherLocs[0].day[4].name)

									//icons
									$('.info-slide-content.severe-extended-forecast .frost-pane.iw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[0].day[0].icon, weatherInfo.fiveDay.weatherLocs[0].day[0].windspeed) + '")');
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[0].day[1].icon, weatherInfo.fiveDay.weatherLocs[0].day[1].windspeed) + '")');
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiiw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[0].day[2].icon, weatherInfo.fiveDay.weatherLocs[0].day[2].windspeed) + '")');
									$('.info-slide-content.severe-extended-forecast .frost-pane.ivw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[0].day[3].icon, weatherInfo.fiveDay.weatherLocs[0].day[3].windspeed) + '")');
									$('.info-slide-content.severe-extended-forecast .lfrost-pane.vw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[0].day[4].icon, weatherInfo.fiveDay.weatherLocs[0].day[4].windspeed) + '")');

									//conditions
									$('.info-slide-content.severe-extended-forecast .frost-pane.iw .conditions').text(weatherInfo.fiveDay.weatherLocs[0].day[0].cond);
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiw .conditions').text(weatherInfo.fiveDay.weatherLocs[0].day[1].cond);
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiiw .conditions').text(weatherInfo.fiveDay.weatherLocs[0].day[2].cond);
									$('.info-slide-content.severe-extended-forecast .frost-pane.ivw .conditions').text(weatherInfo.fiveDay.weatherLocs[0].day[3].cond);
									$('.info-slide-content.severe-extended-forecast .lfrost-pane.vw .conditions').text(weatherInfo.fiveDay.weatherLocs[0].day[4].cond);

									//high
									$('.info-slide-content.severe-extended-forecast .frost-pane.iw .temphigh').text(weatherInfo.fiveDay.weatherLocs[0].day[0].high)
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiw .temphigh').text(weatherInfo.fiveDay.weatherLocs[0].day[1].high)
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiiw .temphigh').text(weatherInfo.fiveDay.weatherLocs[0].day[2].high)
									$('.info-slide-content.severe-extended-forecast .frost-pane.ivw .temphigh').text(weatherInfo.fiveDay.weatherLocs[0].day[3].high)
									$('.info-slide-content.severe-extended-forecast .lfrost-pane.vw .temphigh .temphightext').text(weatherInfo.fiveDay.weatherLocs[0].day[4].high)

									//low
									$('.info-slide-content.severe-extended-forecast .frost-pane.iw .templow').text(weatherInfo.fiveDay.weatherLocs[0].day[0].low)
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiw .templow').text(weatherInfo.fiveDay.weatherLocs[0].day[1].low)
									$('.info-slide-content.severe-extended-forecast .frost-pane.iiiw .templow').text(weatherInfo.fiveDay.weatherLocs[0].day[2].low)
									$('.info-slide-content.severe-extended-forecast .frost-pane.ivw .templow').text(weatherInfo.fiveDay.weatherLocs[0].day[3].low)
									$('.info-slide-content.severe-extended-forecast .lfrost-pane.vw .templow').text(weatherInfo.fiveDay.weatherLocs[0].day[4].low)

									$('.info-slide-content.severe-extended-forecast').fadeIn(500);
									//buildailycalculating when to show daypart
									//fadeout
									setTimeout(function() {
										$('.info-slide-content.severe-extended-forecast').fadeOut(500, function() {
												$('.city-info-slide').fadeOut(0);
											wait(0)
										});
									}, slideDelay);
								}
								}
						}
						keys = Object.keys(displays);
						if (weatherInfo.reboot == true) {
							$('#info-slide-container').hide()
							return;
						}
						if (idx<keys.length) {
							currentDisplay = displays[keys[idx]];
							currentDisplay();
						} else { // see if still in severe weather mode or exit
							idx = 0
							if (weatherInfo.bulletin.severeweathermode == true) {
								//fade out radar if going back to bulletin. Don't fade if exiting.
								if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeOut(500)} else {$('.radar-color-legend').fadeOut(500)}
								$('.radar-content').fadeOut(500, function() {
									$('.radar-slide').fadeOut(0);
									currentDisplay = displays[keys[0]];
									currentDisplay();
								});
							} else {
								$('#info-slides-header .hscroller').empty();
								$('.radar-slide .info-subheader').css('background', 'linear-gradient(to right, #2f3eb8 0, #1b29aa 75%)')
								$('#minimap').fadeIn(0);
								$('#minimap-title').fadeIn(0);
								$('#current-info').fadeIn(0)
								$('#current-info-severe').fadeOut(0)
								$('#current-info-details').fadeOut(0)
								loopssevereweathermode = false
								displayAtmospheric(0);
								buildHeader();
								weatherAudio.playLocalRadar();
								$('.radar-slide').fadeIn(0);
								$('.radar-content').fadeIn(500);
								mainMap = new Radar("radar-1", 3, 8, maincitycoords.lat, maincitycoords.lon, false);
								if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeIn(500)} else {$('.radar-color-legend').fadeIn(500)}
								setTimeout(function() {
									if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeOut(500)} else {$('.radar-color-legend').fadeOut(500)}
									$('.radar-content').fadeOut(500, function() {
										$('.radar-slide').fadeOut(0);
										nextCity()
									});
								}, 5500);
							}
						}
						return;

						function wait(duration){
							setTimeout(function() {
								showSevereSlides(++idx);
							}, duration);
						}



						function resizeText(text){
							var s = 50,
								$container = $('.info-slide-content.severe-forecast .content'),
								$test = $('<div style="position:absolute;top:100%;"></div>') .appendTo($container) .css('font-size', s + 'px') .css('line-height', '125%') .html(text);

							// have to display parent so we can get measurements
							$container.closest('.info-slide-content').show();

							$test.width($container.width() );
							while ($test.outerHeight(true) >= (400) ) {
								s -= 1;
								$test.css('font-size', s + 'px');
							}
							$container.closest('.info-slide-content').hide();
							$container .text(text) .css('font-size', s + 'px');
							$test.remove();
						};

			} else {
			var currentDisplay,
				displays = {
					bulletin() {
						if (weatherInfo.bulletin.weatherLocs[0] == true) {
						$('.bulletin .frost-pane .cityname').text(weatherInfo.bulletin.weatherLocs[0].displayname + " Area");
						//fade in
						$('.bulletin').fadeIn(0);
						$('.bulletin .frost-pane').fadeIn(500);

						$('#subhead-noaa').fadeIn(500);
						pages = weatherInfo.bulletin.weatherLocs[0].pages
						makewarningPage(0)
						function makewarningPage(warningpagenum) {
							if (warningpagenum > 0) {
								$('.bulletin .frost-pane').fadeOut(500, function() {
									$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
									$('.bulletin .frost-pane').fadeIn(500);
								});
							} else {
								$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
								$('.bulletin .frost-pane').fadeIn(500);
							}
							setTimeout(function() {
								if (warningpagenum < (pages.length - 1)) {
									makewarningPage(warningpagenum + 1)
								} else {
									$('.bulletin').fadeIn(0);
									$('.bulletin .frost-pane').fadeOut(500);
									$('#subhead-noaa').fadeOut(500, function() {
										$('.bulletin').fadeOut(0);
										wait(0)
									});
								}
							}, slideDelay);
						}
						} else {wait(0)}
					}
					,radar() {
						weatherAudio.playLocalRadar();
						$('.radar-slide').fadeIn(0);
						if (weatherInfo.radarTempUnavialable == true) {
							$('.radar-slide .tempunavailable').fadeIn(500);
						}
						$('.radar-content').fadeIn(500);
						mainMap = new Radar("radar-1", 3, 8, maincitycoords.lat, maincitycoords.lon, false);
						if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeIn(500)} else {$('.radar-color-legend').fadeIn(500)}
						wait(60500)
					}
					}
				};
			keys = Object.keys(displays);
			if (weatherInfo.reboot == true) {
				$('#info-slide-container').hide()
				return;
			}
				if (idx<keys.length) {
					currentDisplay = displays[keys[idx]];
					currentDisplay();
				} else { // see if still in severe weather mode or exit
					idx = 0
					if (weatherInfo.bulletin.severeweathermode == true) {
						//fade out radar if going back to bulletin. Don't fade if exiting.
						if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeOut(500)} else {$('.radar-color-legend').fadeOut(500)}
						$('.radar-content').fadeOut(500, function() {
							$('.radar-slide').fadeOut(0);
							currentDisplay = displays[keys[0]];
							currentDisplay();
						});
					} else {
						$('#info-slides-header .hscroller').empty();
						$('.radar-slide .info-subheader').css('background', 'linear-gradient(to right, #2f3eb8 0, #1b29aa 75%)')
						$('#minimap').fadeIn(0);
						$('#minimap-title').fadeIn(0);
						$('#current-info').fadeIn(0)
						$('#current-info-severe').fadeOut(0)
						$('#current-info-details').fadeOut(0)
						loopssevereweathermode = false
						displayAtmospheric(0);
						buildHeader();
						setTimeout(function() {
							if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeOut(500)} else {$('.radar-color-legend').fadeOut(500)}
							if (weatherInfo.radarTempUnavialable == true) {
								$('.radar-slide .tempunavailable').fadeOut(500);
							}
							$('.radar-content').fadeOut(500, function() {
								$('.radar-slide').fadeOut(0);
								nextCity()
							});
						}, 5500);
					}
				}
				return;
			function wait(duration){
				setTimeout(function() {
					showSevereSlides(++idx);
				}, duration);
			}
		}


		function showRadar(lat, long, zoom, time, withsat) {
				// fade out info, fade in radar
				weatherAudio.playLocalRadar();
				if (withsat == true) {
					$('.radar-slide .info-subheader .subhead-title').text('Radar/Satellite')
					$('.radar-slide .radar-legends .pastlegend').text('Past 5 Hours')
				}
				$('.radar-slide').fadeIn(0);
				if (weatherInfo.radarTempUnavialable == true) {
					$('.radar-slide .tempunavailable').fadeIn(500);
				}
				$('.radar-content').fadeIn(500);
				mainMap = new Radar("radar-1", 3, zoom, lat, long, withsat);
				if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeIn(500)} else {$('.radar-color-legend').fadeIn(500)}
				setTimeout(function() {
					if (weatherInfo.radarWinterLegend == true) {$('.radar-color-legend-winter').fadeOut(500)} else {$('.radar-color-legend').fadeOut(500)}
					if (weatherInfo.radarTempUnavialable == true) {
						$('.radar-slide .tempunavailable').fadeOut(500);
					}
					$('.radar-content').fadeOut(500, function() {
						if (withsat == true) {
							$('.radar-slide .infosubbheader .subheadtitle').text('Local Doppler Radar')
							$('.radar-slide .radar-legends .pastlegend').text('Past 3 Hours')
						}
						$('.radar-slide').fadeOut(0);
					});
				}, time);
		}

		function showAirport(idx) {
			var currentDisplay,
				displays = {
					intro() {
							$('.airport-slide-intro').fadeIn(0);
							$('.airport-slide-intro .accent').fadeIn(500);
							$('.airport-slide-intro .weatherscanmarquee').fadeIn(500);
							$('.airport-slide-intro .weatherscanmarquee').css('animation', 'marqueeweatherscan 5.5s linear normal forwards')
							setTimeout(function() {
								$('.airport-slide-intro .segment').fadeIn(500);
							}, 1000);
							setTimeout(function() {
								$('.airport-slide-intro .segment').fadeOut(500)
								$('.airport-slide-intro .accent').fadeOut(500);
								$('.airport-slide-intro .weatherscanmarquee').fadeOut(500, function() {
									$('.airport-slide-intro').fadeOut(0);
									wait(0);
								});
							}, 5000);
						}
				,airportconditions(aidx) {
					$('.airport-slide').fadeIn(0);
					var pages = weatherInfo.airport.mainairports.length
					if (weatherInfo.airport.noReport == true) {
						$('.info-slide-content.airportpanel').fadeIn(500);
						$('.airport-slide .nodata').fadeIn(500)
						setTimeout(function() {
							$('.airport-slide .nodata').fadeOut(500);
							$('.info-slide-content.airportpanel').fadeOut(500, function(){
								wait(0);
							});
						}, slideDelay);
					} else {
					function fillinfo() {
						aidx = (aidx===undefined ? 0 : aidx);
						$('.info-slide-content.airportpanel .leftpanel .thing').text(weatherInfo.airport.mainairports[aidx].displayname)
						$('.info-slide-content.airportpanel .top .delayfill').html(weatherInfo.airport.mainairports[aidx].arrivals.delay)
						$('.info-slide-content.airportpanel .top .reasonfill').text(weatherInfo.airport.mainairports[aidx].arrivals.reason)
						$('.info-slide-content.airportpanel .bottom .delayfill').html(weatherInfo.airport.mainairports[aidx].departures.delay)
						$('.info-slide-content.airportpanel .bottom .reasonfill').text(weatherInfo.airport.mainairports[aidx].departures.reason)
						$('.info-slide-content.airportpanel .temp').text(weatherInfo.airport.mainairports[aidx].temp)
						$('.info-slide-content.airportpanel .conditions').text(weatherInfo.airport.mainairports[aidx].cond)
						$('.info-slide-content.airportpanel .icon').css('background-image', 'url("' +  getCCicon(weatherInfo.airport.mainairports[aidx].icon, weatherInfo.airport.mainairports[aidx].windspeed) + '")');
					}
				fillinfo();
				$('.info-slide-content.airportpanel').fadeIn(500);

					setTimeout( function() {

						if ((aidx+1)<pages) {
							$('.info-slide-content.airportpanel').fadeOut(500, function() {
								currentDisplay(aidx+1);
							});
						} else {
							$('.info-slide-content.airportpanel').fadeOut(500, function() {
								wait(0);
							});
						}

					}, slideDelay)
				}
				}
				,otherairportconds(aidx) {
					var pages = Math.ceil(weatherInfo.airport.otherairports.length/4);
					if (weatherInfo.airport.noReport == true) {
						$('.info-slide-content.otherairports').fadeIn(500);
						$('.airport-slide .nodata').fadeIn(500)
						setTimeout(function() {
							$('.airport-slide .nodata').fadeOut(500);
							$('.info-slide-content.otherairports').fadeOut(500, function(){
								$('.airport-slide').fadeOut(0);
								wait(0);
							});
						}, slideDelay);
					} else {
						$('.city-info-slide #subhead-city').fadeOut(0);
					function fillinfo() {

						aidx = (aidx===undefined ? 1 : aidx);

						//replace tomorrow
						var di = 0;
						for (var i = 4*aidx - 4; i < 4*aidx || i < weatherInfo.airport.otherairports.length; i++) {
							var divnumbers = ['i','ii','iii','iv']
							if (weatherInfo.airport.otherairports[i]) {
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .airportname').text(weatherInfo.airport.otherairports[i].displayname);
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .temp').text(weatherInfo.airport.otherairports[i].temp);
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.airport.otherairports[i].icon, weatherInfo.airport.otherairports[i].windspeed) + '")');
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .delay').html(weatherInfo.airport.otherairports[i].delay);
							} else {
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .airportname').text("");
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .temp').text("");
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .icon').css('background-image', 'url("' + "" + '")');
								$('.info-slide-content.otherairports .airport.' + divnumbers[di] + ' .delay').text("")
							}
							di = di + 1
						}


					}
				fillinfo();
				$('.info-slide-content.otherairports').fadeIn(500);

					setTimeout( function() {

						if (aidx<pages) {
							$('.info-slide-content.otherairports').fadeOut(500, function() {
								currentDisplay(aidx+1);
								//fillinfo();
							});
						} else {
							$('.info-slide-content.otherairports').fadeOut(500, function() {
								$('.airport-slide').fadeOut(0)
								wait(0);
							});
						}

					}, slideDelay)
				}
				}
			},
				keys = Object.keys(displays);
				if (weatherInfo.reboot == true) {
					$('#info-slide-container').hide()
					return;
				}
				var daypart;
				if (idx<keys.length) {
					currentDisplay = displays[keys[idx]];
					currentDisplay();
				} else { // done - exit
					nextCity();
				}
				return;

				function wait(duration){
					setTimeout(function() {
						showAirport(++idx);
					}, duration);
				}
		}

		function showMarine(idx) {
			var currentDisplay,
				displays = {
					intro() {
							$('.beach-slide-intro').fadeIn(0);
							$('.beach-slide-intro .accent').fadeIn(500);
							$('.beach-slide-intro .weatherscanmarquee').fadeIn(500);
							$('.beach-slide-intro .weatherscanmarquee').css('animation', 'marqueeweatherscan 5.5s linear normal forwards')
							setTimeout(function() {
								$('.beach-slide-intro .segment').fadeIn(500);
							}, 1000);
							setTimeout(function() {
								$('.beach-slide-intro .segment').fadeOut(500)
								$('.beach-slide-intro .accent').fadeOut(500);
								$('.beach-slide-intro .weatherscanmarquee').fadeOut(500, function() {
									$('.beach-slide-intro').fadeOut(0);
									wait(0);
								});
							}, 5000);
						}
				,beachconditions() {
					var beachdata = dataMan.locations[0].forecasts("marinecurrent")
					$('.surfreport .leftpanel .watertempbar .temparrow').css('left','0')
					$('.surfreport .leftpanel .watertempbar .temparrow .temp').fadeOut(0)
					$('.surfreport .leftpanel .frost-pane .windvalue').text(degToCompass(beachdata.spot.wind.direction) + ' ' + Math.round(beachdata.spot.wind.speed) + ' mph')
					$('.surfreport .leftpanel .frost-pane .waveperiodvalue').text(beachdata.spot.swells[0].period + ' Seconds')

					$('.surfreport').fadeIn(500);
					$('.beach-slide').fadeIn(0);
					$('.surfreport').fadeIn(500);
					setTimeout(function() {
						var watertempval = Math.round((beachdata.spot.waterTemp.max + beachdata.spot.waterTemp.min)/2)
						var wlength = 4.30 * watertempval
						var wtime = 20 * watertempval
						$('.surfreport .leftpanel .watertempbar .temparrow').animate({left: wlength + "px"}, wtime, 'linear')
						$('.surfreport .leftpanel .watertempbar .temparrow .temp').text(watertempval)
						setTimeout(function() {
							$('.surfreport .leftpanel .watertempbar .temparrow .temp').fadeIn(500)
						}, wtime)
					}, 500);

					setTimeout(function() {
						$('.surfreport').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
				}
				,costalwatersalerts() {
					$('.coastalwaters.warnings').fadeIn(500);
					setTimeout(function() {
						$('.coastalwaters.warnings').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
				}
				,costalwatersforecast() {
					var marineforedays = [""];
					var marineforetitles = [""];
					$.ajax({url: "https://forecast.weather.gov/shmrn.php?mz=AMZ450",
  							context: document.body,
								crossDomanin: true
						}).done(function(data) {
						  marineforedata = data
							console.log(data)
						});
						var pages = [""];
					/*function splitLines() {

						 var warningsplitstr = $('.bulletin .frost-pane .warnings').text().split(/(?![^\n]{1,45}$)([^\n]{1,45})\s/g)
						 warningsplitstr.pop()
						 warningsplitstr.pop()
						 var warningpageidx = 0;
						 var warninglineidx = 0;
						 console.log(pages)
						 console.log(warningsplitstr)
						 warningsplitstr.forEach(warningline => {
							if (warningline != "") {
								if (warninglineidx == 0) {
									pages[warningpageidx] = ""
								}
							 console.log(warningline)
							pages[warningpageidx] += (warningline + '<br>')
							warninglineidx += 1;
							if (warninglineidx == 7) {
								warningpageidx += 1
								warninglineidx = 0
							}
						}
					});
						//$('.bulletin .frost-pane .warnings').text($('.bulletin .frost-pane .warnings').text().replace(/(?![^\n]{1,40}$)([^\n]{1,40})\s/g, '$1\n'))
						 //console.log($('.bulletin .frost-pane .warnings').html())
						 makewarningPage(0)
					}
					splitLines()

					$('.bulletin').fadeIn(0);
					$('.bulletin .frost-pane').fadeIn(500);
					$('#subhead-noaa').fadeIn(500);
					function makeMarinePage(marinepagenum) {
						if (warningpagenum > 0) {
							$('.bulletin .frost-pane').fadeOut(500, function() {
								$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
								$('.bulletin .frost-pane').fadeIn(500);
							});
						} else {
							$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
							$('.bulletin .frost-pane').fadeIn(500);
						}
						setTimeout(function() {
							if (warningpagenum < (pages.length - 1)) {
								makewarningPage(warningpagenum + 1)
							} else {
								$('.bulletin').fadeIn(0);
								$('.bulletin .frost-pane').fadeOut(500);
									$('#subhead-noaa').fadeOut(500, function() {
										$('.bulletin').fadeOut(0);
										if (severemode == true) {
											showRadarS(dataMan.locations[0].lat, dataMan.locations[0].long, 8, 60000)
										} else {
											$('#minimap-cover').fadeOut(0)
											$('#info-slides-header .hscroller').empty();
											$('#marqueeSevere').fadeOut(0)
											$('.marqueeheadersevere').fadeOut(0)
											$('#arrow-img').fadeIn(0)
											$('.radar-slide .infosubheader').css('background','linear-gradient(to top, #fffe21 0, #db5a14 100%);')
											buildHeader();
											nextCity();
										}
									});
							}*/
						//https://tgftp.nws.noaa.gov/data/forecasts/marine/coastal/am/amz450.txt
					$('.coastalwaters.forecasts').fadeIn(500);
					setTimeout(function() {
						$('.coastalwaters.forecasts').fadeOut(500, function(){
							$('.beach-slide').fadeOut(0);
							wait(0);
						});
					}, slideDelay);
				}
			},
				keys = Object.keys(displays);
				if (weatherInfo.reboot == true) {
					$('#info-slide-container').hide()
					return;
				}
				var daypart;
				if (idx<keys.length) {
					currentDisplay = displays[keys[idx]];
					currentDisplay();
				} else { // done - exit
					nextCity();
				}
				return;

				function wait(duration){
					setTimeout(function() {
						showMarine(++idx);
					}, duration);
				}
		}
		function showHealth(idx) {
			var currentDisplay,
				displays = {
					intro() {
							$('.health-slide-intro').fadeIn(0);
							$('.health-slide-intro .accent').fadeIn(500);
							$('.health-slide-intro .weatherscanmarquee').fadeIn(500);
							$('.health-slide-intro .weatherscanmarquee').css('animation', 'marqueeweatherscan 5.5s linear normal forwards')
							setTimeout(function() {
								$('.health-slide-intro .segment').fadeIn(500);
							}, 1000);
							setTimeout(function() {
								$('.health-slide-intro .segment').fadeOut(500)
								$('.health-slide-intro .accent').fadeOut(500);
								$('.health-slide-intro .weatherscanmarquee').fadeOut(500, function() {
									$('.health-slide-intro').fadeOut(0);
									wait(0);
								});
							}, 5000);
						}
				,healthforecast() {
					$('.info-slide.health .subhead-title').text('Outdoor Activity');
					$('.info-slide.health #subhead-city').text(weatherInfo.healthforecast.displayname);
					if (weatherInfo.healthforecast.noReport == true) {
						$('.info-slide.health').fadeIn(0);
						$('.info-slide.health .tempunavailable').fadeIn(500);
						setTimeout(function() {
							$('.info-slide.health .tempunavailable').fadeOut(500, function(){
								wait(0);
							});
						}, slideDelay);
					} else {
					if (weatherInfo.healthforecast.dayidx == 0 && dateFns.getHours(new Date()) >= 4) {
						$('.info-slide-content.health-forecast .mainforecast .hightext').css("right","85px");
						$('.info-slide-content.health-forecast .mainforecast .hightext').css("top","226.5px");
						$('.info-slide-content.health-forecast .mainforecast .high').css("left","95px");
						$('.info-slide-content.health-forecast .mainforecast .high').css("top","239px");
						$('.info-slide-content.health-forecast .mainforecast .lowtext').fadeOut(0)
						$('.info-slide-content.health-forecast .mainforecast .low').fadeOut(0)
					} else {
						$('.info-slide-content.health-forecast .mainforecast .hightext').removeAttr("style");
						$('.info-slide-content.health-forecast .mainforecast .hightext').removeAttr("style");
						$('.info-slide-content.health-forecast .mainforecast .high').removeAttr("style");
						$('.info-slide-content.health-forecast .mainforecast .high').removeAttr("style");
						$('.info-slide-content.health-forecast .mainforecast .lowtext').fadeIn(0)
						$('.info-slide-content.health-forecast .mainforecast .low').fadeIn(0)
					}
					$('.info-slide-content.health-forecast .thing').text("Forecast for " + weatherInfo.healthforecast.day)
					$('.info-slide-content.health-forecast .mainforecast .hightext').text(weatherInfo.healthforecast.high)
					$('.info-slide-content.health-forecast .mainforecast .lowtext').text(weatherInfo.healthforecast.low)
					$('.info-slide-content.health-forecast .forecastdetails .chancepreciptext').text(weatherInfo.healthforecast.precipChance)
					$('.info-slide-content.health-forecast .forecastdetails .humidtext').text(weatherInfo.healthforecast.humid)
					$('.info-slide-content.health-forecast .forecastdetails .windtext').text(weatherInfo.healthforecast.wind)
					$('.info-slide-content.health-forecast .mainforecast .icon').css('background-image', 'url("' +  getCCicon(weatherInfo.healthforecast.icon, weatherInfo.healthforecast.windspeed) + '")');

					$('.info-slide.health').fadeIn(0);
					$('.info-slide-content.health-forecast').fadeIn(500);
					setTimeout(function() {
						$('.info-slide-content.health-forecast').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
					}
				}
				,pollen() {
					if (weatherInfo.healthPollen.totalcat && weatherInfo.healthforecast.noReport == false) {
					$('.info-slide-content.allergy .totalpollen .desc').text(weatherInfo.healthPollen.totalcat)
					$('.info-slide-content.allergy .pollen .pollenbar.tree .treetype').text(weatherInfo.healthPollen.types[0].treetype)
					$('.info-slide-content.allergy .pollen .thing').text("As of " + weatherInfo.healthPollen.date)
					$('.info-slide-content.allergy .totalpollen .cat').text(weatherInfo.healthPollen.total)
					$('.info-slide.health .subhead-title').text('Allergy Report');
					$('.info-slide-content.allergy').fadeIn(500);
					setTimeout(function () {
						i = 0
						var pollentypes = ['tree', 'grass', 'weed', 'mold'];
						pollentypes.forEach(pollentype => {
							var plength = {"0":"-10", "1":"55", "2":"115", "3":"175", "4":"235", "5":"295", "9":"-10"}[weatherInfo.healthPollen.types[i].pollenidx]
							var ptime = {"0":0, "1":500, "2":1000, "3":1500, "4":2000, "5":2500, "9":0}[weatherInfo.healthPollen.types[i].pollenidx]
							$('.info-slide-content.allergy .pollen .pollenbar.' + pollentype + ' .bar .bararrow').animate({left: plength + "px"}, ptime)
						});
					}, 500)
					setTimeout(function() {
						$('.info-slide-content.allergy').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
				} else {wait(0)}
				}
				,achesbreath() {
					$('.info-slide.health .subhead-title').text('Health Forecast');
					if (weatherInfo.healthAcheBreath.noReport == true) {
						$('.info-slide.health .tempunavailable').fadeIn(500);
						setTimeout(function() {
							$('.info-slide.health .tempunavailable').fadeOut(500, function(){
								wait(0);
							});
						}, slideDelay);
					} else {
					var alength = {"0":"-10", "1":"22", "2":"55", "3":"88", "4":"121", "5":"154", "6":"187", "7":"220", "8":"253", "9":"286", "10":"300"}[weatherInfo.healthAcheBreath.achesindex]
					var atime = {"0":0, "1":250, "2":500, "3":750, "4":1000, "5":1250, "6":1500, "7":1750, "8":2000, "9":2250, "10":2500}[weatherInfo.healthAcheBreath.achesindex]
					var blength = {"10":"-10", "9":"22", "8":"55", "7":"88", "6":"121", "5":"154", "5":"187", "4":"220", "3":"253", "2":"286", "1":"300"}[weatherInfo.healthAcheBreath.breathindex]
					var btime = {"10":0, "9":250, "8":500, "7":750, "6":1000, "5":1250, "4":1500, "3":1750, "2":2000, "1":2250, "0":2500}[weatherInfo.healthAcheBreath.breathindex]
					$('.info-slide-content.Aches-Breath .thing').text(weatherInfo.healthAcheBreath.breathindex.date)

					$('.info-slide-content.Aches-Breath .aches .bar .bararrow').css('left','-10px')
					$('.info-slide-content.Aches-Breath .breath .bar .bararrow').css('left','-10px')
					$('.info-slide-content.Aches-Breath .aches .bar .bararrow .bararrowtext').fadeOut(0);
					$('.info-slide-content.Aches-Breath .breath .bar .bararrow .bararrowtext').fadeOut(0);
					$('.info-slide-content.Aches-Breath').fadeIn(500);
					setTimeout(function () {
						$('.info-slide-content.Aches-Breath .aches .bar .bararrow').animate({left: alength + "px"}, atime, 'linear', function() {
							$('.info-slide-content.Aches-Breath .aches .bar .bararrow .bararrowtext').text(weatherInfo.healthAcheBreath.achescat);
							$('.info-slide-content.Aches-Breath .aches .bar .bararrow .bararrowtext').fadeIn(500);

						})
						$('.info-slide-content.Aches-Breath .breath .bar .bararrow').animate({left: blength + "px"}, btime, 'linear' ,function() {
							$('.info-slide-content.Aches-Breath .breath .bar .bararrow .bararrowtext').text(weatherInfo.healthAcheBreath.breathcat);
							$('.info-slide-content.Aches-Breath .breath .bar .bararrow .bararrowtext').fadeIn(500);

						})
					}, 500);
					setTimeout(function() {
						$('.info-slide-content.Aches-Breath').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
					}
				}
				,airquality() {
					$('.info-slide.health .subhead-title').text('Air Quality Forecast');
					if (weatherInfo.airquality.noReport == true) {
						$('.info-slide.health .tempunavailable').fadeIn(500);
						setTimeout(function() {
							$('.info-slide.health .tempunavailable').fadeOut(500, function(){
								wait(0);
							});
						}, slideDelay);
					} else {
					var ozone = false;

					/*if (foreDataAlert !== undefined){
						for (var i=0; i<foreDataAlert.alerts.length; i += 1) {
							warning = foreDataAlert.alerts[i].eventDescription;
							if (warning == "Ozone Action Day")  {
								ozone = true;
							}
						};
						if (ozone == true) {
							$('.info-slide-content.airquality .primarypolute .ozoneaction').fadeIn(0)
						}
					}*/
					var aqlength = {1:"35", 2:"107.5", 3:"185", 4:"260", 5:"340"}[weatherInfo.airquality.airqualityindex]
					var aqcat = {1:"green", 2:"yellow", 3:"orange", 4:"deep orange", 5:"red"}[weatherInfo.airquality.airqualityindex]
					var aqtime = {1:0, 2:500, 3:1000, 4:1500, 5:2000}[weatherInfo.airquality.airqualityindex]
					$('.info-slide-content.airquality .airforecast .bar .arrow').css('bottom','35px');
					$('.info-slide-content.airquality .airforecast .bar .forecast').fadeOut(0);
					$('.info-slide-content.airquality .primarypolute .pollutant').text(weatherInfo.airquality.primarypolute)


					$('.info-slide-content.airquality .airforecast .thing').text(weatherInfo.airquality.date)

					$('.info-slide-content.airquality').fadeIn(500);
					setTimeout(function() {
					$('.info-slide-content.airquality .airforecast .bar .arrow').animate({bottom: aqlength + "px"}, aqtime, 'linear', function() {
						$('.info-slide-content.airquality .airforecast .bar .' + aqcat + ' .forecast').fadeIn(500)
					})
					}, 500);
					setTimeout(function() {
						$('.info-slide-content.airquality').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
				}
				}
				,uvindex() {
					$('.info-slide.health .subhead-title').text('Ultraviolet Index');
					if (weatherInfo.uvindex.noReport == true) {
						$('.info-slide.health .tempunavailable').fadeIn(500);
						setTimeout(function() {
							$('.info-slide.health .tempunavailable').fadeOut(500, function(){
								wait(0);
							});
						}, slideDelay);
					} else {
					$('.info-slide-content.uvindex .uvtime.i .uvtime').text(weatherInfo.uvindex.forecast[0].time);
					$('.info-slide-content.uvindex .uvtime.ii .uvtime').text(weatherInfo.uvindex.forecast[1].time);
					$('.info-slide-content.uvindex .uvtime.iii .uvtime').text(weatherInfo.uvindex.forecast[2].time);
					$('.info-slide-content.uvindex .uvtime.i .uvday').text(weatherInfo.uvindex.forecast[0].day);
					$('.info-slide-content.uvindex .uvtime.ii .uvday').text(weatherInfo.uvindex.forecast[1].day);
					$('.info-slide-content.uvindex .uvtime.iii .uvday').text(weatherInfo.uvindex.forecast[2].day);
					//reset animation
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'i' + ' .cat').fadeOut(0)
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'ii' + ' .cat').fadeOut(0)
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'iii' + ' .cat').fadeOut(0)
					$('.info-slide-content.uvindex .currentuv .bar .cat').fadeOut(0)
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'i' + ' .num').fadeOut(0)
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'ii' + ' .num').fadeOut(0)
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'iii' + ' .num').fadeOut(0)
					$('.info-slide-content.uvindex .currentuv .bar .num').fadeOut(0)
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'i').css('height','0px')
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'ii').css('height','0px')
					$('.info-slide-content.uvindex .forecastuv .bar.' + 'iii').css('height','0px')
					$('.info-slide-content.uvindex .currentuv .bar').css('height','0px')
					$('.info-slide-content.uvindex').fadeIn(500);
					var hourlable = ['i', 'ii', 'iii'],
					uvi, value, i = 0;
					var ulength = {"-2":"25", "-1":"25", 0:"25", 1:"25", 2:"40", 3:"55", 4:"70", 5:"85", 6:"100", 7:"115", 8:"130", 9:"145", 10:"160", 11:"175"}[weatherInfo.uvindex.currentuv.index]
					var utime = {"-2":0, "-1":0, 0:0, 1:125, 2:250, 3:375, 4:500, 5:625, 6:750, 7:1000, 8:1250, 9:1325, 10:1500, 11:1625}[weatherInfo.uvindex.currentuv.index]
					$('.info-slide-content.uvindex .currentuv .bar .cat').text(weatherInfo.uvindex.currentuv.desc)
					$('.info-slide-content.uvindex .currentuv .bar .num').text(weatherInfo.uvindex.currentuv.index)
					if (weatherInfo.uvindex.currentuv.index == "0" || weatherInfo.uvindex.currentuv.index == "-1" || weatherInfo.uvindex.currentuv.index == "-2") {
							$('.info-slide-content.uvindex .currentuv .bar').css("background", "rgba(0,0,0,0)")
					}
					$('.info-slide-content.uvindex .currentuv .bar').animate({height:ulength+"px"}, utime,function(){
							$('.info-slide-content.uvindex .currentuv .bar .cat').fadeTo('slow', 1);
							$('.info-slide-content.uvindex .currentuv .bar .num').fadeTo('slow', 1);
					});
					$('.info-slide-content.uvindex .forecastuv .bar').each(function(){
						var ulength = {"-2":"25", "-1":"25", 0:"25", 1:"25", 2:"40", 3:"55", 4:"70", 5:"85", 6:"100", 7:"115", 8:"130", 9:"145", 10:"160", 11:"175"}[weatherInfo.uvindex.forecast[i].index]
						var utime = {"-2":0, "-1":0, 0:0, 1:125, 2:250, 3:375, 4:500, 5:625, 6:750, 7:1000, 8:1250, 9:1325, 10:1500, 11:1625}[weatherInfo.uvindex.forecast[i].index]
						$('.info-slide-content.uvindex .forecastuv .bar.' + hourlable[i] + ' .cat').text(weatherInfo.uvindex.forecast[i].desc)
						$('.info-slide-content.uvindex .forecastuv .bar.' + hourlable[i] + ' .num').text(weatherInfo.uvindex.forecast[i].index)
						if (weatherInfo.uvindex.forecast[i].index == "0" || weatherInfo.uvindex.forecast[i].index == "-1" || weatherInfo.uvindex.forecast[i].index == "-2") {
							$('.info-slide-content.uvindex .forecastuv .bar.' + hourlable[i]).css("background", "rgba(0,0,0,0)")
						}
						$('.info-slide-content.uvindex .forecastuv .bar.' + hourlable[i]).animate({height:ulength+"px"}, utime,function(){
							//this = the

							$(this).find(".cat").fadeTo('slow', 1);
							$(this).find(".num").fadeTo('slow', 1);
						});
						i = i + 1
					})
					setTimeout(function() {
						$('.info-slide-content.uvindex').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
				}
				}
				,healthtip() {
					$('.info-slide.health .subhead-title').text('Weather Safety Tips');
					$('.info-slide-content.healthtip').fadeIn(500);
					setTimeout(function() {
						$('.info-slide-content.healthtip').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
				}
				,moreinfoimage() {
					$('.info-slide.health .subhead-title').text('');
					$('.info-slide-content.moreinfoimage').fadeIn(500);
					setTimeout(function() {
						$('.info-slide-content.moreinfoimage').fadeOut(500, function(){
							$('.info-slide.health').fadeOut(0);
							wait(0);
						});
					}, slideDelay);
				}
			},
				keys = Object.keys(displays);
				if (weatherInfo.reboot == true) {
					$('#info-slide-container').hide()
					return;
				}
				var daypart;
				if (idx<keys.length) {
					currentDisplay = displays[keys[idx]];
					currentDisplay();
				} else { // done - exit
					nextCity();
				}
				return;

				function wait(duration){
					setTimeout(function() {
						showHealth(++idx);
					}, duration);
				}
		}


		// show the set of slides for one city
		function showCitySlides(location, idx) {

			var currentDisplay,
				displays = {
					intro() {
						if (location == 0) {
						$('.city-slide-intro .segment').text(weatherInfo.currentCond.weatherLocs[location].displayname);
						$('.city-slide-intro').fadeIn(0);
						$('.city-slide-intro .weatherscancopyright').fadeIn(500);
						$('.city-slide-intro .cityaccent').fadeIn(500);
						$('.city-slide-intro .cityweatherscanmarquee').fadeIn(500);
						setTimeout(function() {
							$('.city-slide-intro .segment').fadeIn(500);
						}, 1000);
						setTimeout(function() {
							$('.city-slide-intro .weatherscancopyright .copyrighttext').fadeOut(500, function(){
								$('.city-slide-intro .weatherscancopyright .copyrighttext').css('font-size','15px')
								$('.city-slide-intro .weatherscancopyright .copyrighttext').text(`© ${new Date().getFullYear()} Weather Group Television LLC All Rights Reserved`)
							});
							$('.city-slide-intro .weatherscancopyright .copyrighttext').fadeIn(500);
						}, 5000);
						setTimeout(function() {
							$('.city-slide-intro .segment').fadeOut(500)
							$('.city-slide-intro .weatherscancopyright').fadeOut(500);
							$('.city-slide-intro .accent').fadeOut(500);
							$('.city-slide-intro .cityweatherscanmarquee').fadeOut(500, function() {
								$('.city-slide-intro').fadeOut(0);
								$('.city-slide-intro .weatherscancopyright .copyrighttext').css('font-size','28px')
								$('.city-slide-intro .weatherscancopyright .copyrighttext').text("Weatherscan is brought to you by The Weather Channel® and XFINITY TV")
								wait(0);
							});
						}, 10000);
					} else {wait(0)}
				}
				,showBulletin() {
						if (weatherInfo.bulletin.weatherLocs[location].enabled == true) {
						$('.bulletin .frost-pane .cityname').text(weatherInfo.bulletin.weatherLocs[location].displayname + " Area");
						//fade in
						$('.bulletin').fadeIn(0);
						$('.bulletin .frost-pane').fadeIn(500);

						$('#subhead-noaa').fadeIn(500);
						pages = weatherInfo.bulletin.weatherLocs[location].pages
						makewarningPage(0)
						function makewarningPage(warningpagenum) {
							if (warningpagenum > 0) {
								$('.bulletin .frost-pane').fadeOut(500, function() {
									$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
									$('.bulletin .frost-pane').fadeIn(500);
								});
							} else {
								$('.bulletin .frost-pane .warnings').html(pages[warningpagenum])
								$('.bulletin .frost-pane').fadeIn(500);
							}
							setTimeout(function() {
								if (warningpagenum < (pages.length - 1)) {
									makewarningPage(warningpagenum + 1)
								} else {
									$('.bulletin').fadeIn(0);
									$('.bulletin .frost-pane').fadeOut(500);
									$('#subhead-noaa').fadeOut(500, function() {
										$('.bulletin').fadeOut(0);
										wait(0)
									});
								}
							}, slideDelay);
						}
				} else {wait(0)};
				}

				// Currently (10 sec)
				,currentConditions() {
					$('.city-info-slide .subhead-title').text('Currently');
					$('.city-info-slide #subhead-city').text(weatherInfo.currentCond.weatherLocs[location].displayname);
					if (weatherInfo.currentCond.weatherLocs[location].noReport == true) {
						$('.city-info-slide .noreport').fadeIn(500)
						$('.city-info-slide').fadeIn(0);
						setTimeout(function() {
							$('.city-info-slide .noreport').fadeOut(500, function(){
								$('.city-info-slide').fadeOut(0);
								wait(0);
						});
						}, slideDelay);
					} else {
					var	strLabels =	'Humidity<br>Dew Point<br>Pressure<Br>Wind<br>',
						strData = weatherInfo.currentCond.weatherLocs[location].humid + '%<br>' + weatherInfo.currentCond.weatherLocs[location].dewpt + '<br>' + weatherInfo.currentCond.weatherLocs[location].pressure + " " + weatherInfo.currentCond.weatherLocs[location].pressureTrend + '<br>' + weatherInfo.currentCond.weatherLocs[location].wind + '<br>';
						strLabels+='Gusts<Br>';
						strData+=weatherInfo.currentCond.weatherLocs[location].gust +	'<br>';
					if (weatherInfo.currentCond.weatherLocs[location].feelslike.type != "dontdisplay") {
						strLabels+=weatherInfo.currentCond.weatherLocs[location].feelslike.type
						strData+=weatherInfo.currentCond.weatherLocs[location].feelslike.val
					}

					$('.city-info .frost-pane .labels').html(strLabels);
					$('.city-info .frost-pane .data').html(strData);

					// right pane
					$('.city-info .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.currentCond.weatherLocs[location].icon, weatherInfo.currentCond.weatherLocs[location].windspeed) + '")');
					//$('.info-slide-content.airport .frost-pane.right .icon').css('background-image', 'url("' + getCCicon(+obsData(0).iconCode, obsData(0).current.wind_speed) + '")');
					$('.city-info .conditions').text(weatherInfo.currentCond.weatherLocs[location].cond);
					$('.city-info .temp').text(weatherInfo.currentCond.weatherLocs[location].temp);
					weatherAudio.playCurrentConditions();

					//fadein
					$('.city-info-slide').fadeIn(0);
					$('.city-info').fadeIn(500);
					//fadeout and switch

					setTimeout(function() {
						$('.city-info').fadeOut(500, function(){
							wait(0);
						});
					}, slideDelay);
					}

				}
				,city8Slides(pidx){
					if (location == 0) {
					var pages = Math.ceil(citySlideList.length/4);
					if (weatherInfo.currentCond.city8slides.noReport == true) {
						$('.city-info-slide #subhead-city').fadeOut(0);
						$('.city-info-slide .subhead-title').text('Currently');
						$('.city-info-slide .tempunavailable').fadeIn(500)
						setTimeout(function() {
							$('.info-slide-content.aroundcityinfo').fadeOut(500);
							$('.city-info-slide .tempunavailable').fadeOut(500, function(){
								$('.city-info-slide').fadeOut(0)
								$('.city-info-slide #subhead-city').fadeIn(0);
								wait(0);
						});
						}, slideDelay);
					} else {
						$('.city-info-slide #subhead-city').fadeOut(0);
					function fillinfo() {

						pidx = (pidx===undefined ? 1 : pidx);

						//replace tomorrow
						var di = 0;
						for (var i = (pidx == 1) ? 0 : 4; i < 4*pidx || i < citySlideList.length; i++) {
							if (weatherInfo.currentCond.city8slides.cities[i]) {
								var divnumbers = ['i','ii','iii','iv']
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .cityname').text(weatherInfo.currentCond.city8slides.cities[i].displayname);
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .temp').text(weatherInfo.currentCond.city8slides.cities[i].temp);
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.currentCond.city8slides.cities[i].icon, weatherInfo.currentCond.city8slides.cities[i].windspeed) + '")');
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .wind').text(weatherInfo.currentCond.city8slides.cities[i].wind);
							} else {
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .cityname').text("");
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .temp').text("");
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .icon').css('background-image', 'url("' + "" + '")');
								$('.info-slide-content.aroundcityinfo .city.' + divnumbers[di] + ' .wind').text("")
							}
							di = di + 1
						}


					}
				fillinfo();
				$('.info-slide-content.aroundcityinfo').fadeIn(500);

					setTimeout( function() {

						if (pidx<pages) {
							$('.info-slide-content.aroundcityinfo').fadeOut(500, function() {
								currentDisplay(pidx+1);
								//fillinfo();
							});
						} else {
							$('.info-slide-content.aroundcityinfo').fadeOut(500, function() {
								$('.city-info-slide #subhead-city').fadeIn(0);
								$('.city-info-slide').fadeOut(0);
								wait(0);
							});
						}

					}, slideDelay)
				}
				} else {
					$('.city-info-slide').fadeOut(0);
					wait(0)
				}
				}
				// Local Doppler Radar or Radar/Satellite (15 sec, zoomed out with cloud cover)
				,localDoppler(){
					var showsat = Math.random()
					var locthing = (location == 0) ? maincitycoords : locList[location - 1]
					if (showsat <=  .5) {
						showRadar(locthing.lat, locthing.lon, 6, slideDelay, true);
					} else {
						showRadar(locthing.lat, locthing.lon, 8, slideDelay, false);
					}
					wait(slideDelay + 500);
				}

				// daypart / hourly
				,forecast(fidx) {
					//pick between day part or local forecast
					if (selectval === 2 || selectval === 3) {
						// reset tempbar animation
						if (weatherInfo.dayPart.weatherLocs[location].noReport == true) {
							$('.city-info-slide .subhead-title').text(weatherInfo.dayPart.weatherLocs[location].daytitle);
							$('.city-info-slide').fadeIn(0);
							$('.city-info-slide .tempunavailable').fadeIn(500)
							setTimeout(function() {
								$('.city-info-slide .tempunavailable').fadeOut(500, function(){
									wait(0);
							});
							}, slideDelay);
						} else {
						$('.info-slide-content.daypart .hour').each(function(){
								$('.info-slide-content.daypart .hour .tempbar').css("height", "0px")
								$('.info-slide-content.daypart .hour .tempbar .temp').css("opacity", "0%");
								$('.info-slide-content.daypart .hour .tempbar .wind').css("opacity", "0%");
							i = i + 1
						});
						//hour title
						$('.info-slide-content.daypart .hour.i .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[location].hour[0].time);
						$('.info-slide-content.daypart .hour.ii .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[location].hour[1].time);
						$('.info-slide-content.daypart .hour.iii .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[location].hour[2].time);
						$('.info-slide-content.daypart .hour.iv .thing .thingtext').text(weatherInfo.dayPart.weatherLocs[location].hour[3].time);

						//temp
						$('.info-slide-content.daypart .hour.i .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[location].hour[0].temp);
						$('.info-slide-content.daypart .hour.ii .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[location].hour[1].temp);
						$('.info-slide-content.daypart .hour.iii .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[location].hour[2].temp);
						$('.info-slide-content.daypart .hour.iv .tempbar .temp').text(weatherInfo.dayPart.weatherLocs[location].hour[3].temp);

						//wind
						$('.info-slide-content.daypart .hour.i .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[location].hour[0].wind);
						$('.info-slide-content.daypart .hour.ii .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[location].hour[1].wind);
						$('.info-slide-content.daypart .hour.iii .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[location].hour[2].wind);
						$('.info-slide-content.daypart .hour.iv .tempbar .wind').text(weatherInfo.dayPart.weatherLocs[location].hour[3].wind);

						$('.info-slide-content.daypart .hour.i .condition').text(weatherInfo.dayPart.weatherLocs[location].hour[0].cond);
						$('.info-slide-content.daypart .hour.ii .condition').text(weatherInfo.dayPart.weatherLocs[location].hour[1].cond);
						$('.info-slide-content.daypart .hour.iii .condition').text(weatherInfo.dayPart.weatherLocs[location].hour[2].cond);
						$('.info-slide-content.daypart .hour.iv .condition').text(weatherInfo.dayPart.weatherLocs[location].hour[3].cond);

						//icon
						$('.info-slide-content.daypart .hour.i .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[location].hour[0].icon, weatherInfo.dayPart.weatherLocs[location].hour[0].windspeed) + '")');
						$('.info-slide-content.daypart .hour.ii .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[location].hour[1].icon, weatherInfo.dayPart.weatherLocs[location].hour[1].windspeed) + '")');
						$('.info-slide-content.daypart .hour.iii .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[location].hour[2].icon, weatherInfo.dayPart.weatherLocs[location].hour[2].windspeed) + '")');
						$('.info-slide-content.daypart .hour.iv .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.dayPart.weatherLocs[location].hour[3].icon, weatherInfo.dayPart.weatherLocs[location].hour[3].windspeed) + '")');

						// calculate height of tempbars
						$('.city-info-slide .subhead-title').text(weatherInfo.dayPart.weatherLocs[location].daytitle);
						var temps = [];
						for (var i = 0; i < 4; i++) {
							temps.push(weatherInfo.dayPart.weatherLocs[location].hour[i].temp);
						}
						var min = Math.min(...temps),  // 54
							max = Math.max(...temps),  // 73
							range = ((max-min) != 0) ? (max-min) : .001,
							prange = (100-78), // percent range for bar height
							hourlable = ['i', 'ii', 'iii', 'iv'],
							temp, value, i = 0;
						$('.info-slide-content.daypart .hour').each(function(){
							temp = weatherInfo.dayPart.weatherLocs[location].hour[i].temp
							value = ((temp-min)/range) * prange + 78; // find percentage of range and translate to percent and add that to the starting css % height number
							valueii = (value/100) * 165 // multiply percentage by max height
							$('.info-slide-content.daypart .hour.' + hourlable[i] + ' .tempbar').animate({height:valueii+"px"}, 1500,function(){
								$('.info-slide-content.daypart .hour .tempbar .temp').fadeTo('slow', 1);
								$('.info-slide-content.daypart .hour .tempbar .wind').fadeTo('slow', 1);
							});
							i = i + 1
						})
						//play narration
						weatherAudio.playLocalforecastii();
						//fade in
						$('.city-info-slide').fadeIn(0);
						$('.info-slide-content.daypart').fadeIn(500);
						//for calculating when to show daypart
						selectval = selectval + 1
						//fadeout
						setTimeout(function() {
							$('.info-slide-content.daypart').fadeOut(500, function() {
								wait(0)
							});
						}, slideDelay);
						}
					} else {
						// Local Forecast -Today (10 sec)
							var div = '.info-slide-content.forecast '
							if (weatherInfo.dayDesc.weatherLocs[location].noReport == true) {
								$('.city-info-slide .subhead-title').text('Local Forecast');
								$('.city-info-slide').fadeIn(0);
								$('.city-info-slide .tempunavailable').fadeIn(500)
								$('.info-slide-content.forecast').fadeIn(500);
								$(div + '.title').empty()
								$(div + '.content').empty()
								setTimeout(function() {
									$('.info-slide-content.forecast').fadeOut(500);
									$('.city-info-slide .tempunavailable').fadeOut(500, function(){
										wait(0);
								});
								}, slideDelay);
							} else {
							function fillinfo() {

								fidx = (fidx===undefined ? 0 : fidx);

								$('.city-info-slide .subhead-title').text('Local Forecast');
								//replace tomorrow

								$(div + '.title').text(weatherInfo.dayDesc.weatherLocs[location].day[fidx].name);

								// content
								resizeText(weatherInfo.dayDesc.weatherLocs[location].day[fidx].desc);
								$(div + '.content').text(weatherInfo.dayDesc.weatherLocs[location].day[fidx].desc);

							}
						if (fidx === 0) {
							weatherAudio.playLocalforecasti();
						}

						$('.city-info-slide').fadeIn(0);
						fillinfo();
						$('.info-slide-content.forecast').fadeIn(500);

							setTimeout( function() {

								if (fidx<3) {
									$('.info-slide-content.forecast').fadeOut(500, function() {
										currentDisplay(fidx+1);
										//fillinfo();
									});
								} else {
									$('.info-slide-content.forecast').fadeOut(500, function() {
										selectval = selectval + 1
										if (selectval === 4) {selectval = 0}
										wait(0);
									});
								}

							}, slideDelay)
						}
					}
				}



				// Extended Forecast(5 day columns)
				,extendedForecast() {
					$('.city-info-slide .subhead-title').text('Extended Forecast');
					if (weatherInfo.fiveDay.weatherLocs[location].noReport == true) {
						$('.city-info-slide .tempunavailable').fadeIn(500)
						setTimeout(function() {
							$('.city-info-slide .tempunavailable').fadeOut(500, function(){
								$('.city-info-slide').fadeOut(0);
								wait(0);
						});
						}, slideDelay);
					} else {

					//days
					$('.info-slide-content.extended-forecast .thingday.iw').text(weatherInfo.fiveDay.weatherLocs[location].day[0].name)
					$('.info-slide-content.extended-forecast .thingday.iiw').text(weatherInfo.fiveDay.weatherLocs[location].day[1].name)
					$('.info-slide-content.extended-forecast .thingday.iiiw').text(weatherInfo.fiveDay.weatherLocs[location].day[2].name)
					$('.info-slide-content.extended-forecast .thingday.ivw').text(weatherInfo.fiveDay.weatherLocs[location].day[3].name)
					$('.info-slide-content.extended-forecast .thingday.vw').text(weatherInfo.fiveDay.weatherLocs[location].day[4].name)

					//icons
					$('.info-slide-content.extended-forecast .frost-pane.iw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[location].day[0].icon, weatherInfo.fiveDay.weatherLocs[location].day[0].windspeed) + '")');
					$('.info-slide-content.extended-forecast .frost-pane.iiw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[location].day[1].icon, weatherInfo.fiveDay.weatherLocs[location].day[1].windspeed) + '")');
					$('.info-slide-content.extended-forecast .frost-pane.iiiw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[location].day[2].icon, weatherInfo.fiveDay.weatherLocs[location].day[2].windspeed) + '")');
					$('.info-slide-content.extended-forecast .frost-pane.ivw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[location].day[3].icon, weatherInfo.fiveDay.weatherLocs[location].day[3].windspeed) + '")');
					$('.info-slide-content.extended-forecast .lfrost-pane.vw .icon').css('background-image', 'url("' + getCCicon(+weatherInfo.fiveDay.weatherLocs[location].day[4].icon, weatherInfo.fiveDay.weatherLocs[location].day[4].windspeed) + '")');

					//conditions
					$('.info-slide-content.extended-forecast .frost-pane.iw .conditions').text(weatherInfo.fiveDay.weatherLocs[location].day[0].cond);
					$('.info-slide-content.extended-forecast .frost-pane.iiw .conditions').text(weatherInfo.fiveDay.weatherLocs[location].day[1].cond);
					$('.info-slide-content.extended-forecast .frost-pane.iiiw .conditions').text(weatherInfo.fiveDay.weatherLocs[location].day[2].cond);
					$('.info-slide-content.extended-forecast .frost-pane.ivw .conditions').text(weatherInfo.fiveDay.weatherLocs[location].day[3].cond);
					$('.info-slide-content.extended-forecast .lfrost-pane.vw .conditions').text(weatherInfo.fiveDay.weatherLocs[location].day[4].cond);

					//high
					$('.info-slide-content.extended-forecast .frost-pane.iw .temphigh').text(weatherInfo.fiveDay.weatherLocs[location].day[0].high)
					$('.info-slide-content.extended-forecast .frost-pane.iiw .temphigh').text(weatherInfo.fiveDay.weatherLocs[location].day[1].high)
					$('.info-slide-content.extended-forecast .frost-pane.iiiw .temphigh').text(weatherInfo.fiveDay.weatherLocs[location].day[2].high)
					$('.info-slide-content.extended-forecast .frost-pane.ivw .temphigh').text(weatherInfo.fiveDay.weatherLocs[location].day[3].high)
					$('.info-slide-content.extended-forecast .lfrost-pane.vw .temphigh .temphightext').text(weatherInfo.fiveDay.weatherLocs[location].day[4].high)

					//low
					$('.info-slide-content.extended-forecast .frost-pane.iw .templow').text(weatherInfo.fiveDay.weatherLocs[location].day[0].low)
					$('.info-slide-content.extended-forecast .frost-pane.iiw .templow').text(weatherInfo.fiveDay.weatherLocs[location].day[1].low)
					$('.info-slide-content.extended-forecast .frost-pane.iiiw .templow').text(weatherInfo.fiveDay.weatherLocs[location].day[2].low)
					$('.info-slide-content.extended-forecast .frost-pane.ivw .templow').text(weatherInfo.fiveDay.weatherLocs[location].day[3].low)
					$('.info-slide-content.extended-forecast .lfrost-pane.vw .templow').text(weatherInfo.fiveDay.weatherLocs[location].day[4].low)

					$('.info-slide-content.extended-forecast').fadeIn(500);
					//buildailycalculating when to show daypart
					//fadeout
					setTimeout(function() {
						$('.info-slide-content.extended-forecast').fadeOut(500, function() {
								$('.city-info-slide').fadeOut(0);
							wait(0)
						});
					}, slideDelay);
				}
				}
				,almanac() {
					if (selectval === 1) {

						$('.info-slide-content.almanac .frost-pane.half .thing').text(weatherInfo.alamanac.date);
						$('.info-slide-content.almanac .frost-pane.half .ahightext').text(weatherInfo.alamanac.avghigh);
						$('.info-slide-content.almanac .frost-pane.half .alowtext').text(weatherInfo.alamanac.avglow);
						$('.info-slide-content.almanac .frost-pane.half .rhightext').text(weatherInfo.alamanac.rechigh);
						$('.info-slide-content.almanac .frost-pane.half .rlowtext').text(weatherInfo.alamanac.reclow);
						$('.info-slide-content.almanac .frost-pane.half .rhighyear').text(weatherInfo.alamanac.rechighyear);
						$('.info-slide-content.almanac .frost-pane.half .rlowyear').text(weatherInfo.alamanac.reclowyear);
						$('.info-slide-content.almanac .frost-pane.purple .sunrisetext').text(weatherInfo.alamanac.sunrise);
						$('.info-slide-content.almanac .frost-pane.purple .sunsettext').text(weatherInfo.alamanac.sunset);
						$('.city-info-slide .subhead-title').text('Almanac');
						$('.city-info-slide #subhead-city').text(weatherInfo.alamanac.displayname);
						$('.city-info-slide').fadeIn(0);
						$('.info-slide-content.almanac').fadeIn(500);
						setTimeout(function() {
							$('.info-slide-content.almanac').fadeOut(500, function() {
									$('.city-info-slide').fadeOut(0);
								wait(0)
							});
						}, slideDelay);
					} else {
						wait(0)
					};
				}
		},
		keys = Object.keys(displays);

		var daypart;
		if (weatherInfo.reboot == true) {
			$('#info-slide-container').hide()
			return;
		}
		if (idx<keys.length) {
			currentDisplay = displays[keys[idx]];
			currentDisplay();
		} else { // done - exit
			nextCity();
		}
		return;

		function wait(duration){
			setTimeout(function() {
				showCitySlides(location, ++idx);
			}, duration);
		}



		function resizeText(text){
			var s = 52,
				$container = $('.info-slide-content.forecast .content'),
				$test = $('<div style="position:absolute;top:100%;"></div>') .appendTo($container) .css('font-size', s + 'px') .css('line-height', '125%') .html(text);

			// have to display parent so we can get measurements
			$container.closest('.info-slide-content').show();

			$test.width($container.width() );
			while ($test.outerHeight(true) >= (400) ) {
				s -= 1;
				$test.css('font-size', s + 'px');
			}
			$container.closest('.info-slide-content').hide();
			$container .text(text) .css('font-size', s + 'px');
			$test.remove();

		}


		//doDisplay = displays[ keys[idx] ]();

			// increment the pointer
			//idx = (++idx===keys.length ? 0 : idx);

			//if (text) {
			//	$('#current-info').html(text);
			//	setTimeout(function(){ displayAtmospheric(idx) }, 6000); // 6 second increment loop
			//} else {
				// nothing to display - skip to the next one
			//	setTimeout(function(){ displayAtmospheric(idx) }, 0);
			//}

			/*
			(Main City)
			Currently (10 sec)
			Local Doppler Radar or Radar/Satellite (15 sec, zoomed out with cloud cover)

			Local Forecast
			-Today (10	 sec)
			-Tonight (10 sec)
			-Tomorrow (name day) (10 sec)
			-Tomorrow (name day) Night (10 sec)

			or

			Daypart

			Extended Forecast(5 day columns)
			Almanac (to be made)

			(Per City)
			Local Doppler Radar (center on city)
			Currently
			Local Doppler Radar
			Today's Forecast
			Extended Forecast(5 day columns)
			*/



			//idx++;
			//if (idx<=0){
				setTimeout(cityLoop, 3000);  // change to 60000 for production
			//} else {

			//}

		}


		function advanceHeader() {

			// swap current
			var $cities = $('#info-slides-header .city'),
				$scroller = $('#info-slides-header .hscroller'),
				left;
			//reload cityslide data from newweathermanager on loop complete
			if ($cities[1].classList.contains('loopcomplete')) {
				grabCitySlidesData()
				grabHealthData()
				grabCity8SlidesData()
				grabAlamanacSlidesData()
			}
			$($cities[0]).removeClass('current');
			$($cities[1]).addClass('current');

			// animate move left
			left = $scroller.position().left - $($cities[1]).position().left;
			$scroller.animate({ 'left':	left+'px' }, 700,
			function(){
				// on completion, move the old one to the end
				$scroller.css('left','');
				$($cities[0]).appendTo($scroller);
				$('#info-slides-header span').first().appendTo($scroller);
			})


		}

	function buildHeader(){
		$('#info-slides-header .hscroller').empty();
		var city, first, dname,
			cities='',
			arrow='<span class="divider-arrow" style="font-family: Zemestro Std ">&lt;</span>',
			radar='<span class="city radar">LOCAL RADAR</span>',
			firstradar='<span class="city radar current">LOCAL RADAR</span>',
			golf='<span class="city golf">GOLF</span>',
			beach='<span class="city beach">BOAT & BEACH</span>',
			health='<span class="city healthh loopcomplete">HEALTH</span>',
			airport='<span class="city airport ">AIRPORTS</span>';

			cities += arrow + '<span class="city" data-dname="' + '0' + '">' + maincitycoords.displayname + '</span>';
			var li = 1
		for (var location of locList) {
			if (location.displayname !== undefined) {
				city = location.displayname;
				cities += arrow+'<span class="city" data-dname="' + li + '">' + city + '</span>';
			}
			li = li + 1
		}

		$('#info-slides-header .hscroller').append(firstradar  + arrow + airport + cities + arrow + (radar + arrow + airport + arrow + health + cities + arrow).repeat(4));
	}

	buildHeaderGlobal = buildHeader

}  // end function
