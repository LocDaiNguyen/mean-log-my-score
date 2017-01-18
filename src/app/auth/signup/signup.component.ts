import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lms-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router) { }

  closeSignup(): void {
    this.router.navigate([{ outlets: { signup: null }}]);
  }

  ngOnInit() {
  }

}
