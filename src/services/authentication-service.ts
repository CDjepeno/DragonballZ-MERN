import axios from 'axios'
import { LOGIN_API } from '../config';

export default class AuthenticationService {
    static isAuthenticated: boolean = false;

    static login(credentials: any): Promise<any> {
        return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data)
            .then(data => {
                window.localStorage.setItem("token", data.token)
                window.localStorage.setItem("roles", data.user[0].role)
                this.setAxiosToken(data.accesstoken)
            })
            .catch(error => this.handleError(error))
    }


    static setAxiosToken(token: string) {
        axios.defaults.headers["Authorization"] = "Bearer " + token
    }

    static handleError(error: Error):void {
        console.log(error)
    }
}