import {Meal} from "./meal.model";
import {Ingredient} from "./ingredient.model";

export interface MealIngredient{
  id:string,
  ingredient: Ingredient,
  quantity: number
}
