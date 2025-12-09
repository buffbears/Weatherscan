# Weatherscan IntelliStar Simulator

Weatherscan simulation in HTML/JS/CSS with **easily accessible weather APIs** (OpenWeatherMap + RainViewer)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](https://nodejs.org/)

Visit https://weatherscan.me/?Philadelphia for a demo

---

## 🎉 New: Migrated to Free & Accessible APIs!

This fork has been **completely migrated** to use publicly accessible weather APIs:
- ✅ **OpenWeatherMap** (free tier: 1,000 calls/day) - [Get API Key](https://openweathermap.org/api)
- ✅ **RainViewer** (completely free) - No API key needed!
- ✅ **Mapbox** (free tier: 50,000 loads/month) - [Get API Key](https://www.mapbox.com/)

**All APIs are publicly accessible with free tiers.** No special arrangements needed!

---

## 🚀 Quick Start (Docker - Recommended)

### Prerequisites
- Docker & Docker Compose installed
- OpenWeatherMap API key ([sign up here](https://openweathermap.org/api))
- Mapbox API key ([sign up here](https://www.mapbox.com/))

### Setup (3 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/your-fork/Weatherscan.git
cd Weatherscan

# 2. Copy environment template
cp .env.example .env

# 3. Edit .env and add your API keys
# OPENWEATHER_API_KEY=your_key_here
# MAPBOX_API_KEY=your_key_here
nano .env  # or use your preferred editor

# 4. Start the application
docker-compose up -d

# 5. Open your browser
# http://localhost:8080
```

That's it! 🎊

### View Logs
```bash
docker-compose logs -f
```

### Stop Application
```bash
docker-compose down
```

---

## 💻 Running Locally (Without Docker)

### Prerequisites
- [Node.js 16+](https://nodejs.org/en/) installed
- OpenWeatherMap API key
- Mapbox API key

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure API keys
# Edit webroot/js/config.js:
var api_key = 'your_openweathermap_api_key';
var map_key = 'your_mapbox_api_key';

# 3. Start the application
npm start

# 4. Open http://localhost:8080 in your browser
```

---

## 📚 Documentation

- **[Complete Setup Guide](SETUP_GUIDE.md)** - Comprehensive setup instructions
- **[API Migration Analysis](API_MIGRATION_ANALYSIS.md)** - Detailed technical analysis
- **[Integration Examples](webroot/js/weather-integration-example.js)** - Code examples

---

## 🌟 Features

### Weather Data
- ✅ Current conditions (temperature, humidity, wind, pressure, etc.)
- ✅ Hourly forecast (48 hours)
- ✅ Daily forecast (8 days, up from 5!)
- ✅ Weather alerts and warnings
- ✅ Air quality index
- ✅ UV index
- ✅ Animated radar (RainViewer)
- ✅ Satellite imagery (infrared)

### What's Different from weather.com API?
| Feature | weather.com | New Implementation | Status |
|---------|-------------|-------------------|--------|
| Current conditions | ✅ | ✅ OpenWeatherMap | ✅ 100% |
| Forecasts | ✅ | ✅ OpenWeatherMap | ✅ 100% |
| Radar tiles | ✅ | ✅ RainViewer | ✅ 100% |
| Satellite | ✅ | ✅ RainViewer | ✅ 100% |
| Weather alerts | ✅ | ✅ OpenWeatherMap | ✅ 100% |
| Air quality | ✅ | ✅ OpenWeatherMap | ✅ 100% |
| UV index | ✅ | ✅ OpenWeatherMap | ✅ 100% |
| Pollen data | ✅ | ⚠️ Optional (Ambee) | ⚠️ Optional |
| Health indices | ✅ | ⚠️ Can be calculated | ⚠️ Optional |

**Note**: Pollen and specialized health indices are optional features that can be added via [Ambee API](https://www.getambee.com/) (100 free calls/day) or by removing those slides.

---

## 🔧 Advanced Configuration

### Environment Variables (.env)

```bash
# Required
OPENWEATHER_API_KEY=your_key
MAPBOX_API_KEY=your_key

# Optional
AMBEE_API_KEY=            # For pollen data (optional)
HTTP_PORT=8080            # Web server port
CORS_PORT=8081            # CORS proxy port
CACHE_TTL_MINUTES=10      # Cache duration
ENABLE_POLLEN=false       # Enable/disable pollen
ENABLE_RADAR=true         # Enable/disable radar
ENABLE_SATELLITE=true     # Enable/disable satellite
```

### Docker Commands

```bash
# Build and start
npm run docker:compose:build

# Just start
npm run docker:compose

# Stop
npm run docker:stop

# Build image only
npm run docker:build

# Run without compose
npm run docker:run
```

---

## 🛠️ Development

```bash
# Install all dependencies (including dev)
npm install

# Start development server with live reload
npm run dev

# Build CSS (if using Gulp)
gulp
```

---

## 📖 API Usage Examples

### Get Weather Data
```javascript
// Wait for APIs to initialize
window.addEventListener('apisReady', async function() {
  // Get weather for a location
  const weather = await weatherAPI.getCompleteWeatherData(40.7128, -74.0060);

  console.log('Temperature:', weather.current.temperature + '°F');
  console.log('Conditions:', weather.current.wxPhraseLong);
  console.log('5-day forecast:', weather.daily);
});
```

### Search Locations
```javascript
const results = await weatherAPI.searchLocation('Philadelphia', 5);
console.log('Found locations:', results);
```

### Setup Radar
```javascript
const timestamps = await radarAPI.getRadarTimestamps();
const tileUrl = radarAPI.getRadarTileUrl(timestamps.current, z, x, y);
```

See [weather-integration-example.js](webroot/js/weather-integration-example.js) for complete examples.

---

## 🐛 Troubleshooting

### "API key not configured" error
- Check that your API keys are set in `.env` (Docker) or `config.js` (local)
- OpenWeatherMap keys take ~10 minutes to activate after creation

### CORS errors
- Ensure the CORS proxy is running (port 8081)
- Check Docker logs: `docker-compose logs -f`

### No radar displayed
- Check browser console for errors
- Verify RainViewer service is accessible
- Check network tab in browser DevTools

### Rate limit exceeded
- Increase `CACHE_TTL_MINUTES` in `.env`
- Default cache (10 min) uses ~400-800 calls/day (within free tier)

More troubleshooting: [SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting)

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔗 Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api/one-call-3)
- [RainViewer API Docs](https://www.rainviewer.com/api.html)
- [Mapbox API Docs](https://docs.mapbox.com/)
- [Original Weatherscan Project](https://github.com/Jessecar96/Weatherscan)

---

## 💬 Community

**Stay up to date:**
- Discord Server: https://discord.gg/WeatherRanch
- Report Issues: [GitHub Issues](https://github.com/your-fork/Weatherscan/issues)

---

## 🙏 Acknowledgments

- Original Weatherscan project by [Jessecar96](https://github.com/Jessecar96)
- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Radar/Satellite: [RainViewer](https://www.rainviewer.com/)
- Maps: [Mapbox](https://www.mapbox.com/)

---

## ⚡ Performance

With built-in caching (10-minute TTL):
- ~400-800 API calls/day (well within free tier of 1,000)
- Weather refresh: every 10 minutes
- Radar refresh: every 5 minutes
- 24/7 operation: ✅ Sustainable on free tier
