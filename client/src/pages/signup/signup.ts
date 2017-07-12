import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import { Account } from '../../providers/sdk/models';
import { AccountApi } from '../../providers/sdk/services';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  account: Account = new Account();

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private accountApi: AccountApi) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  signup(): void {
    this.accountApi.create(this.account).subscribe((account: Account) => {
      let toast = this.toastCtrl.create({
        message: 'Signup successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.push(LoginPage)
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Signup error',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }
}
