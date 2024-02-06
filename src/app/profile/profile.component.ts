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
 
  imgonchamnge(event: any) {

    var file = event.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // ทำสิ่งที่คุณต้องการกับข้อมูล Base64
        const base64Data = e.target.result as string;
        console.log('Base64 data:', base64Data);
      }
      return this.base64String = reader.readAsDataURL(file);
    }

  }


}
