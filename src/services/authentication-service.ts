import axios from 'axios'
import { LOGIN_API } from '../config';
import jwtDecode from 'jwt-decode'

export default class AuthenticationService {

    static login(credentials: any): Promise<any> {
        return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data)
            .then(data => {
                window.localStorage.setItem("token", data.token)
                window.localStorage.setItem("roles", data.user[0].role)
                this.setAxiosToken(data.token)
            })
            .catch(error => this.handleError(error))
    }

    static isAuthenticatedUser() {
        const token = window.localStorage.getItem('token')
        const role = window.localStorage.getItem('roles')

        if(token) {
            const jwtData = jwtDecode(token)

            if(jwtData.exp > new Date().getTime() / 1000) {
                if(role && role.split('').every(a => a === "user")) {
                    return true
                } else {
                    return false
                }
            }
        }
        return false
    }

    static isAuthenticatedManager() {
        const token = window.localStorage.getItem('token')
        const role = window.localStorage.getItem('roles')

        if(token) {
            const jwtData = jwtDecode(token)

            if(jwtData.exp > new Date().getTime() / 1000) {
                if(role && role.split(',').includes("user") && role.split('').includes("manager") ) {
                    return true
                } else {
                    return false
                }
            }
        }
        return false
    }


    static setAxiosToken(token: string) {
        axios.defaults.headers["Authorization"] = "Bearer " + token
    }

    static handleError(error: Error):void {
        console.log(error)
    }
}