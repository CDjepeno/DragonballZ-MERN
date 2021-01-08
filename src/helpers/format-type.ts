const formatType = (type: string): string => {
    let color: string;
   
    switch (type) {
      case 'Sayan': 
        color = 'yellow lighten-1'; 
        break; 
      case 'Namek': 
        color = 'green lighten-1'; 
        break; 
      case 'Pride Toopers': 
        color = 'red lighten-1'; 
        break; 
      case 'Dieu de la destruction': 
        color = 'marron lighten-1'; 
        break; 
      case 'Hitman': 
        color = 'blue lighten-3'; 
        break; 
      case 'Planet freezer': 
        color = 'purple lighten-3'; 
        break; 
      case 'Cyborg': 
        color = 'orange accent-1'; 
        break; 
      default: 
        color = 'grey'; 
        break; 
    }
   
    return `chip ${color}`;
}

export default formatType;
