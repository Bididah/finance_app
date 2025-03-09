import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label!: String
  @Input() state: 'primary' | 'secondary' | 'tertiary' | 'destroy' = 'primary'
  @Input() icon = false
  @Input() disabeld = false
  @Input() type: 'button' | 'submit' = 'button'
  @Input() size: 'fit' | 'large' = 'fit'

  @Output() clicked = new EventEmitter<Event>()

  public handleClick(event: Event): void {
    if(!this.disabeld) {
      this.clicked.emit(event);
    }  
  }
}
