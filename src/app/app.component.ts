import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './ui/componets/sidebar/sidebar.component';
import { InputComponent } from './ui/componets/input/input.component';
import { ButtonComponent } from './ui/componets/button/button.component';
import { DropdownComponent } from './ui/componets/dropdown/dropdown.component';
import { PaginationComponent } from './ui/componets/pagination/pagination.component';
import { AuthmodalComponent } from './auth/componets/authmodal/authmodal.component';
import { UserAuthComponent } from './auth/componets/userauth/userauth.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'finance_app';
}
