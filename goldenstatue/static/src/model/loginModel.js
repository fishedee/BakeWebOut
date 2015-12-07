import ReactFetch from 'fishfront/react/react-fetch';
import BaseModel from './baseModel';

export default Models.createClass({
	mixins:[BaseModel],
	name:'loginModel',
	initialize(){
		this.state = null;
	},
	async isLogin(){
		this.state = await this.fetchGet('/client/isLogin',{})
		return this.state;
	},
	async login(){
		return await this.fetchGet('/client/login',{
			callback:location.href
		})
	},
	async checkHasPhone(){
		return this.fetchGet('/client/checkHasPhone',{})
	},
	async getPhoneCaptcha(phone){
		this.fetchPost('/client/getPhoneCaptcha',{
			phone:phone
		})
	},
	async registerPhone(phone,captcha){
		this.fetchPost('/client/registerPhone',{
			phone:phone,
			captcha:captcha
		})
	},
	get(){
		return this.state
	}
});