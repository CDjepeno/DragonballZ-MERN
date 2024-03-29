import axios from 'axios'
import { LOGIN_API, REGISTER_API } from '../config';
import jwtDecode from 'jwt-decode'

export default class AuthenticationService {

    static logout() {
        window.localStorage.removeItem('token')
        delete axios.defaults.headers["Authorization"]
        window.localStorage.removeItem('roles')
    }

    static login(credentials: any): Promise<any> {
        return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data)
            .then(data => {
                window.localStorage.setItem("token", data.token)
                window.localStorage.setItem("roles", data.user[0].role)
                this.setAxiosToken(data.token)
                console.log(data);
                
            })

    }

    static register(credentials: any): Promise<any> {
        return axios
            .post(REGISTER_API, credentials)
            .then(response => response.data)
            .then(data => console.log(data))

    }

    static isAuthenticatedUser() {
        const token = window.localStorage.getItem('token')
        const role = window.localStorage.getItem('roles')

        if(token) {
            const jwtData = jwtDecode(token)

            if(jwtData.exp > new Date().getTime() / 1000) {
                if(role && role === "user") {
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
                if(role && role.split(',').includes("user") && role.split(',').includes("manager") ) {
                    return true
                } else {
                    return false
                }
            }
        }
        return false
    }

    static setup() {
        const token = window.localStorage.getItem('token')

        if(token) {
            const jwtData = jwtDecode(token)
            if(jwtData.exp > new Date().getTime() / 1000) {
                this.setAxiosToken(token)
            }
        }
    }


    static setAxiosToken(token: string) {
        axios.defaults.headers["Authorization"] = "Bearer " + token
    }

    static handleError(error: Error):void {
        console.log(error)
    }
}