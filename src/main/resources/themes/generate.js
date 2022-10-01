const fs = require('fs');
const yaml = require('yaml');
const handlebars = require('handlebars');

// Parse themes
const themesFile = fs.readFileSync('./src/main/resources/themes/themes.yml', 'utf8');
const allThemes = yaml.parse(themesFile);
const {material, other} = allThemes;
const themes = [...material, ...other];

// Read template
const templateFile = fs.readFileSync('./src/main/resources/themes/MaterialThemesRoot.hbs', 'utf8');

// Handlebars config
handlebars.registerHelper('add', (string, value) => string + value);

// Compile hbs
const context = {themes}
const template = handlebars.compile(templateFile)
const compiled = template(context);
// write result
fs.writeFileSync('./src/main/resources/themes/MaterialThemesRoot.user.css', compiled)
