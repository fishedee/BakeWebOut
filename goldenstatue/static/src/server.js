import babel from 'babel-polyfill';
import MvcServer from 'fishfront/react/react-mvc-server';
import WebpackConfig from '../webpack.config';

var route = __dirname +'/config/route';

var mvcServer = new MvcServer();
mvcServer.setWebPackConfig(WebpackConfig);
mvcServer.setRoute(route);
if( process.env.NODE_ENV == 'production'){
	mvcServer.setPort(8081);
}else{
	mvcServer.setPort(8082);
}
mvcServer.setWebPackJson(__dirname+"/../build/webpack-assets.json");
mvcServer.setStaticDir(__dirname+'/public');
mvcServer.run();
