import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// importer les modules d'observation
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from './../interfaces/todo-interface';
import { Constants } from './../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
  /**
   * Définit un Sujet observable de type TodoInterface
   * i.e. On observe un TodoInterface
   */
  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();

  /**
   * Injection de la dépeendance HttpClient
   * @param _api:  HttpClient Transport vers le backend
   */
  constructor(private _api: HttpClient) { }

  /**
   * Injection d'une méthode getTodos
   */
  // la ligne 29 dit type number de valeur null
  // retourne un tableau d'élement de type intefarce
  //TodoInterface ne retourne que des observables donc on va le prendre en compte
  //retourne un objet du type observable
  // il va falloir rendre ses observables réels
  // si tu n'a s riendans ta base, ça renvoie "null"
  public getTodos(id: number = null): Observable<TodoInterface[]> {
    if (id !== null) {
      this. _api.get<TodoInterface[]>(
      //cote back end, jutilise un get ou récupérer les élément dans la database
      Constants._API_ROOT+'/'+id);
      //on lui dit où aller chercher le tableau
    } else {
      return this. _api.get<TodoInterface[]>(
        Constants._API_ROOT
      );
    }
  let _todos: TodoInterface[] = [];

  return
}

// je définis une méthode public qui est addtodo
// Elle utilise la méthode POST
// je récupère les observables
// j'ai besoin de 2 paramètres : l'API back end et l'objet que je dois lui transmettre
// le résultat de mon formulaire
// je vais souscrire au todo qui vient d'être ajouter : le résultat
// j'en profite pour ajouter le isChecked
// J'utilise la méthode pour diffuser le nouveau todo à tous ceux qui on souscrit
// grâce à la méthode sendTodo
  public addTodo(todo: TodoInterface) {
    this. _api.post<TodoInterface[]>(
      Constants._API_ROOT,
      todo
    ).subscribe((addedTodo) => {
      addedTodo[0].isChecked = false;
      this.sendTodo(addedTodo[0]);

          //On n'oublie pas de transmettre le todo modifié
    const _emptyTodo = {
      title: '',
      begin: new Date(),
      end: new Date()
    }

    this.sendTodo(_emptyTodo);
  });
}

public updateTodo(todo: TodoInterface): void {
  this._api.put<TodoInterface>(
   Constants._API_ROOT+'/'+todo.id,
    todo
  ).subscribe((result) => {
    //On n'oublie pas de transmettre le todo modifié
    const _emptyTodo = {
      title: '',
      begin: new Date(),
      end: new Date()
    }
    this.sendTodo(todo);
    this.sendTodo(_emptyTodo);
});
}
  
// delete todo
public deleteTodo(todo: TodoInterface): void {
  this. _api.delete(
    Constants._API_ROOT+ '/' +todo.id
  ).subscribe((result) => {
//removeTodo[0].isChecked = false;
//    this.sendTodo(removeTodo[0]);
});
}

  /**
   * Méthode permettant aux autres classes de souscrire (s'abonner) au sujet
   */
  public getTodo(): Observable<TodoInterface> {
    return this.todoSubject.asObservable();
  }

/**
 * Diffuse le sujet vers les abonnés
 * @param todo TodoInterface un todo qui passe par là
 */
  public sendTodo(todo: TodoInterface) {
    this.todoSubject.next(todo);
  }
}
