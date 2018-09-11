import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl, 
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateValidators } from './../../shared/validators/date-validators';
import { TodoService } from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';

/** Importation de la libraire tierce 'moment.js' */
import * as moment from 'moment';
@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})

export class TodoFormComponent implements OnInit {
/**
 * @var todoForm : FormGroup Prise en charge du formulaire
 * par ReactiveForms
 */
  public todoForm: FormGroup;

  /**
   * Abonnement à un todo
   * et qui vient passe par l'intérmédiaire du service
   */
  private todoSubscription: Subscription;
  //ajouter un boutonqui envoie la ligne vers la barre de saisie

  /**
   * Définit un objet todo à mettre à jour
   * @var todoToUpdate: todoInterface todo qui vient du tableau
   */
  private todoToUpdate: TodoInterface;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService) { 
      //Objet todoToUpdate vide
      this.todoToUpdate= {
        title: '',
        begin: new Date(),
        end: new Date()
      };

      // Abonnement au todo
      this.todoSubscription = this.todoService.getTodo() 
      .subscribe((unTodo) => {
        console.log('Je viens de recevoir un todo : '+JSON.stringify(unTodo));
        this.todoToUpdate = unTodo;
        this._loadForm();
      });
    }
  /**
   * @return FormControl Contrôle title du formulaire
   */
  public get title() {
    return this.todoForm.controls.title;
  }
  // dans la form des controls (title, end et begin)
  //, je veux le title

 /**
  * M2thode définir dans l'interface OnInIt
  * Est appelée immédiatement après le constructeur
  * de la classe courante
  * Construction du formulaire todoForm
  */
 ngOnInit() {
   // Définit le formulaire, ce qu'il contient
   // et les règles de validation du formulaire
  this.todoForm = this.formBuilder.group(
  //tableau d'objet qui contient
  {
    title: [ //est composé de :
      this.todoToUpdate.title, //Valeur par défaut pour le contrôle titre, vide ou pas
      [Validators.required, Validators.minLength(5)] // Règles de la validation à appliquer
    ],
    begin: [
      moment(this.todoToUpdate.begin).format('YYYY-MM-DD'),
      [Validators.required]
    ],
    end: [
      moment(this.todoToUpdate.end).format('YYYY-MM-DD'),
      [Validators.required]
    ]
  },
  {validator: Validators.compose([
    DateValidators.dateLessThan('begin', 'end', {'begin': true})
  ])}
  ); 
}

private _loadForm(): void {
  this.ngOnInit(); 
}

/**
 * Emet le nouveau todo
 */

public saveTodo(): void {
  const _todo: TodoInterface = this.todoForm.value;
  //j e récupère les valeurs pris dans le forumaire et les mets dans todo
  _todo.isChecked = false;
  // On doit tenir compte d'un todoToUpdate complet
  console.log('todoToUpdate : '+JSON.stringify(this.todoToUpdate));

  if (this.todoToUpdate.hasOwnProperty('id')) {
    // C'est une mise à jour
    _todo.id = this.todoToUpdate.id;
    this.todoService.updateTodo(_todo);
  } else {
    // C'est une insertion
    this.todoService.addTodo(
    _todo);
  }
 // this.todoService.addTodo(
    // a tient, il y a un nouveau todo. je l'ajoute 
    //tous ceux qui le veule le prendra
//    _todo
//  );
}
}
