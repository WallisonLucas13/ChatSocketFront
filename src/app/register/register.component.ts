import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegister: FormGroup;

  constructor(private service: RegisterService, private toast: ToastrService){
    this.formRegister = new FormGroup({
      nome: new FormControl("", [Validators.required])
    })
  }

  submitRegistration(){
    
    if(this.formRegister.get("nome")?.invalid){
      this.toast.warning("Digite seu nome","", {
        positionClass: 'toast-bottom-center'
      })
      return;
    }

    this.service.submitRegistration(this.formRegister).then(res => {
      this.toast.success("Usuário Cadastrado com Sucesso!","", {
        positionClass: 'toast-bottom-center'
      })
      setTimeout(() => location.replace("/login"), 1000);
    })
    .catch(err => {
      this.toast.error("Nome Inválido, escolha outro!","", {
        positionClass: 'toast-bottom-center'
      })
    })
  }

}
