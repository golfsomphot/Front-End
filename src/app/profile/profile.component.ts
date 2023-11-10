import { Component, OnInit } from '@angular/core';
import { varible } from '../varible';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, public va: varible) {

  }


  ngOnInit() {
    // this.getSearch("");
    // this.imageBase64 = this.defaultImageBase64;
    // console.log("this.va:", this.va)
    // console.log("base64Stringprofile:", this.base64String)
  }
  onSubmit() {

  }
  public base64String = this.va.userdata.pic;



}
