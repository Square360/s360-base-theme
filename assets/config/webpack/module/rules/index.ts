import fontsConfig from './fonts.config';
import imagesConfig from './images.config';
import scriptsConfig from './scripts.config';
import stylesConfig from './styles.config';

let rules: any[] = [];

rules.push(fontsConfig);
rules.push(imagesConfig);
rules.push(scriptsConfig);
rules.push(stylesConfig);

export { rules as WEBPACK_MODULE_RULES };
