import { Injectable } from '@angular/core';

const USER_KEY = 'user_id';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  set(key: string, value: string) {
   /*  localStorage.setItem(key, value) */
    localStorage.setItem(key, value)
  }

  get(key: string) {
   /*  console.log(localStorage.getItem(key)) */
    return localStorage.getItem(key)
  }

  remove(key: string) {
    /* localStorage.removeItem(key); */
    localStorage.removeItem(key);

  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    /* const sessionUser = sessionStorage.getItem(USER_KEY); */

    console.log (user)
    if (user) {
      return true;
    }

    return false;
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

}
