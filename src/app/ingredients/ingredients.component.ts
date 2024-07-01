import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {CreateIngredientDialogComponent} from "./create-ingredient-dialog/create-ingredient-dialog.component";
import {IngredientService} from "./ingredient.service";
import {Ingredient} from "../shared/model/ingredient.model";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css',
    './../shared/shared-styles.css']
})
export class IngredientsComponent {
  private dialog = inject(MatDialog);
  editable: boolean = false;
  //TODO quitar esto
  ingredientTypes: string[] = ['LIQUID', 'DAIRY', 'VEGETABLE', 'FRUIT', 'POWDER', 'MEAT','GRAIN', 'SEASONING'];
  ingredientUnits: string[] = ['GRAM', 'MILLILITER', 'TABLESPOON', 'TEASPOON', 'CUP', 'PIECE'];

  ingredients: Ingredient[] = [];
  userId: string = '1';


  constructor(private router: Router, private ingredientService: IngredientService) {
  }

  ngOnInit(){
    if(sessionStorage.getItem('id')!=null){
      this.userId = sessionStorage.getItem('id') as string;
      console.log("userId", this.userId);
      this.getIngredientsByUserId(this.userId);
    }
    else{
      this.router.navigate(['login']);
    }

  }

  openCreateDialog(){
    const dialogRef =
      this.dialog.open(CreateIngredientDialogComponent);

    dialogRef.afterClosed().subscribe( result => {
        console.log("closed dialog");
        this.getIngredientsByUserId(this.userId);
      }
    );

  }

  delete(id: string) {
    this.ingredientService.delete(id).subscribe(
      ()=>{
        console.log("ingrediente eliminado");
        this.getIngredientsByUserId(this.userId);
      },
      (error)=>{
        console.error("error", error);
      }
    );
  }

  edit() {
    this.editable= !this.editable;
  }

  getIngredientsByUserId(id:string): void {
    //TODO LOGIN USER ID
    this.ingredientService.getIngredientsByUserId(id)
      .subscribe(
        (data: Ingredient[]) => {
          this.ingredients = data;
          console.log("Ingredientes obtenidos:", this.ingredients);
        },
        (error) => {
          console.error("Error al obtener ingredientes:", error);
        }
      );
  }

  save(ingredient: Ingredient) {
    this.ingredientService.update(ingredient.id, ingredient)
      .subscribe(
        (data: Ingredient) =>{
          ingredient = data;
          console.log("guardado");
          this.getIngredientsByUserId(this.userId);
        },
        (error) =>{
          console.error("error", error);
        }
      );
  }
}
