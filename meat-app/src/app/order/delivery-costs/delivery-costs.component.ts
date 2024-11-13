import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-costs',
  templateUrl: './delivery-costs.component.html',
})
export class DeliveryCostsComponent {

  @Input() delivery!: number 
  @Input() itemsValue!: number

  total():number{
    return this.delivery + this.itemsValue
  }

}
