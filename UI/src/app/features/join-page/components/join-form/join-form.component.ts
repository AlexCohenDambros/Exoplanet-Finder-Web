import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JoinModel } from 'src/app/domain/join/join.models';
import { LanguageService } from 'src/app/shared/translate/language.service';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.scss'],
  providers: [JoinModel]
})

export class JoinFormComponent implements OnInit {

  Form!: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly languageService: LanguageService,
    private formBuilder: FormBuilder,
    private toastMessage: ToastrService,
    private joinModel: JoinModel,
    private router: Router) { }

  public ngOnInit(): void {
    this.languageService.setInitialLanguage();

    this.Form = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)]],
    });
  }

  public cadastrar() {
    if (this.Form.valid) {
      let formName = this.Form.get('nome')?.value;
      let formFamilyName = this.Form.get('sobrenome')?.value;
      let formEmail = this.Form.get('email')?.value;
      let formPassword = this.Form.get('senha')?.value;

      let obj = new JoinModel()
      obj.Name = formName;
      obj.FamilyName = formFamilyName;
      obj.Email = formEmail;
      obj.Password = formPassword;

      console.log('obj', obj);
      this.toastMessage.success('Cadastro realizado com sucesso!');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

    } else {
      this.Form.markAllAsTouched();
    }
  }
}
