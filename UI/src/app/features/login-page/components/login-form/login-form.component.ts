import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/translate/language.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  Form!: FormGroup;

  constructor(
    private readonly languageService: LanguageService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.languageService.setInitialLanguage();

    this.Form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)]]
    });
  }

  onSubmit() {
    let email = this.Form.get('email')?.value;
    let password = this.Form.get('password')?.value;

    console.log('email', email);
    console.log('password', password);
    console.log('loginForm', this.Form.value);
  }

  onRegister() {
    this.router.navigate(['/join']);
  }

}
