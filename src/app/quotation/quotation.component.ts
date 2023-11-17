import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { varible } from '../varible';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  constructor(private ngbmodal: NgbModal, private http: HttpClient, private va: varible, private router: Router) { }


  product: any = [];
  selectedValue: string = '';
  Activequotation: any = {
    quocode: "",
    billtoname: "",
    ship: "",
    billaddress: "",
    shipaddress: "",
    paymentterm: "",
    remark: "",
    amount: 0.00,
    vat: 0.00,
    total: 0.00,
    discount: 0.00,
    totalline: 0,
    reqdate: "",
    saleid: 0,
    salename: "",
    empid: 0,
    empname: "",
    detail: [],
    custid: 0,
  }

  public Activequodetail: any = {
    quocode: "",
    item: 1,
    productcode: "",
    qty: 0,
    unitprice: 0.00,
    amount: 0,
    discount: 0,
    vat: 0.00,
    total: 0.00,
    remark: "",

  };


  productcode: any;
  rowData = [];
  rowData2: any[] = [];
  customerlist: any[] = [];
  employeelist: any[] = [];
  quotationdata: any;

  async ngOnInit() {
    this.getdata("");

    await this.router.events.subscribe((page) => {
      if (page instanceof NavigationStart) {
        console.log("page.url", page.url);
        if (page.url != '/quotation') {
          this.ngbmodal.dismissAll();
        }
      }
    });
  }


  //ปุ่มค้นหาหลัก
  btnSearch(keyword: any) {
    this.getdata(keyword);
  };
  //ฟังชั่น ลบ item ใน detail
  deleteitem(item: any) {

    if (confirm("Are you sure to delete " + item.item + " " + item.productcode)) {
      var listdetail: any[] = this.Activequotation.detail;
      this.Activequotation.amount -= item.amount;
      this.Activequotation.vat -= item.vat;
      this.Activequotation.total -= item.total;
      console.log("listdetail : ", listdetail);
      var remove = listdetail.findIndex(x => x.item == item.item);
      listdetail.splice(remove, 1);
      var n = 1;
      listdetail.forEach(detail => {
        detail.item = n;
        n++;
      });

    }
  };
  //คำสั่ง ดึงข้อมูลจาก customer
  async getcustomer() {
    let pram = { tbname: "getcustomer" }
    try {
      var response = await this.va.getdata("getquotation", pram);
      // console.log("response: ", response);
      if (response.data.length > 0) {
        this.customerlist = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
    return [];

  };
  //ดึงข้อมูลจาก employee
  async getemployee() {
    let pram = { tbname: "getemployee" }
    try {
      var response = await this.va.getdata("getquotation", pram);
      // console.log("response: ", response);
      if (response.data.length > 0) {
        this.employeelist = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
    return [];

  };

  //คำสั่ง กดปิด modal
  closemodal_click(modal: any) {

    modal.dismiss();
    /* this.page = 1; */
  };

  columnDefs: ColDef[] = [
    { field: 'quocode', headerName: "Quotation Code" },
    { field: 'billtoname', headerName: "Customer" },
    { field: 'reqdate', headerName: "Req.Date" },
    { field: 'paymentterms', headerName: "Payment Term" },
    { field: 'item', headerName: "Item" },
    { field: 'amount', headerName: "Amount" },
    { field: 'discount', headerName: "Discount" },
    { field: 'total', headerName: "Total" },
  ];

  columnDefs2: ColDef[] = [
    { field: 'quocode', headerName: "NO.1", width: 67 },
    { field: 'productcode', headerName: "Item", width: 70 },
    { field: 'qty', headerName: "Unit", width: 70 },
    { field: 'unitprice', headerName: "Unit-price", width: 100 },
    { field: 'total', headerName: "Total", width: 70 },
  ];

  //ฟังชั่นในปุ่มเพิ่ม create
  opencreate_click(content: any) {
    this.ngbmodal.open(content, { size: 'lg' });
    this.getcustomer();
    this.getemployee();
    this.getproduct();
    this.Activequotation = {
      quocode: "",
      billtoname: "",
      ship: "",
      billtoaddress: "",
      shipaddress: "",
      paymentterms: "",
      remark: "",
      amount: 0.00,
      vat: 0.00,
      total: 0.00,
      discount: 0.00,
      totalline: 0,
      reqdate: "",
      saleid: 0,
      salename: "",
      empid: 0,
      empname: "",
      detail: [],
    }
    this.Activequotation.quocode = this.va.datetostring(new Date, 4);
    this.Activequotation.reqdate = this.va.datetostring(new Date, 8);
    this.Activequotation.empname = this.va.userdata.fullname;
    this.Activequotation.empid = this.va.userdata.empid;


  };

  //ฟังชั่นเมื่อมีการเปลี่ยนแปลงจำนวน
  Item_Change() {

    this.Activequodetail.amount = this.Activequodetail.qty * this.Activequodetail.unitprice;
    if (this.Activequodetail.discount > this.Activequodetail.amount) {
      this.Activequodetail.discount = this.Activequodetail.amount;
    }
    this.Activequodetail.vat = (this.Activequodetail.amount - this.Activequodetail.discount) * 0.07;

    this.Activequodetail.total = (this.Activequodetail.amount - this.Activequodetail.discount) + this.Activequodetail.vat;

    console.log("Item_Change Activequodetail:", this.Activequodetail);
  };

  //ฟังชั่น เมื่อมีการเปลี่ยนแปลง  ลูกค้า
  customerchange(event: any) {
    var data = event.target.value;
    console.log("data : ", data);
    var selectdata = this.customerlist.find(x => x.custid == data);
    if (selectdata != undefined) {
      this.Activequotation.custid = selectdata.custid;
      this.Activequotation.billtoname = selectdata.custname;
      this.Activequotation.billtoaddress = selectdata.custaddress;
    } else {
      this.Activequotation.custid = 0;
      this.Activequotation.billtoname = "";
      this.Activequotation.billtoaddress = "";
    }
  };

  //ฟังชั่นเมื่อมีการเปลี่ยนแปลง พนักงาน  
  employeechange(event: any) {

    var data = event.target.value;
    // console.log("data : ", data);
    var selectdata = this.employeelist.find(x => x.empid == data);
    if (selectdata != undefined) {
      this.Activequotation.saleid = selectdata.empid;
      this.Activequotation.salename = selectdata.fullname;

    } else {
      this.Activequotation.saleid = 0;
      this.Activequotation.salename = "";
    }
  };

  //ปุ่ม Add Item
  btnadditem_click(contentadditem: any) {
    this.ngbmodal.open(contentadditem, { size: 'none' });
    this.Activequodetail = {
      quocode: "",
      item: 1,
      productcode: "",
      qty: 1,
      unitprice: 0.00,
      amount: 0,
      discount: 0,
      vat: 0.00,
      total: 0.00,
      remark: "",
    };
    this.Activequodetail.quocode = this.Activequotation.quocode;
  };
  //ฟังชั่น คลิ๊ก row
  async rowDoubleClicked(event: any, contentview: any) {
    this.ngbmodal.open(contentview, { size: 'lg' });

    this.quotationdata = event.data;
    var quocode = this.quotationdata.quocode;
    this.quotationdata.detail = await this.getquotationdetail(quocode);
    this.quotationdata.detail.quocode = quocode;
    console.log(" this.quotationdata", this.quotationdata)
    // this.quotationdata.empname = this.va.userdata.fullname;


    
  };

  //ฟังชั่น เรียก quotationdetail
  async getquotationdetail(qid: string) {
    let pram = { tbname: "getquodetail", quocode: qid }
    try {
      var response = await this.va.getdata("getquodetail", pram);
      // console.log("getquotationdetailresponse", response);
      if (response.data.length > 0) {
        return response.data;

      } else {
        return [];
      }
    } catch (ex) {

    }
  };

  // ฟังชั่น เรียก quotationdetail
  async getquodetail() {
    let pram = { tbname: "getquodetail" }
    try {
      var response = await this.va.getdata("getquodetail", pram);

      if (response.data.length > 0) {
        this.rowData2 = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
  };

  //ฟังชั่น เรียกข้อมูล  quotation
  async getdata(key: string) {
    let pram = { tbname: "getquotation", keyword: key }
    try {
      var response = await this.va.getdata("getquotation", pram);
      // console.log("getdata:response,:response", response);
      if (response.data.length > 0) {
        this.rowData = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
  };

  //ฟังชั่น เรียกข้อมูล  product
  async getproduct() {
    let pram = { tbname: "getproduct" }
    try {
      var response = await this.va.getdata("getquotation", pram);

      if (response.data.length > 0) {
        this.product = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
  };

  // ฟังชั่น Save detail
  async savequodetail(qdata: any) {
    let pram = { tbname: "insertquodetail", data: qdata, uid: this.va.userdata.empid };
    var quodetail = await this.http.post<any>("http://localhost:9000/insertquodetail", pram).toPromise();
    console.log(" savequodetail quodetail", quodetail)
    if (quodetail.code == "000" && quodetail.msg == "OK") {
      return true;
    } else {
      return false;
    }
  };
  //ฟังชั่น InSertquotation +
  async insertquotation(modal: any) {
    var response;
    try {
      let pram = { tbname: "insertquotation", data: this.Activequotation, uid: this.va.userdata.empid };
      var insertquotation = await this.http.post<any>("http://localhost:9000/quoinsert", pram).toPromise();

      if (insertquotation.code == "000") {

        for (var i = 0; i < this.Activequotation.detail.length; i++) {
          var qdata = this.Activequotation.detail[i];
          console.log("qdata", qdata);
          qdata.quocode = this.Activequotation.quocode;

          if (!await this.savequodetail(qdata)) {
            alert("บันทึกสำเร็จ");
            modal.close();
          }
        }
      } else {
        alert("บันทึก quotation ไม่สำเร็จ กรุณาตรวจสอบใหม่อีกครั้ง");
      }
    } catch (ex: any) {

    }
    return;
  };



  // คำสั่ง เพิ่ม item เข้าหน้าquodetail 
  async insertitemproduct(modal: any) {
    try {

      var detail = { ...this.Activequodetail }; // ... เป็นคำสั่ง copy Activequodetail 
      detail.item = this.Activequotation.detail.length + 1;
      detail.amount = detail.qty * detail.unitprice;
      detail.vat = (detail.amount - detail.discount) * 0.07;
      detail.total = (detail.amount - detail.discount) + detail.vat;
      this.Activequotation.detail.push(detail);
      this.Activequotation.amount += detail.amount;
      this.Activequotation.vat += detail.vat;
      this.Activequotation.total += detail.total;

      modal.close();

    } catch (ex: any) {

    }
    return;
  };

}
