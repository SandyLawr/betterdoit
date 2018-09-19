import { MatColumns } from "../interfaces/mat-columns";

export class MatTableHelper {
    protected todoTableMap: Map<String, MatColumns> = new Map(); // String est le type de la clé dans le Map


    /**
     * Retourne le tableau des colonnes à afficher à partir du Map défini
     * Cette méthode n'accepte aucun paramètre et retournera un tableau de chaines
     * Donc on définti un tableau de chaines juste en dessous
     * et on met un return to Display à la fin
     */
    public getDisplayedColumns(): String[] {
        const toDisplay: String[] = [];

    /** il va parcourir tout ce qu'il y a dans le map. 
     * Dès qu'il en trouve un, il va ranger la valeur dasn le premier élément 
     * et le title dans 2è élément (key)  
     * */
        this.todoTableMap.forEach((column, key) => {
            if (column.isDisplayed) {
                toDisplay.push(column.value);
            }
        });
        return toDisplay;
    }

    /**
     * Retourne un des éléments du map
     * @param key
     */
    public getColumn(key: String): MatColumns{
        return this.todoTableMap.get(key);
        }
    
    /**
    * Retourne la liste des colonnes otpionnelles
    */
    public getOptionalColumns(): MatColumns[] {
        const toDisplay: MatColumns[] = [];

        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                toDisplay.push(column);
            }
        });
        return toDisplay;
    }

    /**
    * Retourne la liste des colonnes otpionnelles
    */
   public optionalColumnsToArray(): String[] {
    const toDisplay: String[] = [];

    this.todoTableMap.forEach((column, key) => {
        if (!column.always) {
            toDisplay.push(column.value);
        }
    });
    return toDisplay;
}
    
    /**
     * Retourne la liste de colonne à aficher
     * @param userSelection Tableau contenant la sélection utilisateur
     */
    public setDisplayedColumns(userSelection: String[]): String[] {
        this.todoTableMap.forEach((columns, key) => {
        if(!columns.always) {
            if (userSelection.indexOf(columns.value) === -1) {
            columns.isDisplayed = false;
            } else {
            columns.isDisplayed = true;
            }
            this.todoTableMap.set(key,columns);
        }
        });
        return this.getDisplayedColumns();
    }

}
