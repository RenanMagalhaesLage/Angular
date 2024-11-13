import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
})
export class OrderItemsComponent {

  @Input() items: CartItem[] | undefined

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  emitIncreaseQty(item:CartItem){
    this.increaseQty.emit(item)
  }

  emitDecreaseQty(item:CartItem){
    this.decreaseQty.emit(item)
  }

  emitRemove(item:CartItem){
    this.remove.emit(item)
  }
}
