import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../shared/services/users.service";
import {Message} from "../../shared/models/message.model";
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
      private userService: UserService,
      private authService: AuthService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams.subscribe(
        (params: Params)=> {
            if(params['nowCanLogin']){
                this.showMessage('Теперь вы можете войти', 'success')
            }
        }
    )
    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

  onSubmit(){
     let formData = this.form.value;
     this.userService.getUserByEmail(formData.email)
         .subscribe((user: User)=> {
            if(user){
              if(user.password ===  formData.password){
                this.authService.login();
                window.localStorage.setItem('user', JSON.stringify(user));

              } else {
                  this.showMessage('Пароль не правильный')
              }

            }else {
                this.showMessage('Пользователь не найден')
            }
         })
  }

}
