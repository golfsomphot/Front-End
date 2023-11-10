// import { OnInit } from '@angular/core';
// import { varible } from './../varible';
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { ElementRef } from '@angular/core';
// @Component({
//   selector: 'app-logtest',
//   templateUrl: './logtest.component.html',
//   styleUrls: ['./logtest.component.css']
// })



// export class LogtestComponent {

//   constructor(private http: HttpClient, private rout: Router, private va: varible) {

//   }

//   public Userlogin: any = {
//     user: "",
//     password: "",
//   }
//   async btnlogin_cilck() {

//     try {
//       var logindata = await this.getdatalogin(this.Userlogin.user, this.Userlogin.password);
//       console.log("logindata:", logindata);
//       if (logindata == undefined) {
//         alert("ปิดระบบรบกวนเข้าใหม่ในภายหลัง")
//       } else {
//         if (logindata.code == "000") {
//           localStorage.setItem("userdata", JSON.stringify(logindata.data));
//           this.va.userdata = logindata.data;
//           this.rout.navigate(['profile']);
//         } else {
//           alert(logindata.msg);
//         }
//       }
//     } catch (error) {

//     }

//   }
//   async getdatalogin(username: any, password: any) {
//     let pram = { tbname: "getdatalogin" };
//     var response;
//     try {
//       response = await this.http.post<any>("http://localhost:9000/getdatalogin", { pram, email: username, pwd: password }).toPromise();

//     } catch (error) {
//       console.log(error);
//     }
//     return response;
//   }

// }


// import * as CryptoJS from 'crypto-js';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { varible } from './../varible';

@Component({
  selector: 'app-logtest',
  templateUrl: './logtest.component.html',
  styleUrls: ['./logtest.component.css']
})

export class LogtestComponent implements OnInit {
  public Userlogin: any = {
    user: "",
    password: ""
  }

  constructor(private http: HttpClient, private rout: Router, private va: varible) { }
  ngOnInit() {
    localStorage.clear();
  }

  async btnlogin_cilck() {
    try {
      //this.Userlogin.user = bcrypt.hash('1234', 10);
      const logindata = await this.getdatalogin(this.Userlogin.user, this.Userlogin.password);
      // console.log("this.Userlogin.user", this.Userlogin.user);
      if (!logindata) {
        alert("ปิดระบบรบกวนเข้าใหม่ในภายหลัง");
      } else if (logindata.code === "000") {
        localStorage.setItem("userdata", JSON.stringify(logindata.data));
        this.va.userdata = logindata.data;
        this.rout.navigate(['profile']);
      } else {
        alert(logindata.msg);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  }

  async getdatalogin(username: any, password: any) {
    const pram = { tbname: "getdatalogin", data: this.Userlogin };
    try {
      return await this.http.post<any>("http://localhost:9000/getdatalogin",  pram ).toPromise();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการร้องขอ HTTP:', error);
      return null;
    }
  }
}
