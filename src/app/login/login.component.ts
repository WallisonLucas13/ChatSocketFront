import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocketService } from '../socket-service/socket.service';
import { Observable } from 'rxjs';
import NotifyMessage from '../models/notifyMessage';
import { error } from 'console';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   formLogin: FormGroup;
   messages: string[] = [];

  constructor(private loginService: LoginService){
    this.formLogin = new FormGroup({
      nome: new FormControl("")
    });
  }

  login(){

    this.loginService.sendLogin(this.formLogin).then((res) => {
      localStorage.setItem("username", String(this.formLogin?.get("nome")?.value));
      location.replace("/chat");
    })
    .catch(err => {
      console.log(err);
      return;
    });
  }

}
