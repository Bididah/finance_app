import { Component } from '@angular/core';
import { AuthmodalComponent } from "../authmodal/authmodal.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthmodalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  login(event: any) {
    console.log(event)
  }
}
