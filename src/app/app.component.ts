import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './ui/componets/sidebar/sidebar.component';
import { InputComponent } from './ui/componets/input/input.component';
import { ButtonComponent } from './ui/componets/button/button.component';
import { DropdownComponent } from './ui/componets/dropdown/dropdown.component';
import { PaginationComponent } from './ui/componets/pagination/pagination.component';
import { AuthmodalComponent } from "./auth/componets/authmodal/authmodal.component";
import { LoginComponent } from './auth/componets/login/login.component';

const COMPONETS = [
  SidebarComponent,
  InputComponent,
  ButtonComponent,
  DropdownComponent,
  PaginationComponent,
  LoginComponent,
  AuthmodalComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ...COMPONETS, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'finance_app';
}
