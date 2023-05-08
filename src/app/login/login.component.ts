import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../socket-service/socket.service';
import { Observable } from 'rxjs';
import NotifyMessage from '../models/notifyMessage';
import { error } from 'console';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   formLogin: FormGroup;
   messages: string[] = [];

  constructor(private loginService: LoginService, private toast: ToastrService){
    this.formLogin = new FormGroup({
      nome: new FormControl("", [Validators.required])
    });
  }

  login(){

    if(this.formLogin.get("nome")?.invalid){
      this.toast.warning("Digite seu nome","", {
        positionClass: 'toast-bottom-center'
      })
      return;
    }

    this.loginService.sendLogin(this.formLogin).then((res) => {
      localStorage.setItem("username", String(this.formLogin?.get("nome")?.value));
      this.toast.success("Entrou!","", {
        positionClass: 'toast-bottom-center'
      })
      location.replace("/chat");
    })
    .catch(err => {
      this.toast.error("Credenciais Inválidas","", {
        positionClass: 'toast-bottom-center'
      })
      return;
    });
  }

}
