import { MatTableHelper } from "./mat-table-helper";

export class TodoHelper extends MatTableHelper {
    
    
    public constructor() {
        super();
        
        this.todoTableMap.set(
            'title',
            {title: 'A faire', always: true, value: 'title', isDisplayed: true}
        );
        this.todoTableMap.set(
            'begin',
            {title: 'De..', always: false, value: 'begin', isDisplayed: true}
        );  // title (ce qui sera affiché), always (si je choisis ou non de pouvois l'afficher), 
            // value (la façon dont Angular a de reconnaitre la colonne)
            // isDisplayed (la colonne sera toujours affiché par défaut quand on va lancer l'application)
        this.todoTableMap.set(
            'end',
            {title: 'A..', always: false, value: 'end', isDisplayed: true}
        );
        this.todoTableMap.set(
            'update',
            {title: '', always: true, value: 'update', isDisplayed: true}
        );
        this.todoTableMap.set(
            'delete',
            {title: '', always: true, value: 'delete', isDisplayed: true}
        );
    }
}