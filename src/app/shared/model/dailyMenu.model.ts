import {Meal} from "./meal.model";

export interface DailyMenu{
  id: string;
  userId: string;
  name: string;
  day: string;
  meals: Meal[]
}
