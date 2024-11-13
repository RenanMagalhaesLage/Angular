import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit, AfterContentInit{


  input: any
  @Input() label:string = ""
  @Input() errorMessage:string =""

  @ContentChild(NgModel) model: NgModel | undefined
  @ContentChild(FormControlName) control: FormControlName| undefined

  ngOnInit(): void {
    
  }

  ngAfterContentInit(): void {
    this.input = this.model || this.control
    if(this.input === undefined){
      throw new Error("Esse componente precisa ser usado com uma diretiva ngModel")
    }
  }

}
