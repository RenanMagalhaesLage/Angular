import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs";
import { Order, OrderItem } from "./order.model";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { MEAT_API } from "../app.api";
import { map } from 'rxjs/operators'; 

@Injectable()
export class OrderService{
    constructor(private cartService: ShoppingCartService, private http: HttpClient){}

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    increaserQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decraseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    itemsValue():number{
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<string>{
        return this.http.post<{id: string}>(`${MEAT_API}/orders`, order)
        .pipe(
            map(response => response.id)
        )   
    }
    clear(){
        this.cartService.clear();
    }
}