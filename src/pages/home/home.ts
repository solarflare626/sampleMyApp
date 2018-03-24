import { Component ,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { UserProvider } from '../../providers/user/user';
import { GLOBALS } from '../../models/globals';
import { Content } from 'ionic-angular';

import { AnswerPage } from '../../pages/answer/answer';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  questions:any =[];
  currentUser: any = {};
  globals = new GLOBALS();


  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private http: HTTP, private userProvider:UserProvider) {
    
  	this.userProvider.get().then(data => {

  			if(data){
	  			 this.currentUser = JSON.parse(data);
           console.log("User P2", this.currentUser);
           console.log(this.globals.baseUrl);
            this.loadfive();
          

	  		}else{
	  				console.log("No saved user");
	  		}

  		}).catch(error =>{
  			console.error
  		});

  	

  }

  loadfive(){
    var filter = '?filter={';
          filter += '"counts":["upvotes","downvotes","comments"]';
          filter += ',"include":[';
          filter += '{"relation":"upvotes","scope":{"where":{"id":'+this.currentUser.id +'},"fields":["id"]}}'; // if has value you liked it
          filter += ',{"relation":"downvotes","scope":{"where":{"id":'+this.currentUser.id +'},"fields":["id"]}}';
          filter += ',{"relation":"user","scope":{"fields":["displayname","picture"]}}';
          filter += ']';
          filter += '}';
          console.log("Filter",filter);
          this.http.get(this.globals.baseUrl+'/Questions'+filter,{},{}).then((resp :[])=>{
            this.questions= JSON.parse(resp.data);

            //console.log(this.questions);
           console.log(JSON.stringify(JSON.parse(resp.data)[0]));
          }).catch(error => {

                  console.log(error.status);
                  console.log(error.error); // error message as string
                  console.log(error.headers);

           });

  }

  like(id){
    const question = this.questions.find(Question => Question.id === id);
    question.upvotesCount++;

  }

  comment(q){

      this.navCtrl.push(AnswerPage, {
          data: q
    });

  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);

    setTimeout(() => {
      //console.log('Async operation has ended');
      this.questions = [];
      //this.reachedTen = false;
      this.content.scrollTo(0,0,0);
      this.loadfive();

      refresher.complete();
    }, 2000);
  }


}
