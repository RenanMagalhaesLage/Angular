import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';
import {trigger, state, style, transition, animate} from "@angular/animations"

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared',[
      state('ready', style({opacity: 1,})),
      transition('void => ready',[
        style({
          opacity:0, transform: 'translate(-30px, -10px)'
        }),
        animate('500ms 0s ease-in-out')
      ]),
    ])
  ]
})
export class RestaurantComponent implements OnInit{

  restaurantState = 'ready'

  @Input() restaurant: Restaurant = {
    id: '',
    name: '',
    category: '',
    deliveryEstimate: '',
    rating: 0,
    imagePath: '',
    about:'',
    hours:''
  };
  constructor(){

  }
  ngOnInit(){
    
  }

}
