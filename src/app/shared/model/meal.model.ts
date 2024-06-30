import {MealIngredient} from "./mealIngredient.model";

export interface Meal{
  id: string,
  userId: string,
  name: string,
  category: string,
  ingredients: MealIngredient[]
}
