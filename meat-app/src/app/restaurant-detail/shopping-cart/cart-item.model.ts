import { MenuItem } from "../menu-item/menu-item.module"

export class CartItem {
  constructor(public menuItem: MenuItem,
              public quantity: number = 1){}

  value(): number {
    return this.menuItem.price * this.quantity
  }
}