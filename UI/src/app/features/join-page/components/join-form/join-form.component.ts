import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.scss']
})
export class JoinFormComponent implements OnInit {

  Form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessage: ToastrService) { }

  public ngOnInit(): void {
    this.Form = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)]],
    });
  }

  public cadastrar() {
    if (this.Form.valid) {
      console.log(this.Form.value);
      this.toastMessage.success('Hello world!');
    } else {
      this.Form.markAllAsTouched();
    }
  }
}
