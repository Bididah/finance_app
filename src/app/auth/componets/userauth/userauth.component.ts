import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthmodalComponent } from '../authmodal/authmodal.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoginRequest, SingUpRequest } from '../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-userauth',
  standalone: true,
  imports: [AuthmodalComponent],
  templateUrl: './userauth.component.html',
  styleUrl: './userauth.component.scss',
})
export class UserAuthComponent implements OnInit, OnDestroy {
  public type!: 'login' | 'sing up';
  public subscription = new Subscription();

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ type }) => {
        this.type = type;
      })
    );
  }

  submit(event: SingUpRequest | LoginRequest) {
    if (this.type === 'login') {
      this.subscription.add(
        this.authService.login(event as LoginRequest).subscribe(
          (user) => {
            console.log(
              `Hey ${user.firstName} ${user.lastName} you are logged in`
            );
          },
          (error) => {
            console.log(error);
          }
        )
      );
    } else {
      this.subscription.add(
        this.authService.register(event as SingUpRequest).subscribe(
          (user) => {
            console.log(`Welcome ${user.firstName} ${user.lastName}`);
          },
          (error) => {
            console.log(error);
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
