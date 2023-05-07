import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LOGIN_API_POST: string;

  constructor() {
    this.LOGIN_API_POST = "https://ideal-bells-production.up.railway.app/user/login";
  }

  sendLogin(form: FormGroup){
    return axios.post(this.LOGIN_API_POST, form.value);
  }
}
