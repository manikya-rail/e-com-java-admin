import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  form: any;
  passwordRegex:string="/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/"
  constructor() {

    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required,
        //Validators.pattern("/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/")
      ])

    });
  }

  get userName() {
    return this.form.get('userName')
  }

  get password() {
    return this.form.get('password')
  }

  onSubmit(f: NgForm) {
    console.log(f);
  }

  getValue(f: FormControl) {
    console.log(f);
  }

  ngOnInit(): void {
  }

}
