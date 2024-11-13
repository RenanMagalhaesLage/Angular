import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../menu-item/menu-item.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit{

  menu: Observable<MenuItem[]> | undefined

  constructor(private restaurantService: RestaurantsService,
    private route: ActivatedRoute){

    }

    ngOnInit(): void {
      this.menu = this.restaurantService.menuOfRestaurant(this.route.parent?.snapshot.params['id'])
    }

    addMenuItem(item: MenuItem){
      console.log(item)
    }
}
