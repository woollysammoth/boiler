//Webpack custom paths
var filePrefix = "/root/git/boiler/src";
var cssIncludes = [	
	filePrefix + "/app/Components", 
	filePrefix + "/app/Scenes", 
	filePrefix + "/public/css"
];

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
  	let babelLoader = helpers.getLoadersByName(config, 'babel-loader')[0];
  	let babelConfig = babelLoader.options;
  
  	//babelConfig.plugins.push('');
  	//babelConfig.env = {}

	//Webpack custom paths for CSS
  	config.module.loaders.forEach(function(load){
  		if(load.test.toString() === /\.(css|less|s[ac]ss|styl)$/.toString()){
  			if(load.include) load.include = cssIncludes
  			if(load.exclude) load.exclude = cssIncludes;
  		}
  	});
}