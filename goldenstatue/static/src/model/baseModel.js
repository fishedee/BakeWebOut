import ReactFetch from 'fishfront/react/react-fetch';

export default {
	fetchJson:ReactFetch.fetchJson,
	_getFetchUrl(url){
		var host = window.location.hostname;
		var apiUrl = 'http://api.'+host+url;
		return apiUrl;
	},
	async fetchGet(url,data){
		var resultJson = await this.fetchJson({
			method:'get',
			data:data,
			url:this._getFetchUrl(url),
			xhrFields:{
				withCredentials:true,
			},
		});
		if( resultJson.code != 0 ){
			throw new Error( resultJson.msg );
		}
		return Immutable.fromJS(resultJson.data);
	},
	async fetchPost(url,data){
		var resultJson = await this.fetchJson({
			method:'post',
			data:data,
			url:this._getFetchUrl(url),
			xhrFields:{
				withCredentials:true,
			},
			headers:{
				"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
			}
		});
		if( resultJson.code != 0 ){
			throw new Error( resultJson.msg );
		}
		return Immutable.fromJS(resultJson.data);
	},
	/*
	async fetchGet(url,data){
		var value = new Date().valueOf();
		var host = window.location.hostname;
		var apiUrl = 'http://api.'+host+url+"/"+value+'?'+this.getDataUrlEncode(data);
		var result = await this.fetch(apiUrl,{credentials:'include'});
		var resultJson = await result.json();
		if( resultJson.code != 0 ){
			throw new Error( resultJson.msg );
		}
		return Immutable.fromJS(resultJson.data);
	},
	async fetchPost(url,data){
		var value = new Date().valueOf();
		var host = window.location.hostname;
		var apiUrl = 'http://api.'+host+url+"/"+value;
		var result = await this.fetch(apiUrl,{
			credentials:'include',
			method:'post',
			headers:{
				"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
			},
			body:this.getDataUrlEncode(data)
		});
		var resultJson = await result.json();
		if( resultJson.code != 0 ){
			throw new Error( resultJson.msg );
		}
		return Immutable.fromJS(resultJson.data);
	}
	*/
}