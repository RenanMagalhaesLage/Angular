import {Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';


export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children:[
            {path:'', redirectTo: 'menu', pathMatch:'full'},
            {path: 'menu', component: MenuComponent},
            {path:'reviews', component: ReviewsComponent}
        ]
    },
    {path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule)},
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    {path: '**', component: NotFoundComponent}
]