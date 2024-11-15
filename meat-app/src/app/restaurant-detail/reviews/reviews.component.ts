import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent implements OnInit{

  reviews: Observable<any> | undefined;

  constructor(private restaurantService: RestaurantsService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(){
    this.reviews = this.restaurantService.reviewsOfRestaurant(this.route.parent?.snapshot.params['id'])
  }

  getImageForRating(rating: number): string {
    if (rating >= 4) {
      return 'assets/img/reactions/loved.png';
    } else if (rating >= 3) {
      return 'assets/img/reactions/soso.png'; 
    } else {
      return 'assets/img/reactions/pissed.png'; 
    }
  }
}
