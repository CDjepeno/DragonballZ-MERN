import axios from 'axios';
import { FIGHTERS_API, FIGHTER_API } from "../config";
import { Fighter } from '../pages/fighter-list';
 
export default class FighterService {
 
    static getFighters(): Promise<Fighter[]> {
        return axios
        .get(FIGHTERS_API)
        .then(response => response.data)
        .catch(error => this.handleError(error));
    }
        
    static getFighter(id: any): Promise<Fighter|null> {
        return axios
        .get(FIGHTER_API + id)
        .then(response => response.data)
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }

    static addFighter(fighter: Fighter): Promise<Fighter> {
        return axios 
            .post(FIGHTER_API, fighter)
            .then(response => response.data)
            .catch(error => this.handleError(error));
    }

    static deleteFighter(id: string): Promise<{}> {
        return axios
            .delete(FIGHTER_API + id)
            .then(response => response.data)
            .catch(error => this.handleError(error));
    }

    static updateFighter(id: string, object: any): Promise<Fighter> {
        return axios
            .put(FIGHTER_API + id, object)
            .then(response => response.data)
            .catch(error => this.handleError(error));
    }
    
    static searchFighter(term: string): Promise<Fighter[]> {
        return fetch(`http://localhost:3001/fighters?q=${term}`)
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }


    // Si l'api nous renvoi un objet vide
    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error):void {
        console.error(error)
    }
}