//คราสที่ไว้ใช้ 
import { Injectable } from '@angular/core';
import { varible } from './varible';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';



import { LogtestComponent } from '../app/logtest/logtest.component';
@Injectable({
  providedIn: 'root'
})



export class AuthguardService implements CanActivate {
  responseData: any;
  constructor(private va: varible, private router: Router, private logtest: LogtestComponent) {

    this.logtest.onDataReceived.subscribe((res) => {
      this.responseData = res

    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log(this.logtest)
    if (Object.keys(this.va.userdata).length === 0) {
      this.router.navigate(['']);

      alert('โปรดล็อกอินเพื่อเข้าระบบ')
      return false;
    } else {


      return true;
    }
  }
}
