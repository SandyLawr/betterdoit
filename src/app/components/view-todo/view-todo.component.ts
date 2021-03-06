import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TodoService} from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';

// Importation des composants MAterial
import { MatTableDataSource, MatPaginator, MatSort, MatSelect, MatOption } from '@angular/material'; //new ajout

import { TodoHelper } from '../../shared/helpers/todo-helper';
import { MatColumns } from '../../shared/interfaces/mat-columns';


@Component({
  selector: 'view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss']
})
export class ViewTodoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  
  /**
   * Abonnement à un todo qui vient de l'espace
   * (meuh non.. de TodoService.)
   */
  private todoSubscription: Subscription;

  public todos: TodoInterface[];

  /**
   * Instance de la classe TodoHElper
   */
  public helper: TodoHelper;

  public checkedStatus: boolean = false;

  /**
   * Source des données pour le tableau MAterial
   */
  public dataSource = new MatTableDataSource<TodoInterface>();

  /**
   * Colonnes utilisées dans mat-table
   */
  public columns = new FormControl;




  public selectedValue : String[];

//Selectionné par l'utilisateur
public selectedOptions : String[]; 


 
  constructor(private todoService: TodoService) { 
    this.todos = []; //Définit le tableau des todos à afficher

    // Instancie le helper
    this.helper = new TodoHelper();
    this.selectedValue = this.helper.optionalColumnsToArray();

    this.todoSubscription = this.todoService.getTodo()
    //va renvoyer un observable d'un sujet (todoInterface)
    .subscribe((todo) => {
      console.log('Observable Todo : '+JSON.stringify(todo));
      // Ajoute le todo à la liste des todos
      // s'il n'existe pas déjà
      // Attention, s'il existe d"jà, ej dois remplacer par les nouvelles valeurs
      const index = this.todos.findIndex((obj) => obj.id == todo.id);
      if (index === -1 && todo.hasOwnProperty('id')) {
        this.todos.push(todo);
      }else {
        this.todos[index] = todo;
      }  
      this.dataSource.data = this.todos;
    });
  }

  /**
   * Après construction de l'objet, on charge la liste
   * des todos existant dans la base
   */
  ngOnInit() {
    // Récupère les todos existants dans la base
    // On s'y abonne (subscribe()) car ce sont des observables
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('Il y a '+this.todos.length+' todos à afficher');

      // On définti à ce moment la source de données
      this.dataSource.data = this.todos;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Retourne le label associé aux éléments à afficher
   * @param index Indice à récupérer dans le tableau
   */
  public getLabel(index: number):String {
    return this.availableColumns[index].label;
  }

  
  public checkUnCheckAll() {
    this.checkedStatus = !this.checkedStatus;
    //Appelle la méthode privée pour changer le status des todos
    this._check();
  }

   /**
   * Déterminite l'étatd'un todo checked or not
   * @param TodoInterface todo le todo à tester
   */
  public isChecked(todo: TodoInterface): Boolean {
    return todo.isChecked;
  }

    /**
   * Supprime un todo de la todos list
   */

  public delete(todo: TodoInterface): void {
    const index= this.todos.indexOf(todo);
    const _todo = this.todos[index];  // Récupère le todo
    this.todos.splice(index, 1);  // Dépile l'élément
    this.dataSource.data = this.todos;
    this.todoService.deleteTodo(_todo);  // Appelle le service en lui passant mon todo
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
    else {
      this.todoService.deleteTodo(todo);
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

public update(todo) {
  // Emet le todo cliqué vers les autres composants
  this.todoService.sendTodo(todo);
}

public changeView(event: any): void {
  this.helper.setDisplayedColumns(this.selectedOptions);

}

}
