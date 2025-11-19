import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest, SingUpRequest } from '../../interfaces';
import { AuthService } from '../../../services/auth.service';
import { AuthFormComponent } from '../authform/authform.component';

@Component({
  selector: 'app-userauth',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './userauth.component.html',
  styleUrl: './userauth.component.scss',
})
export class UserAuthComponent implements OnInit, OnDestroy {
  public type!: 'login' | 'sing up';
  public subscription = new Subscription();

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

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
        this.authService.login(event as LoginRequest).subscribe((data) => {
          this.router.navigate(['/dashboard']);
        })
      );
    } else {
      this.subscription.add(
        this.authService.register(event as SingUpRequest).subscribe((data) => {
          this.router.navigate(['/dashboard']);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
