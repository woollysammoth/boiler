import { filter } from 'minimatch';
import { normalize, resolve } from 'path';

const cleanFilename = name => name.replace(/(^\/(Scenes|Components\/(routes|async))\/|(\/index)?\.js$)/g, '');
const normalizePath = path => normalize(path).replace(/\\/g, '/');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
  	let src = env.src;
  	let app = dir => resolve(env.src + "/app", dir);

	let cssIncludes = [	
		src + "/app/Components", 
		src + "/app/Scenes", 
		src + "/public/css"
	];

	//Configure Webpack for our custom paths (CSS and code splitting)
  	config.module.loaders.forEach(function(load){

  		//Code splitting
  		if(load.loader && load.loader.indexOf("async-component-loader") !== -1){
  			load.include = [
				filter(app('Scenes')+'/{*.js,*/index.js}'),
				filter(app('Components')+'/{routes,async}/{*.js,*/index.js}')
  			];

  			load.options = {
				name(filename) {
					filename = normalizePath(filename);
					let relative = filename.replace(normalizePath(src), '');
					if (!relative.includes('/Scenes/')) return false;
					return 'route-' + cleanFilename(relative);
				},
				formatName(filename) {
					filename = normalizePath(filename);
					let relative = filename.replace(normalizePath(source('.')), '');
					return cleanFilename(relative);
				}
			};
  		}

  		//CSS
  		if(load.test.toString() === /\.(css|less|s[ac]ss|styl)$/.toString()){
  			if(load.include) load.include = cssIncludes
  			if(load.exclude) load.exclude = cssIncludes;
  		}
  	});
}