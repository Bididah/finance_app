import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/interfaces';
import { ButtonComponent } from '../../../dist/design-system';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public subscription = new Subscription();
  public currentUser!: User | null;

  constructor(private authService: AuthService) {
    this.subscription.add(
      this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user;
      })
    );
  }

  ngOnInit(): void {}

  getMe() {
    this.authService.fetchMe().subscribe((user) => {
      console.log(user);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
