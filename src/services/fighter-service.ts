import Fighter from "../models/fighter";
 
export default class FighterService {
 
    static getFighters(): Promise<Fighter[]> {
        return fetch('http://localhost:3001/fighters')
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }
        
    static getFighter(id: number): Promise<Fighter|null> {
        return fetch(`http://localhost:3001/fighters/${id}`)
        .then(response => response.json())
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }

    static updateFighter(fighter: Fighter): Promise<Fighter> {
        return fetch(`http://localhost:3001/fighters/${fighter.id}`,{
            method : 'PUT',
            body   : JSON.stringify(fighter),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }
    
    static addFighter(fighter: Fighter): Promise<Fighter> {
        // delete fighter.created;

        return fetch(`http://localhost:3001/fighters`,{
            method : 'POST',
            body   : JSON.stringify(fighter),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }
    
    static deleteFighter(fighter: Fighter): Promise<{}> {
        return fetch(`http://localhost:3001/fighters/${fighter.id}`,{
            method : 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })
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