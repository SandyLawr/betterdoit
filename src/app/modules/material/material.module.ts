import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importation des modules nécessaires "material"
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,  //permet de définir des entete de colonne qui auront pour objectif de trier la colonne
  MatIconModule,
  MatButtonModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class MaterialModule { }
