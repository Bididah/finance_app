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
import { RouterModule } from '@angular/router';
import { LoginRequest, SingUpRequest, User } from '../../interfaces';

@Component({
  selector: 'app-authmodal',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './authmodal.component.html',
  styleUrl: './authmodal.component.scss',
})
export class AuthmodalComponent implements OnInit {
  @Input() type!: 'sing up' | 'login';

  @Output() submitForm = new EventEmitter<LoginRequest | SingUpRequest>();

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
    let formValue: LoginRequest | SingUpRequest;
    if (this.type === 'login' && this.loginForm.valid) {
      formValue = {
        email: this.loginForm.value['email'],
        password: this.loginForm.value['password'],
      } as LoginRequest;
      this.submitForm.emit(formValue);
    } else if (this.type === 'sing up' && this.singUpForm.valid) {
      const user: User = {
          firstName: this.singUpForm.value['firstName']!,
          lastName: this.singUpForm.value['lastName']!,
          email: this.singUpForm.value['email']!,
        },
        formValue = {
          user: user,
          password: this.singUpForm.value['password'],
        } as SingUpRequest;
      this.submitForm.emit(formValue);
    }
  }
}
