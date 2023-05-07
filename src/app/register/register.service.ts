import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private API_REGISTER_USER: string = "https://ideal-bells-production.up.railway.app/user/register"

  constructor() { }

  submitRegistration(form: FormGroup){
    return axios.post(this.API_REGISTER_USER, form.value);
  }
}
