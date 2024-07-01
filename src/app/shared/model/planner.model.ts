import {DailyMenu} from "./dailyMenu.model";
import {ShoppingItem} from "./shoppingItem.model";

export interface Planner{
  id: string;
  userId: string;
  name: string;
  description: string;
  dailyMenus: DailyMenu[];
}
