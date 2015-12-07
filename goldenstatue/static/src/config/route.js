import AppController from '../controller/appController';
import PuzzleActivityController from '../controller/puzzleActivityController';
import PuzzleActivityClientController from '../controller/puzzleActivityClientController';
import NotFoundController from '../controller/notFoundController';
import {Route,IndexRoute} from 'fishfront/react/react-mvc';
import Env from 'fishfront/runtime/env';

function asyncLoader(moduleLoader){
	if( Env.isInBrowser() ){
		return (location,cb)=>{
			moduleLoader((result)=>{cb(null,result.default)});
		}
	}else{
		return (location,cb)=>{
			cb(null,moduleLoader);
		}
	}
}

export default (
	<Route path="/" getComponent={asyncLoader(AppController)}>
		<Route path="puzzleactivity/:contentId" getComponent={asyncLoader(PuzzleActivityController)} />
		<Route path="puzzleactivity/:contentId/:clientId" getComponent={asyncLoader(PuzzleActivityClientController)} />
		<IndexRoute getComponent={asyncLoader(NotFoundController)}/>
		<Route path="*" getComponent={asyncLoader(NotFoundController)}/>
	</Route>
);