import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { varible } from '../varible';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  constructor(private ngbModal: NgbModal, private http: HttpClient, private va: varible) {

  }
  ngOnInit() {
    this.getdata("");
  }
  //ตัวแปล array
  rowDoubleClicked(event: any, contentupdate: any) {

    this.ngbModal.open(contentupdate, { size: 'lg' });
    //console.log("event : ", event.data);

  }
  rowData = [];
  columnDefs: ColDef[] = [
    { field: 'custid', headerName: "Custcode", width: 150 },
    { field: 'custname', headerName: "Name", width: 150 },
    { field: 'custaddress', headerName: "Address", width: 150 },
    { field: 'custphone', headerName: "Phone", width: 150 },
    { field: 'custemail', headerName: "Email", width: 150 },
    { field: 'taxid', headerName: "Tax" },
    { field: 'contractname', headerName: "Contact", width: 150 },
    { field: 'contactmobile', headerName: "Contactmobile", width: 150 },

  ];
  //ตัวแปลส่งค่าจากmodal
  public activecustomer: any = {
    customername: "",
    tex: "",
    email: "",
    phone: "",
    address: "",
    remark: "",
  };
  //ฟังชั่นปุ่มเปิดmodal
  open(customeradd: any) {
    this.ngbModal.open(customeradd, { size: 'none' });
    this.base64textString = "../../assets/photo/profilebackgroundimg .png"
    console.log("content", customeradd);
  }
  // เพิ่มรูป

  //ปุ่มsearch
  async btnsearch(keyword: any) {
    await this.getdata(keyword)

  }
  public yourFile: any
  public base64textString: any

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
    console.log("this.base64textString : ", this.base64textString);
  }


  //ฟังชั่นsearch

  //เพิ่มข้อมูล
  async insertcustomer(Modal: any) {
    try {
      let pram = { tbname: "insertcustomer", data: this.activecustomer, uid: this.va.userdata, pic: this.base64textString };
      console.log("pram:", pram)

      var response;

      response = await this.http.post<any>("http://localhost:9000/insertcustomer", pram).toPromise();

      console.log("insertcustomer:response", response);

      if (response.code == "000" && response.msg == "ok") {

        alert("บันทึกสำเร็จ");
        Modal.close()
      }
      else {

        alert("บันทึกไม่สำเร็จกรุณาตรวจสอบใหม่อีกครั้ง");

      }
    } catch (ex) {

    }

  }







  ///ฟังชั่นรวม  //ฟังชั่นsearch
  async getdata(key: any) {
    let pram = { tbname: "searchcustomers", keyword: key };
    try {
      var response = await this.va.getdata("customers", pram)
      if (response.data.length > 0) {
        this.rowData = response.data;
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {

    }
  }
}
