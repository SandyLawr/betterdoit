import { Component } from '@angular/core';
import {TodoInterface} from './shared/interfaces/todo-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'Yakalélo Yakalélo';

  /**
   * //Pour collection de tableau on met un s à la fin du mot
   * @var todos: TodoInterface[]
   * //tableau d'interface Todo
   */
  public todos: TodoInterface[];

  /**
   * @var aTodo:String
   * Nouveau todo à ajouter à notre taleau
   */
  public aTodo:String;

  

/**
 * Constructeur de la classe AppComponent
 * Invoqué dès la création d'un objet de type AppComponent
 */
// dès qu'un new app component sera entrée, on rentrera directement dans le constructeur
// Il refuse qu'on mette des chaine de caractères car il veut des objets 
// donc on remplace this.todos = ['Nouveau todo']; par this.todos = [{title:'Nouveau todo'}];
// par contre, on ne peut pas mettre title avec un T majuscule
  public constructor() {
    this.todos = [];
    this.aTodo = '';
  }

  /**
   * Ajoute un todo au tabelau des todos
   * @return void
   */
  public addTodo():void {
    //this.todos.push({title: this.aTodo, isChecked: false });
    this.aTodo="";
  }

  public checkUnCheckAll() {
    this.checkedStatus = !this.checkedStatus;
    //Appelle la méthode privée pour changer le status des todos
    this._check();
  }
  /**
   * Détermine si le bouton Ajouter doit être actif ou non
   */
  public notEnoughForMe(): Boolean {
    return this.aTodo.length >= 5 ? false : true;
  }

  /**
   * Déterminite l'étatd'un todo checked or not
   * @param TodoInterface todo le todo à tester
   */
  public isChecked(todo: TodoInterface): Boolean {
    return todo.isChecked;
  }
  /**
   * Supprime un todo
   * @param index: number Indice de l'élément à supprimer du tableau
   */
  public delete(index: number): void {
    console.log('Okay, je dois enlever l\'élément à l\'indice : '+index);
    this.todos.splice(index, 1);
  }

  /**
   * Basculer l'état de isCheked d'un todo
   * @param index: number Indice de l'élément à supprimer du tableau
   */
  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
  }

  /**
   * Change l'état de tous les todos
   */
  private _check(): void {
    for(let index = 0; index < this.todos.length; index++) {
      this.todos[index].isChecked = this.checkedStatus;
    }
  }
  /**
   * Supprime les todos cochés
   */
  public deleteChecked() {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].isChecked) {
        this.todos.splice(i, 1);
      }
    }
    if (this.todos.length ===0) {
      this.checkedStatus = false;
    }
  }
  
//Autre méthode pour fair ela même chose que deleteChecked
//Mais il prend plus d'espace en mémoire
/**
 * Supprime
 *Je parcours mon tableau original. Si elle n'est pas coché, je la supprime
 *une fois fini, mon tableau temporaire, je l'envoie dans le tableau original
 */
  public deleteCheckedTwo() {
    const _todos: TodoInterface[] = []

    for (const todo of this.todos) {
      if (!todo.isChecked) {
        _todos.push(todo);
      }
    }
    this.todos = _todos;

    if (this.todos.length ===0) {
      this.checkedStatus = false;
    }
  }

/**
 * Détermine si oui ou non aucune boite n'est cochée
 */
  public noneChecked(): Boolean {
    let status: Boolean = true;

    for (const todo of this.todos) {
      if (todo.isChecked) {
        status =  false;
      }
    }
    return status;
  }
  
  public changeTitle(): void {
    this.title = 'Hola Angular';
  }
}
