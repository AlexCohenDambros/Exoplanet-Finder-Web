import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-page',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss']
})
export class JoinComponent implements OnInit {

  cadastroForm!: FormGroup;
  showPassword: boolean = false;
  senhaValida: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)]],
    });
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  alternarVisibilidadeSenha() {
    this.showPassword = !this.showPassword;
  }

}
