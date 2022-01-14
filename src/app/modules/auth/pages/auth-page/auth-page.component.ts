import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  
  formLogin:FormGroup = new FormGroup({});
  errorSession:boolean = false;
  errorMessage:string = "";

  constructor(private AuthService: AuthService, private cookie:CookieService, private router:Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin():void{

    const {email,password} = this.formLogin.value
    this.AuthService.sendCredentials(email,password)
    .subscribe(response => {
      const token = response.result;
      this.cookie.set('token', token, 0, '/');

      this.router.navigate(['/', 'tracks']);
    }, err => {
      this.errorSession = true;
    }
    )
  }
}
