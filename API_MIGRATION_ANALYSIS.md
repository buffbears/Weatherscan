# Weather API Migration Analysis
## Replacing Weather.com API with Accessible Alternatives

---

## Executive Summary

This Weatherscan IntelliStar simulator was originally built using the **Weather.com API** (TWC/IBM). This document analyzes the original implementation and documents the migration to publicly accessible weather APIs with available free tiers.

### Current State
- **20+ unique weather.com endpoints** across v1, v2, and v3 APIs
- **1,326 lines** of weather data fetching code (`newweathermanager.js`)
- **Complex aggregated API calls** combining multiple data types
- **Specialized data**: radar tiles, satellite imagery, health indices, airport weather

### Recommended Solution
**Primary API**: **OpenWeatherMap One Call API 3.0**
**Supplementary APIs**: RainViewer (radar), Open-Meteo (backup/additional data)
**Estimated Migration Effort**: Moderate (2-3 week development effort for complete replacement)

---

## Current Weather.com API Implementation

### API Endpoints by Category

#### 1. **Location & Geocoding** (3 endpoints)
| Endpoint | Purpose | Usage in App |
|----------|---------|--------------|
| `/v3/location/search` | Search locations by name | User input, autocomplete |
| `/v3/location/point` | Get location by coordinates | Convert lat/lon to location info |
| `/v3/location/near` | Find nearby locations | Auto-populate nearby cities |

#### 2. **Current Conditions** (1 endpoint)
| Endpoint | Data Retrieved |
|----------|----------------|
| `/v3/aggcommon/v3-wx-observations-current` | Temperature, conditions, humidity, dew point, pressure, wind, feels-like temps, visibility, UV, cloud ceiling, sunrise/sunset |

#### 3. **Forecasts** (3 endpoints)
| Endpoint | Data Retrieved |
|----------|----------------|
| `/v3/aggcommon/v3-wx-forecast-daily-5day` | 5-day daily forecast with day/night details |
| `/v3/aggcommon/v3-wx-forecast-hourly-2day` | 48-hour hourly forecast |
| `/v3/wx/forecast/daily/5day` | Extended daily forecast |

#### 4. **Severe Weather** (2 endpoints)
| Endpoint | Purpose |
|----------|---------|
| `/v3/aggcommon/v3alertsHeadlines` | Active weather alerts/warnings |
| `/v3/alerts/detail` | Detailed alert information |

#### 5. **Almanac** (1 endpoint)
| Endpoint | Data |
|----------|------|
| `/v3/aggcommon/v3-wx-almanac-daily-1day` | Historical avg/record temps, years |

#### 6. **Health & Environmental** (5 endpoints)
| Endpoint | Data Type |
|----------|-----------|
| `/v1/geocode/{lat}/{lon}/observations/pollen.json` | Pollen counts & forecasts |
| `/v2/indices/achePain/daypart/3day` | Aches & pain index |
| `/v2/indices/breathing/daypart/3day` | Respiratory health index |
| `/v3/wx/globalAirQuality` | Air quality index & pollutants |
| `/v2/indices/uv/current` & `/hourly/48hour` | UV index current & forecast |

#### 7. **Radar & Satellite** (4 endpoints)
| Endpoint | Purpose |
|----------|---------|
| `/v3/TileServer/tile/radar` | Radar overlay tiles (256x256) |
| `/v3/TileServer/tile/twcRadarMosaic` | Composite radar mosaic |
| `/v3/TileServer/tile/satrad` | Satellite imagery tiles |
| `/v3/TileServer/series/productSet/PPAcore` | Available timestamps for animation |

#### 8. **Airport Weather** (1 endpoint)
| Endpoint | Purpose |
|----------|---------|
| `/v3/aggcommon/v3-location-point;v3-wx-observations-current` | Weather at airports by IATA code |

### Data Request Pattern
```javascript
// Example aggregated request
var url = "https://api.weather.com/v3/aggcommon/" +
          "v3alertsHeadlines;v3-wx-forecast-daily-5day;" +
          "v3-wx-observations-current;v3-wx-forecast-hourly-2day" +
          "?geocodes=" + lat + "," + lon +
          "&language=en-US&units=e&format=json&apiKey=" + api_key;
```

---

## Alternative APIs Analysis

### Option 1: OpenWeatherMap (RECOMMENDED)

#### Availability & Pricing
- **Free Tier**: 1,000 calls/day, 60 calls/minute
- **One Call API 3.0**: $0/month for up to 1,000 calls/day
- **Sign-up**: Easy, instant API key generation
- **Documentation**: Excellent, well-maintained

#### Data Coverage Comparison

| Feature | Weather.com | OpenWeatherMap 3.0 | Coverage |
|---------|-------------|-------------------|----------|
| Current conditions | ✅ | ✅ | **100%** |
| Hourly forecast | ✅ (48h) | ✅ (48h) | **100%** |
| Daily forecast | ✅ (5-day) | ✅ (8-day) | **100%+** |
| Minute-by-minute | ❌ | ✅ (1h) | **Bonus** |
| Weather alerts | ✅ | ✅ | **100%** |
| Air quality | ✅ | ✅ | **100%** |
| UV index | ✅ | ✅ | **100%** |
| Historical data | ✅ | ✅ (since 1979) | **100%** |
| Pollen data | ✅ | ❌ | **0%** ⚠️ |
| Health indices | ✅ | ❌ | **0%** ⚠️ |
| Radar tiles | ✅ | ❌ | **0%** ⚠️ |
| Satellite tiles | ✅ | ❌ | **0%** ⚠️ |

#### API Endpoints Mapping

**One Call API 3.0 Endpoint**: `https://api.openweathermap.org/data/3.0/onecall`

Single request provides:
```json
{
  "current": {
    "temp": 72,
    "feels_like": 70,
    "pressure": 1013,
    "humidity": 65,
    "dew_point": 58,
    "uvi": 5.2,
    "clouds": 40,
    "visibility": 10000,
    "wind_speed": 10,
    "wind_deg": 180,
    "weather": [{"id": 801, "main": "Clouds", "description": "few clouds"}]
  },
  "minutely": [{"dt": 1234567890, "precipitation": 0}], // Next 60 minutes
  "hourly": [...], // Next 48 hours
  "daily": [...],  // Next 8 days
  "alerts": [...]  // Active weather alerts
}
```

**Additional Endpoints Available**:
- Geocoding API: `http://api.openweathermap.org/geo/1.0/direct` (replaces location search)
- Reverse geocoding: `http://api.openweathermap.org/geo/1.0/reverse`
- Air Quality: `http://api.openweathermap.org/data/2.5/air_pollution`
- Historical: `https://api.openweathermap.org/data/3.0/onecall/timemachine`

#### Missing Data Solutions

**For Radar/Satellite Tiles** → Use **RainViewer API** (free)
```javascript
// RainViewer radar tiles
https://tilecache.rainviewer.com/v2/radar/{timestamp}/{z}/{x}/{y}/256/1_1.png

// Get available timestamps
https://api.rainviewer.com/public/weather-maps.json
```

**For Pollen Data** → Options:
1. Use **Ambee Pollen API** (free tier: 100 calls/day)
2. Remove pollen slides (less critical feature)
3. Use **Tomorrow.io** (1,000 calls/month free, includes pollen)

**For Health Indices** → Options:
1. Calculate from weather data (simple formulas available)
2. Remove health slides (less critical feature)
3. Use **Tomorrow.io** comprehensive health data

---

### Option 2: Open-Meteo (Completely Free Alternative)

#### Availability & Pricing
- **100% Free**: No API key required, no rate limits for non-commercial use
- **High Performance**: 10 million requests/day capacity
- **Open Data**: Uses national weather services (NOAA, DWD, etc.)

#### Data Coverage

| Feature | Coverage | Notes |
|---------|----------|-------|
| Current conditions | ✅ | Every 15 minutes |
| Hourly forecast | ✅ (16 days) | Excellent |
| Daily forecast | ✅ (16 days) | Better than weather.com |
| Minute-by-minute | ❌ | Not available |
| Weather alerts | ⚠️ | US only via NWS |
| Air quality | ✅ | CAMS European model |
| UV index | ✅ | Included |
| Historical data | ✅ (since 1940) | Excellent |
| Pollen | ❌ | Not available |
| Radar/satellite | ❌ | Not available |

#### API Example
```javascript
// Single endpoint for most data
https://api.open-meteo.com/v1/forecast?
  latitude=40.7128&longitude=-74.0060&
  current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&
  hourly=temperature_2m,precipitation,weather_code&
  daily=temperature_2m_max,temperature_2m_min,weather_code&
  temperature_unit=fahrenheit&
  wind_speed_unit=mph&
  timezone=America/New_York
```

**Advantages**:
- No API key management
- No rate limit concerns
- Very fast response times
- Open-source friendly

**Disadvantages**:
- Less detailed weather descriptions
- Limited alert coverage (US only)
- No pollen or specialized health data
- No radar/satellite tiles

---

### Option 3: National Weather Service (NWS) - US Only

#### Availability & Pricing
- **100% Free**: Government service, no API key
- **Coverage**: United States only
- **Data Quality**: Excellent (source data for many commercial APIs)

#### Data Coverage
- Current observations ✅
- Hourly/daily forecasts ✅
- Weather alerts ✅ (excellent coverage)
- Radar imagery ✅ (via different service)
- Limited to US locations ❌

**Best Used**: As supplementary data source for US-based alerts

---

### Option 4: Tomorrow.io (Freemium)

#### Availability & Pricing
- **Free Tier**: 1,000 API calls/month, 3 calls/second
- **Paid Plans**: Start at $25/month

#### Data Coverage
- ✅ All standard weather data
- ✅ Health indices (aches/pains, breathing)
- ✅ Pollen data
- ✅ Air quality
- ❌ Radar tiles (proprietary format)

**Best For**: All-in-one solution if health/pollen data is critical

---

## Recommended Migration Strategy

### Phase 1: Core Weather Data (PRIORITY)
**Use OpenWeatherMap One Call API 3.0**

Replace these weather.com endpoints:
- ✅ Current observations → `onecall` current object
- ✅ Hourly forecast (48h) → `onecall` hourly array
- ✅ Daily forecast (5-day) → `onecall` daily array (8 days available)
- ✅ Weather alerts → `onecall` alerts array
- ✅ Air quality → separate air pollution endpoint
- ✅ UV index → included in current & hourly

**Implementation Changes**:
```javascript
// NEW: Single aggregated call replaces multiple weather.com calls
async function grabCitySlidesData() {
  const promises = [maincitycoords, ...locList].map(async (loc) => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?` +
      `lat=${loc.lat}&lon=${loc.lon}&` +
      `units=imperial&` +
      `exclude=minutely&` +
      `appid=${OPENWEATHER_API_KEY}`;

    const response = await fetch(url);
    return response.json();
  });

  const weatherData = await Promise.all(promises);
  // Process data into weatherInfo structure
}
```

**Data Mapping**:
```javascript
// Weather.com → OpenWeatherMap
temperature              → current.temp
wxPhraseLong            → current.weather[0].description
iconCode                → current.weather[0].id (requires icon mapping)
relativeHumidity        → current.humidity
temperatureDewPoint     → current.dew_point
pressureAltimeter       → current.pressure
windDirectionCardinal   → calculated from current.wind_deg
windSpeed               → current.wind_speed
windGust                → current.wind_gust
temperatureFeelsLike    → current.feels_like
visibility              → current.visibility
uvDescription           → current.uvi (requires category mapping)
```

### Phase 2: Radar & Satellite (PRIORITY)
**Use RainViewer API (Free)**

Replace weather.com radar endpoints:
```javascript
// Get available radar timestamps
const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
const data = await response.json();
const timestamps = data.radar.past.map(frame => frame.time);

// Load radar tiles
const tileUrl = `https://tilecache.rainviewer.com/v2/radar/${timestamp}/{z}/{x}/{y}/256/1_1.png`;
```

**Options for Satellite**:
1. Use RainViewer's infrared satellite: `/v2/satellite/{timestamp}/{z}/{x}/{y}/256/0_0.png`
2. Remove satellite feature (less critical than radar)
3. Use static satellite from other free sources

### Phase 3: Location Services
**Use OpenWeatherMap Geocoding API**

Replace weather.com location endpoints:
```javascript
// Location search
const searchUrl = `http://api.openweathermap.org/geo/1.0/direct?` +
  `q=${searchTerm}&limit=5&appid=${OPENWEATHER_API_KEY}`;

// Reverse geocoding (coordinates → location name)
const reverseUrl = `http://api.openweathermap.org/geo/1.0/reverse?` +
  `lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_API_KEY}`;
```

### Phase 4: Optional/Enhanced Features

**Option A: Remove Health Features** (Simplest)
- Remove pollen slides
- Remove aches/breathing indices
- Focus on core weather functionality

**Option B: Add Pollen via Ambee** (Limited free tier)
```javascript
const pollenUrl = `https://api.ambeedata.com/latest/pollen/by-lat-lng?` +
  `lat=${lat}&lng=${lon}`;
// Headers: 'x-api-key': AMBEE_API_KEY
// Free tier: 100 calls/day
```

**Option C: Use Tomorrow.io for Complete Coverage** (Paid or limited free)
- Includes all health indices
- Includes pollen data
- 1,000 calls/month free

### Phase 5: Almanac Data
**Use OpenWeatherMap Historical API**

```javascript
// Get historical data for records
const historicalUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?` +
  `lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${OPENWEATHER_API_KEY}`;
```

**Alternative**: Pre-calculate almanac data and store locally (more efficient)

---

## Icon Code Mapping

Weather.com uses proprietary icon codes (1-47). OpenWeatherMap uses different codes.

**Create mapping function**:
```javascript
function mapOWMIconToWeathercom(owmWeatherId) {
  // OpenWeatherMap weather condition codes → Weather.com icon codes
  const iconMap = {
    // Thunderstorm
    200: 38, 201: 38, 202: 38, // Thunderstorm with rain
    210: 37, 211: 37, 212: 37, // Thunderstorm
    221: 37, 230: 38, 231: 38, 232: 38,

    // Drizzle
    300: 9, 301: 9, 302: 9, 310: 9, 311: 9, 312: 9, 313: 9, 314: 9, 321: 9,

    // Rain
    500: 11, 501: 12, 502: 12, 503: 12, 504: 12,
    511: 10, // Freezing rain
    520: 11, 521: 11, 522: 12, 531: 12,

    // Snow
    600: 14, 601: 16, 602: 16, 611: 10, 612: 10, 613: 10,
    615: 5, 616: 5, 620: 14, 621: 14, 622: 16,

    // Atmosphere
    701: 20, 711: 22, 721: 19, 731: 19, 741: 20, 751: 19, 761: 19, 762: 19, 771: 23, 781: 0,

    // Clear
    800: 32, // Day clear (use 31 for night)

    // Clouds
    801: 30, 802: 28, 803: 28, 804: 26
  };

  return iconMap[owmWeatherId] || 44; // Default to N/A
}
```

**Note**: OpenWeatherMap also provides icon codes like "01d", "02n" which include day/night. Use these for more accurate icon selection.

---

## Implementation Checklist

### Step 1: Setup
- [ ] Create OpenWeatherMap account → Get API key
- [ ] Test API key with sample requests
- [ ] Update `config.js` with new API key variable
- [ ] (Optional) Sign up for RainViewer, Ambee, or Tomorrow.io

### Step 2: Core Functions Refactor
- [ ] Create new `openweathermap-adapter.js` module
- [ ] Implement data transformation functions
- [ ] Create icon mapping function
- [ ] Replace `grabCitySlidesData()` function
- [ ] Replace `grabCity8SlidesData()` function
- [ ] Replace `grabTravelData()` function
- [ ] Replace `grabInternationalData()` function

### Step 3: Forecast Functions
- [ ] Update current conditions parsing
- [ ] Update hourly forecast parsing (day-part slides)
- [ ] Update daily forecast parsing (5-day slides)
- [ ] Update extended forecast slides

### Step 4: Alerts & Severe Weather
- [ ] Implement OpenWeatherMap alerts parsing
- [ ] Update `grabAlerts()` function
- [ ] Test severe weather mode triggers
- [ ] Update bulletin slides

### Step 5: Location Services
- [ ] Replace location search with geocoding API
- [ ] Update `settings.js` location search
- [ ] Update reverse geocoding functions

### Step 6: Radar & Satellite
- [ ] Integrate RainViewer API
- [ ] Update `radar.js` tile loading
- [ ] Implement timestamp fetching
- [ ] Test radar animation
- [ ] (Optional) Add satellite tiles or remove feature

### Step 7: Special Features
- [ ] Update almanac data (or use local database)
- [ ] Update air quality parsing
- [ ] Update UV index parsing
- [ ] **Decision**: Remove or replace health indices (pollen, aches, breathing)

### Step 8: Testing
- [ ] Test with multiple locations
- [ ] Test international locations
- [ ] Test severe weather scenarios
- [ ] Test data refresh intervals
- [ ] Verify API rate limits not exceeded

### Step 9: Documentation
- [ ] Update README with new API requirements
- [ ] Document API key setup process
- [ ] Update configuration instructions
- [ ] Document any removed features

---

## Code Structure Recommendation

Create a modular adapter pattern for easy API swapping:

```javascript
// api-adapters/openweathermap.js
class OpenWeatherMapAdapter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openweathermap.org/data/3.0';
  }

  async getCurrentConditions(lat, lon) {
    const data = await this.fetchOneCall(lat, lon);
    return this.transformCurrent(data.current);
  }

  async getHourlyForecast(lat, lon) {
    const data = await this.fetchOneCall(lat, lon);
    return this.transformHourly(data.hourly);
  }

  async getDailyForecast(lat, lon) {
    const data = await this.fetchOneCall(lat, lon);
    return this.transformDaily(data.daily);
  }

  transformCurrent(current) {
    // Map OpenWeatherMap structure to weatherInfo structure
    return {
      temp: current.temp,
      cond: current.weather[0].description,
      icon: mapOWMIconToWeathercom(current.weather[0].id),
      // ... more mappings
    };
  }

  // ... more methods
}

// Usage in newweathermanager.js
const weatherAPI = new OpenWeatherMapAdapter(api_key);
```

---

## Cost & Rate Limit Analysis

### Current Usage Pattern
The app makes approximately **15-30 API calls per data refresh** depending on:
- Number of extra locations configured
- Number of travel/international cities
- Number of airport locations

Refresh interval: ~5-10 minutes (estimated from code)

**Daily API calls**: ~2,000-4,000 calls/day (for continuous operation)

### OpenWeatherMap Free Tier
- **Limit**: 1,000 calls/day
- **Status**: ⚠️ **May exceed free tier** for 24/7 operation

**Solutions**:
1. **Increase refresh interval** to 15-30 minutes (acceptable for weather data)
2. **Batch requests** more efficiently (One Call API reduces calls by ~60%)
3. **Cache aggressively** - weather data doesn't change that often
4. **Upgrade to paid tier** - $40/month for 100,000 calls/month

### Recommended Caching Strategy
```javascript
const cache = {
  data: null,
  timestamp: 0,
  ttl: 10 * 60 * 1000 // 10 minutes
};

async function fetchWithCache(lat, lon) {
  if (Date.now() - cache.timestamp < cache.ttl) {
    return cache.data; // Return cached data
  }

  cache.data = await weatherAPI.getCurrentConditions(lat, lon);
  cache.timestamp = Date.now();
  return cache.data;
}
```

**With proper caching**: ~400-800 calls/day (well within free tier)

---

## Migration Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Icon codes don't match | Visual inconsistency | Create comprehensive mapping table, test thoroughly |
| Missing health data | Feature loss | Remove slides or use alternative API |
| Rate limit exceeded | App stops working | Implement caching, increase refresh intervals |
| Different data formats | Parsing errors | Extensive testing, error handling |
| Radar tiles incompatible | Radar doesn't work | Use RainViewer, update tile loading logic |
| Location search differs | User experience change | Map geocoding API responses carefully |

---

## Timeline Estimate

| Phase | Estimated Time | Priority |
|-------|----------------|----------|
| Setup & API testing | 2 hours | High |
| Core weather data migration | 8-12 hours | High |
| Radar/satellite integration | 4-6 hours | High |
| Location services | 2-4 hours | High |
| Alerts & severe weather | 3-4 hours | Medium |
| Icon mapping & testing | 4-6 hours | High |
| Health features decision | 2-4 hours | Low |
| Comprehensive testing | 6-8 hours | High |
| Documentation | 2-3 hours | Medium |
| **Total** | **35-50 hours** | |

**Timeline**: 1-2 weeks for complete migration with thorough testing

---

## Conclusion

**Recommended Approach**:

1. **Primary API**: OpenWeatherMap One Call API 3.0
   - Covers 90% of current functionality
   - Free tier sufficient with caching
   - Excellent documentation and community support
   - Easy to obtain API key

2. **Radar/Satellite**: RainViewer API
   - Completely free
   - High-quality radar tiles
   - Simple integration

3. **Trade-off**: Remove health indices (pollen, aches/breathing)
   - These are nice-to-have features
   - Not core to weather display
   - Significantly reduces complexity

4. **Future Enhancement**: Consider Tomorrow.io paid tier if health data becomes essential

This approach provides the best balance of:
- ✅ Publicly accessible API with straightforward registration
- ✅ Free or low-cost operation
- ✅ Comprehensive weather data coverage
- ✅ Minimal feature loss (optional health slides)
- ✅ Sustainable long-term solution

---

## Additional Resources

### API Documentation
- [OpenWeatherMap One Call API 3.0](https://openweathermap.org/api/one-call-3)
- [OpenWeatherMap Geocoding API](https://openweathermap.org/api/geocoding-api)
- [RainViewer API Documentation](https://www.rainviewer.com/api.html)
- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
- [Ambee Pollen API](https://docs.ambeedata.com/)

### Icon Mappings
- [OpenWeatherMap Weather Conditions](https://openweathermap.org/weather-conditions)
- [Weather.com Icon Code Reference](https://github.com/manifestinteractive/weather-underground-icons)

### Testing Tools
- [Postman](https://www.postman.com/) - API testing
- [Thunder Client](https://www.thunderclient.com/) - VS Code API testing extension
