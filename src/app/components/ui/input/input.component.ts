import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label = '';
  @Input() icon: string = '';
  @Input() tagColor = '';
  @Input() textPrefix = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() hasError = false;
  @Input() control = new FormControl();

  @Output() input = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();

  get iconPath(): string {
    return this.icon ? `assets/icons/${this.icon}.svg` : '';
  }

  onInput(event: Event): void {
    this.input.emit(event);
  }

  onFocus(): void {
    this.focus.emit();
  }

  onBlur(): void {
    this.input.emit();
  }
}
