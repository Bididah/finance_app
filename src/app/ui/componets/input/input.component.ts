import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() icon: string = '';
  @Input() tagColor = '';
  @Input() textPrefix = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';

  constructor(@Optional() @Self() public ngcontrol: NgControl) {
    if (this.ngcontrol) {
      this.ngcontrol.valueAccessor = this;
    }
  }

  value: string = '';
  isDisabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  get iconPath(): string {
    return `assets/icons/${this.icon}.svg`;
  }

  get control() {
    return this.ngcontrol?.control;
  }

  get hasError(): boolean {
    return !!this.control && this.control.invalid && this.control.touched;
  }

  get errorText(): string {
    if (!this.control || !this.control.errors) return '';

    if (this.control.errors['required']) return 'Ce champ est requis';
    if (this.control.errors['email']) return 'Adresse email invalide';
    if (this.control.errors['minlength'])
      return `Minimum ${this.control.errors['minlength'].requiredLength} caractères`;

    return 'Champ invalide';
  }

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
