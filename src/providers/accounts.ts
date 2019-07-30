import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
let apiUrl = "http://localhost:3000/api/"

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AccountsProvider {

  constructor(private http: Http ) {}


  currentUser: User;

}
