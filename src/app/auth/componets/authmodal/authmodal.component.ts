import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from '../../../ui/componets/input/input.component';
import { ButtonComponent } from '../../../ui/componets/button/button.component';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authmodal',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './authmodal.component.html',
  styleUrl: './authmodal.component.scss',
})
export class AuthmodalComponent implements OnInit {
  @Input() type!: 'sing up' | 'login';

  @Output() submitForm = new EventEmitter();

  public subscription = new Subscription();

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public singUpForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmationPassword: ['', [Validators.required]],
    },
    {
      validators: [this.passwordMatchValidator()],
    }
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscription.add(
      this.singUpForm.statusChanges.subscribe(() => {
        console.log(this.singUpForm.status);
        const confirmationControl = this.singUpForm.get('confirmationPassword');
        const hasMisMatch = this.singUpForm.hasError('passwordMismatch');

        if (hasMisMatch) {
          confirmationControl?.setErrors(
            { passwordMismatch: true },
            { emitEvent: false }
          );
        }
      })
    );
  }

  passwordMatchValidator() {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmationPassword = group.get('confirmationPassword')?.value;

      return password === confirmationPassword
        ? null
        : { passwordMismatch: true };
    };
  }

  onSubmit(): void {
    if (this.type === 'login' && this.loginForm.valid) {
      console.log(this.loginForm);
      this.submitForm.emit(this.loginForm.value);
    } else if (this.type === 'sing up' && this.singUpForm.valid) {
      console.log(this.singUpForm);
      this.submitForm.emit(this.singUpForm.value);
    }
  }
}
