
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  
  
  constructor() {
    //console.log('Hello ApiProvider Provider');
  }

   static baseUrl() {
      return 'http://10.0.2.2:3000/api';
         
    }

}
