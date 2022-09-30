/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 Elior "Mallowigi" Boukhobza
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const fs = require('fs');
const yaml = require('yaml');

// Replacements
let props = [
  ['name', 'name'],
  ['dark', 'dark'],
  ['scheme', 'scheme'],
  ['id', 'className'],
  ['background', 'background'],
  ['foreground', 'foreground'],
  ['text', 'text'],
  ['selectBg', 'selectBg'],
  ['selectFg', 'selectFg'],
  ['button', 'button'],
  ['second', 'second'],
  ['disabled', 'disabled'],
  ['contrast', 'contrast'],
  ['hc', 'background'],
  ['table', 'table'],
  ['border', 'border'],
  ['hl', 'hl'],
  ['tree', 'tree'],
  ['notif', 'notif'],
  ['accent', 'accent'],
  ['excluded', 'excluded'],
  ['links', 'links'],
  ['shadow', 'shadow'],
  ['comments', 'comments'],
  ['vars', 'vars'],
  ['operators', 'operators'],
  ['keywords', 'keywords'],
  ['functions', 'functions'],
  ['tags', 'tags'],
  ['error', 'error'],
  ['strings', 'strings'],
  ['attributes', 'attributes'],
  ['numbers', 'numbers'],
  ['parameters', 'parameters'],
  ['classes', 'classes'],
  ['gray', 'gray'],
  ['cyan', 'cyan'],
  ['purple', 'purple'],
  ['blue', 'blue'],
  ['red', 'red'],
  ['green', 'green'],
  ['yellow', 'yellow'],
  ['white', 'white'],
  ['orange', 'orange'],
];

// Function to replace placeholders in a text
const replacePlaceholders = (text, theme, props) => {
  let result = text;
  props.forEach(([placeholder, prop]) => {
    console.log(`Replacing ${placeholder} with property ${prop}: ${theme[prop]}`);
    result = result.replace(new RegExp(`%${placeholder}`, 'g'), theme[prop]);
    result = result.replace(new RegExp(`"@${placeholder}"`, 'g'), theme[prop]);
  });

  return result;
};

// Read the themes
const themesFile = fs.readFileSync('./src/main/resources/themes/themes.yml', 'utf8');
const themes = yaml.parse(themesFile);
const {material, other} = themes;
const allThemes = [...material, ...other];

// UserStyles
const template = fs.readFileSync('./src/main/resources/themes/root.template', 'utf8');
const file = './src/main/resources/themes/MaterialThemesRoot.user.css';

if (fs.existsSync(file)) {
  fs.unlinkSync(file);
}

fs.appendFileSync(file, `
/* ==UserStyle==
@name   Material Themes root
@namespace  https://www.material-theme.com
@version 1.0.0
@description Material Theme Root (variables)
@author Elior Boukhobza <elior@material-theme.com> (https://github.com/mallowigi)
@advanced text font-family "Font Family" "'Open Sans', 'Calibri', Tahoma, Helvetica, Arial"
@advanced text mono-font "Monospace Font" "'Operator Mono', 'Menlo', 'Consolas', 'Source Code Pro'"
@advanced dropdown theme "Theme" {
`, 'utf8');

allThemes.forEach(async (theme) => {
  const result = replacePlaceholders(template, theme, props);
  await fs.appendFileSync(`./src/main/resources/themes/MaterialThemesRoot.user.css`, result);
});

fs.appendFileSync(file, `
}
==/UserStyle== */

:root {
  /*[[theme]]*/
}

:root {
  --mat-font: /*[[font-family]]*/, sans-serif;
}

:root {
  --mat-mono: /*[[mono-font]]*/, monospace;
}
`, 'utf8');
