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
    datetostring(mydate: any, index = 0) {
        var d = ("0" + mydate.getDate()).slice(-2);
        var m = ("0" + (mydate.getMonth() + 1)).slice(-2);
        var y = mydate.getFullYear();
        var yy = y.toString().substr(-2);
        var h = ("0" + mydate.getHours()).slice(-2);
        var mm = ("0" + mydate.getMinutes()).slice(-2);
        var s = ("0" + mydate.getSeconds()).slice(-2);
        if (index == 0) { return y + "-" + m + "-" + d; }
        else if (index == 1) { return y + "-" + m + "-" + d + " 00:00:00"; }
        else if (index == 2) { return y + m + d; }
        else if (index == 3) { return h + ":" + mm; }
        else if (index == 4) { return y + m + d + h + mm + s; }
        else if (index == 5) { return d + "/" + m + "/" + y; }
        else if (index == 6) { return y + "-" + m + "-" + d + " 00:00"; }
        else if (index == 7) { return h + ":" + mm + ":" + s; }
        else if (index == 8) { return y + "-" + m + "-" + d }
        else if (index == 9) { return y + m + d }
        else if (index == 10) { return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s; }
        else if (index == 11) { return h + mm + s; }
        else if (index == 12) { return d + "-" + m + "-" + y + " " + h + ":" + mm + ":" + s; }
        else if (index == 13) { return d; }
        else if (index == 14) { return m; }
        else if (index == 15) { return y; }
        else if (index == 16) { return y + m; }
        else if (index == 17) { return (mydate.getMonth() + 1); }
        else if (index == 18) { return y + "-" + m + "-" + d + "T" + h + ":" + mm + ":" + s + ".1234567Z"; }
        else if (index == 19) { return y + "-" + m + "-" + d + "T00:00:00.1234567Z"; }
    }
}

// ดึงข้อมูลจาก local storage โดยใช้ ตัวแปล "logindata" ซึ่งเก็บข้อมูลที่เกี่ยวข้องกับการเข้าสู่ระบบ.
// console.log("localStorage.getItem('userdata')",localStorage.getItem('userdata'))
// console.log("userdata:", this.userdata||'{}');