import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  userLogin: any = {
    email: '',
    password: ''
  }

  submitAttempt: boolean = false;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public _user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  loginUser() {
    return this._user.loginCustom(this.userLogin).subscribe(
      (userLog: any) => {
        //console.log(userLog, 'Login Successful')
        this._user.user = userLog.user
        console.log(userLog.user)
        console.log("userLog test", this._user.user)
        sessionStorage.setItem('token', userLog.token)
        sessionStorage.setItem('userId', userLog.userId)

        this.navCtrl.setRoot(MainPage);
      }, (err) => {
        this.submitAttempt = true;

        console.log(err, "error");
        let toast = this.toastCtrl.create({
          message: 'Invalid email or password',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.userLogin.email = '';
        this.userLogin.password = '';
      }
    )
  }

}
