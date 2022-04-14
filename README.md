# Weatherscan Simulator 
[![Join our discord](https://discord.com/api/guilds/901963652649848892/widget.png?style=shield)](https://discord.gg/KqyDsnjFgg) 

Weatherscan simulation in PWA (Progressive web application), coded in **HTML/JS/CSS**
#### Visit https://weatherscan.tk/?philadelphia for a demo of the PWA

# Installation

### Running locally and development
1. Download & Install [node.js LTS](https://nodejs.org/en/)
2. Get weather.com and mapbox.com API keys.
3. Navigate to `/webroot/js` and create `secrets.js`.
4. Open `secrets.js` and type `var api_key = 'YOUR_API_KEY'`. Replace YOUR_API_KEY with the weather.com API key.
5. On a new line, type `var map_key = 'YOUR_API_KEY'`. Replace YOUR_API_KEY with the mapbox.com API key.
6. In terminal, run `npm install --production` in the root folder of this project. This will install any dependencies.
7. In terminal, run `npm start` in the root folder of this project. This will start a local web server.
8. Follow the link in the console output.

# Screenshots
#### Weatherscan simulator in normal mode
![image](https://user-images.githubusercontent.com/38764606/163455365-435dfa26-6c9b-4351-96d6-e280a141b1e8.png)
#### Weatherscan simulator in severe weather mode
![image](https://user-images.githubusercontent.com/38764606/163454458-04d2938f-cfad-4f75-81b7-a95feb3f9d49.png)
