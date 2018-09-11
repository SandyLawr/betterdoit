export class Constants {
    // utiliser les capacités de javascript pour obtenir un get
    //sans avoir à instancier notre classe Constants
    // les constants sont définits en majuscule (API_ROOT)
    public static get _API_ROOT(): string {
        return 'http://127.0.0.1:3000/Todos/';
    }
}
