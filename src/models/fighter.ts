export default class Fighter {
    // 1. Typage des propiétés d'un fighter.
    id: number;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: Array<string>;
    created: Date;
     
    // 2. Définition des valeurs par défaut des propriétés d'un fighter.
    constructor(
     id: number,
     hp: number = 100,
     cp: number = 10,
     name: string = 'name',
     picture: string = 'http://...',
     types: Array<string> = ['Normal'],
     created: Date = new Date()
    ) {
     // 3. Initialisation des propiétés d'un fighters.
     this.id = id;
     this.hp = hp;
     this.cp = cp;
     this.name = name;
     this.picture = picture;
     this.types = types;
     this.created = created;
    }
   }