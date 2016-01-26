import Env from 'fishfront/runtime/env';
import babel from "babel-polyfill";
import {Mvc} from 'fishfront/react/react-mvc';
import Route from './config/route';

var mvc = new Mvc();
mvc.setRoute(Route);
if( Env.isInWeixin()){
	mvc.setHistory('hash');
}
mvc.render();