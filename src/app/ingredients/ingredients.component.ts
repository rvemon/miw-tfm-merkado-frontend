import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {CreateIngredientDialogComponent} from "./create-ingredient-dialog/create-ingredient-dialog.component";
import {IngredientService} from "./ingredient.service";
import {Ingredient} from "../shared/model/ingredient.model";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
  private dialog = inject(MatDialog);
  editable: boolean = false;
  ingredientTypes: string[] = ['LIQUID', 'DAIRY', 'VEGETABLE', 'FRUIT', 'POWDER'];
  ingredientType: string = '';
  ingredientType2: string = '';
  ingredientUnits: string[] = ['GRAM', 'MILLILITER', 'TABLESPOON', 'TEASPOON', 'CUP'];
  ingredientUnit: string = '';
  ingredientUnit2: string = '';

  ingredients: Ingredient[] = [];


  constructor(private router: Router, private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.getIngredientsByUserId();
  }

  openCreateDialog(){
    const dialogRef =
      this.dialog.open(CreateIngredientDialogComponent);

  }

  delete() {

  }

  edit() {
    this.editable= !this.editable;
  }

  getIngredientsByUserId(): void {
    this.ingredientService.getIngredientsByUserId("a")
      .subscribe(
        (data: Ingredient[]) => {
          this.ingredients = data;
          console.log("Ingredientes obtenidos:", this.ingredients);
        },
        (error) => {
          console.error("Error al obtener ingredientes:", error);
          // Manejo de errores aquí
        }
      );
  }
}
