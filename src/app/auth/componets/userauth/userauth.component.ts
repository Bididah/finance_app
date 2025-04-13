import { Component, OnInit } from '@angular/core';
import { AuthmodalComponent } from '../authmodal/authmodal.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userauth',
  standalone: true,
  imports: [AuthmodalComponent],
  templateUrl: './userauth.component.html',
  styleUrl: './userauth.component.scss',
})
export class UserAuthComponent implements OnInit {
  public type!: 'login' | 'sing up';
  public subscription = new Subscription();

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ type }) => {
        console.log(type);
        this.type = type;
      })
    );
  }

  login(event: any) {}
}
