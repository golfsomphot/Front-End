import { Component, OnInit, Inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { varible } from '../varible';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  constructor(private ngbModal: NgbModal, private http: HttpClient, private va: varible) {

  }
  async ngOnInit() {
    this.getdata("");
    await this.getdepartment();
    this.getposition()
  }
  // searchText: string = "";
  // showClass: boolean = false;
  department: any[] = [];
  position: any[] = [];
  rowData = [];
  //ตัวแปล ส่งค่าทั้งหมดในmodal
  public activeemployees: any = {
    fullname: "",
    nickname: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",

  };
  columnDefs: ColDef[] = [
    { field: 'empcode', headerName: "Emp code", width: 150 },
    { field: 'fullname', headerName: "Name", width: 200 },
    { field: 'email', headerName: "Email", width: 200 },
    { field: 'phone', headerName: "Phone", width: 200 },
    { field: 'address', headerName: "Address", width: 250 },
    { field: 'position', headerName: "Position", width: 150 },
    { field: 'department', headerName: "Department", width: 150 },


  ];
  rowDoubleClicked(event: any, contentupdate: any) {

    this.ngbModal.open(contentupdate, { size: 'lg' });

    //console.log("event : ", event.data);

  }
  // เพิ่มรูป
  addimg() {
    var img = <HTMLElement>document.getElementById("input_img")
    img.click();
  }
  //เปิด modal
  open(customeradd: any) {
    var screenWidth = window.innerWidth;
    this.ngbModal.open(customeradd, { size: 'none' });
    this.base64textString ="../../assets/photo/profilebackgroundimg .png"
    console.log("content", customeradd);
    this.activeemployees.fullname = "",
      this.activeemployees.nickname = "",
      this.activeemployees.email = "",
      this.activeemployees.phone = "",
      this.activeemployees.address = "",
      this.activeemployees.department = this.department[0].id
    this.activeemployees.position = this.position[0].id
    // 
  }
  //เพิ่มรูป ../../assets/photo/profilebackgroundimg .png
 public yourFile:any
 public base64textString:any

 selectFile(): void {
  var img = <HTMLElement>document.getElementById('fileInput');
  img.click();
}

selectimg_click(fileInput: any) {
  this.yourFile = fileInput.target.files[0];
  console.log("yourFile: ", this.yourFile);
  if (this.yourFile) {
     var reader = new FileReader();

     reader.onload = this.handleReaderLoaded.bind(this);
    
     reader.readAsBinaryString(this.yourFile);
  }
}

handleReaderLoaded(readerEvt: any) {
  var binaryString = readerEvt.target.result;
  this.base64textString = "data:image/png;base64," + btoa(binaryString);
  
}

  //ฟังชั่น เพิ่มข้อมูล
  async insertemployees(Modal: any) {
    // console.log(" this.activeemployees", this.activeemployees)
    try {
      // console.log("activeemployees.position:",this.activeemployees.position);
      let pram = { tbname: "insertemployees", data: this.activeemployees, uid: this.va.userdata,pic:this.base64textString };


      if (
        this.activeemployees.fullname === "",
        this.activeemployees.nickname === "",
        this.activeemployees.email === "",
        this.activeemployees.phone === "",
        this.activeemployees.address === ""
        // this.activeemployees.department === "",
        // this.activeemployees.position === ""
      ) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      } else {
        // if (this.activeemployees.password != this.activeemployees.confirmPassword) {
        //   alert("Password ไม่ตรงกันรบกวนทำรายการใหม่อีกครั้ง")
        // } else {}

        var response;

        response = await this.http.post<any>("http://localhost:9000/insertemployee", pram).toPromise();

        // console.log(" response", response);

        if (response.code == "000" && response.msg == "ok") {

          alert("บันทึกสำเร็จ");
          Modal.close()
        }
        else {

          alert("บันทึกไม่สำเร็จกรุณาตรวจสอบใหม่อีกครั้ง");

        }

      }
    } catch (ex) {

    }
  }
  // ฟังชั่นปุ่มsearch
  async btnsearch(keyword: any) {
    await this.getdata(keyword)

  }
  async getdata(key: any) {
    let pram = { tbname: "searchemployees", keyword: key };

    console.log("getdataresponse:", response);
    try {
      var response = await this.va.getdata("employees", pram);
      if (response.data.length > 0) {
        this.rowData = response.data;
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {

    }
  }

  //ฟังชั่นsearch department
  async getdepartment() {

    var response;
    let pram = { tbname: "getdepartment" };
    try {
      response = await this.http.post<any>("http://localhost:9000/employees", pram).toPromise();
      console.log("responsedepartment:", response)

      if (response.data.length > 0) {
        this.department = response.data;
        // this.activeemployees.department = response.data[0].id
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {
      alert("ไม่พบข้อมูล");
    }
    return response;
  }
  //ฟังชั่นsearch position
  async getposition() {

    var response;
    let pram = { tbname: "getposition" };
    try {
      response = await this.http.post<any>("http://localhost:9000/employees", pram).toPromise();
      console.log("responseposition:", response)

      if (response.data.length > 0) {
        this.position = response.data;
        // this.activeemployees.position = response.data[0].id
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {
      alert("ไม่พบข้อมูล");
    }
    return response;
  }
//ปุ่มเลือกตำแหน่ง
  changedDepartment(event: any) {

    const selectedDepartmentId = event.target.value;
    // console.log(selectedDepartmentId);

    if (selectedDepartmentId) {

      this.activeemployees.department = selectedDepartmentId;
    } else {

    }

  }


}







