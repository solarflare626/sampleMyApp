import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {

question: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  		 this.question = navParams.get('data');

  		 console.log(JSON.stringify(this.question));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

}
