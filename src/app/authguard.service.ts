//คราสที่ไว้ใช้ 
import { Injectable } from '@angular/core';
import { varible } from './varible';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private va: varible, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('canActivate run');
    //ถ้าเข้าif จะไม่มีข้อมูลล็อกอิน  และจะกลับไปที่หน้าล็อกอินเช่นเดิม  แต่หากเข้า else จะไปหน้าต่อไปที่ ตั้งไว้
    if (Object.keys(this.va.userdata).length === 0) {
      this.router.navigate(['']);
      alert('โปรดล็อกอินเพื่อเข้าระบบ')
      return false;
    } else {
      return true;
    }
  }
}
