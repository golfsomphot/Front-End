
// import * as CryptoJS from 'crypto-js';
import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';


import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { varible } from './../varible';
import { Injectable, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-logtest',
  templateUrl: './logtest.component.html',
  styleUrls: ['./logtest.component.css']
})


export class LogtestComponent implements OnInit {
  @Output() onDataReceived: EventEmitter<any> = new EventEmitter();
  public Userlogin: any = {
    user: "",
    password: ""
  }


  constructor(private http: HttpClient, private rout: Router, private va: varible, private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
    localStorage.clear();
  }

  isBglogin = true


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // เรียกใช้เมธอดหรือทำสิ่งที่คุณต้องการเมื่อหน้าจอถูก resize
    this.handleResize();
  }

  private handleResize(): void {
    // ทำสิ่งที่คุณต้องการเมื่อหน้าจอถูก resize
    // ตัวอย่าง: ดึงขนาดหน้าจอ
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if (screenWidth <= 1366 && screenHeight <= 768) {
      this.isBglogin = false
    } else {
      this.isBglogin = true
    }


    console.log('Screen Width:', screenWidth);
    // console.log('Screen Height:', screenHeight);
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
      var res = await this.http.post<any>("http://localhost:9000/getdatalogin", pram).toPromise();
      console.log("getdataloginres", res);
      this.onDataReceived.emit(res);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการร้องขอ HTTP:', error);
      return null;
    }

    return res
  }

}
