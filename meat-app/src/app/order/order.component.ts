import { Component } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit{

  orderForm!: FormGroup;
  delivery: number = 8;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  numberPattern = /^[0-9]*$/

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value:'MON'},
    {label: 'Cartão Débito', value:'DEB'},
    {label: 'Cartão de Crédito', value:'CRE'},
    {label: 'Pix', value:'PIX'},

  ]


  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder){}
  cartItems(){
    return this.orderService.cartItems()
  }

  ngOnInit(){
    this.orderForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])

    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} | null{
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){
      return null
    }
    if(email.value !== emailConfirmation.value){
      return {emailsNotMatch: true}
    }
    
    return null
  }

  increaseQty(item: CartItem){
    this.orderService.increaserQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decraseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  itemsValue():number{
    return this.orderService.itemsValue()
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order).subscribe((orderId: string) =>{
      this.router.navigate(['/order-summary'])
      console.log(`Compra concluida ${orderId}`)
      this.orderService.clear()
    })
    console.log(order)
  }
}
