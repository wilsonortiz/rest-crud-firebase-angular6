import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user.model';

@Injectable()
export class UserService {

  private url: string = 'https://user-crud-6444a.firebaseio.com/user-crud-6444a.json'
  private urlObject: string = 'https://user-crud-6444a.firebaseio.com/user-crud-6444a'

  constructor(private http: HttpClient) { }

  saveUser(user: User) {
    let body = JSON.stringify(user);
    return this.http.post(this.url, body);
  }

  updateUser(user: User, id: string) {
    let body = JSON.stringify(user);
    return this.http.put(`${this.urlObject}/${id}.json`, body)
  }

  getUser(id) {
    let url = `${this.urlObject}/${id}.json`
    return this.http.get(url);
  }

  getUsers() {
    return this.http.get(this.url);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.urlObject}/${id}.json`)
  }

}
