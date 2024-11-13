import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from "@angular/animations"
import { NotificationService } from '../notification.service';
import { tap, switchMap } from 'rxjs/operators';
import { timer, } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
  animations: [
    trigger('snack-visibility',[
      state('hidden', style({
        opacity: 0,
        bottom: 0,
      })),
      state('visible', style({
        opacity: 1,
        bottom: '100px',
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit{
  message: string = 'Hello there'
  snackVisibility:string = 'hidden'

  constructor(private notificationService: NotificationService){}

  ngOnInit(): void {
    this.notificationService.notifier.pipe(
      tap(message => {
        this.message = message;
        this.snackVisibility = 'visible';
      }),
      switchMap(() => timer(3000))
    ).subscribe(() => this.snackVisibility = 'hidden');

  }

}
