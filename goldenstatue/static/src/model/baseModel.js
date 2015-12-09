import ReactFetch from 'fishfront/react/react-fetch';

export default {
	fetch:ReactFetch.fetch,
	getDataUrlEncode(data){
		var result = [];
		for( var i in data ){
			result.push(i + "=" + encodeURIComponent(data[i]))
		}
		return result.join("&");
	},
	getDataForm(data){
		var form = new FormData()
		for( var i in data ){
			form.append(i, data[i])
		}
		return form
	},
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
}