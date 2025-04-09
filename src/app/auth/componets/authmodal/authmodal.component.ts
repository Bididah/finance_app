import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputComponent } from "../../../ui/componets/input/input.component";
import { ButtonComponent } from "../../../ui/componets/button/button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-authmodal',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './authmodal.component.html',
  styleUrl: './authmodal.component.scss',
})
export class AuthmodalComponent implements OnInit {
  @Input() modalType: 'Sing up' | 'Login' = 'Login';

  @Output() submit = new EventEmitter<{ email: string; password: string }>();

  constructor(private fb: FormBuilder) {}

    public form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  ngOnInit(): void {

  }

  onLogin() {
    console.log(this.form.value)
  };
}
