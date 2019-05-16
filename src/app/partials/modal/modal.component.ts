import { Component, Input } from '@angular/core';
import $ from 'jquery'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor() { }

  close($event){
    $($event.target).parents('.modal').fadeOut(600)
  }

  @Input() message : any 
}
