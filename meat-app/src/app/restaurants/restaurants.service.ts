import { Restaurant } from "./restaurant/restaurant.model";
import { Injectable } from "@angular/core";

import { MEAT_API } from "../app.api";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators'; // Use o operador `map` de rxjs/operators
import { ErrorHandler } from "../app.error-handler";
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.module";



@Injectable({
    providedIn: 'root' // Tornar o serviço disponível em toda a aplicação
  })
export class RestaurantsService{
   
    constructor(private http: HttpClient){  }

    restaurants(search?: string): Observable<Restaurant[]>{
        const term = search ? search.toLowerCase() : ''; 
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, { params: { q: search || '' } })
            .pipe(
                map(response => response.filter(restaurant => 
                    Object.values(restaurant).some(value => 
                        typeof value === 'string' && value.toLowerCase().includes(term)
                    )
                )),
            );
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id:string): Observable<any>{
        return this.http.get<any>(`${MEAT_API}/reviews?restaurantId=${id}`)
    }

    menuOfRestaurant(id:string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/menu?restaurantId=${id}`)
    }

}