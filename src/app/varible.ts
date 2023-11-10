import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class varible {
    public userdata: any;
    constructor(private http: HttpClient) {
        // console.log("localStorage.getItem('userdata'):", localStorage.getItem('userdata'));
        this.userdata = JSON.parse(localStorage.getItem('userdata') || '{}');
        //|| '{}' ป้องกันการค้นหาไม่พบหรือไม่มีข้อมูลในlocalStorage เพื่อ JSON.parse
    }
    async getdata(path: string, pram: any) {

        var response;
        try {
            //สร้างตัวแปล url เพื่อไปใช้งานต่อและ  สามารถตรวจสอบการทำงานจากตัวแปลได้ด้วย 
            var url = `http://localhost:9000/${path}`;
            response = await this.http.post<any>(url, pram).toPromise();

        } catch (error) {
            response = { code: "-1", msg: error, data: null }
        }
        return response;
    }
}

// ดึงข้อมูลจาก local storage โดยใช้ ตัวแปล "logindata" ซึ่งเก็บข้อมูลที่เกี่ยวข้องกับการเข้าสู่ระบบ.
// console.log("localStorage.getItem('userdata')",localStorage.getItem('userdata'))
// console.log("userdata:", this.userdata||'{}');