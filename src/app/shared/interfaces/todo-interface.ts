export interface TodoInterface {
    /**
     * @var (optional) id: number
     * Identifiant du todo
     */
    id?: number;
    // quand on définit un modèle, avec le ? on peut définir si la 
    //valeur de l'attribut est obligatoire ou optionel
    // ? signifie optionel car il n'arrive qu'après avoir
    // mis l'objet dans la table mysql

    /**
     * Titre du Todo
     * @var String
     */
    title: String;

    /**
     * Titre du Todo
     * @var Date begin
     */
    begin: Date;

    /**
     * Titre du Todo
     * @var Date end
     */
    end: Date;

    /**
     * Titre du Todo
     * @var String
     */
    isChecked?: boolean;
}
