import babel from 'babel-polyfill';
import MvcServer from 'fishfront/react/react-mvc-server';
import WebpackConfig from '../webpack.config';

var route = __dirname +'/config/route';

var mvcServer = new MvcServer();
mvcServer.setWebPackConfig(WebpackConfig);
mvcServer.setRoute(route);
mvcServer.setPort(8081);
mvcServer.setWebPackJson(__dirname+"/../build/webpack-assets.json");
mvcServer.setStaticDir(__dirname+'/public');
mvcServer.run();
