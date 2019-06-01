var manifestJSON = require("./public/manifest.json");

pwaArgs = {
  themeColor: manifestJSON.theme_color,
  name: manifestJSON.short_name,
  msTileColor: manifestJSON.background_color
};

module.exports = {
  pwa: {
    themeColor: '#ffffff',
    msTileColor: '#ffffff'
  }
}; 
