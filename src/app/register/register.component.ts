import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegister: FormGroup;

  constructor(private service: RegisterService){
    this.formRegister = new FormGroup({
      nome: new FormControl("")
    })
  }

  submitRegistration(){
    
    this.service.submitRegistration(this.formRegister).then(res => {
      console.log(res);
      setTimeout(() => location.replace("/login"), 1000);
    })
    .catch(err => {
      console.log(err);
    })
  }

}
