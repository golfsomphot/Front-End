import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { varible } from '../varible';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private va: varible) {

  };
  async ngOnInit() {
    await this.router.events.subscribe((page) => {
      if (page instanceof NavigationEnd) {
        const allowedURLs = ['/'];
        this.isLoginPage = allowedURLs.includes(this.router.url);
      }
    });
       
    // console.log("base64Strings:",this.base64Strings)
  };

  //ตัวแปล
  public isLoginPage: boolean = false;
  public isVisible: boolean = false;
  public submenu: boolean = false;
  public base64Strings = this.va.userdata.pic; 
  
  //ฟังชั่นเปิดปิดเมนูใหญ่
  close_menu() {
    // console.log("this.isVisible:", this.isVisible);
    this.isVisible = !this.isVisible;

  };
  //ฟังชั่นเปิดปิดเมนูย่อย

  closesub() {

    this.submenu = !this.submenu;

  };



};



