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
  constructor(private modal: NgbModal, private http: HttpClient, private va: varible, private router: Router) { }

  // page: any = 1;
  product: any = [];
  selectedValue: string = '';
  Activequotation: any = {
    quocode: "",
    bill: "",
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
  }

  public Activeitemproduct: any = {
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

  async ngOnInit() {
    this.getdata("");

    await this.router.events.subscribe((page) => {
      if (page instanceof NavigationStart) {
        console.log("page.url", page.url);
        if (page.url != '/quotation') {
          this.modal.dismissAll();
        }
      }
    });
  }


  btnSearch(keyword: any) {
    this.getdata(keyword);
  }

  deleteitem(item: any) {
    console.log("item : ", item);
    if (confirm("Are you sure to delete " + item.item + " " + item.productcode)) {

      var listdetail: any[] = this.Activequotation.detail;
      var i = listdetail.findIndex(x => x.item == item.item);
      listdetail.splice(i, 1);
      var n = 1;
      listdetail.forEach(detail => {
        detail.item = n;
        n++;
      });
    }


  }

  async getcustomer() {
    let pram = { tbname: "getcustomer" }
    try {
      var response = await this.va.getdata("getquotation", pram);
      console.log("response: ", response);
      if (response.data.length > 0) {
        this.customerlist = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
    return [];

  }

  async getemployee() {
    let pram = { tbname: "getemployee" }
    try {
      var response = await this.va.getdata("getquotation", pram);
      console.log("response: ", response);
      if (response.data.length > 0) {
        this.employeelist = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
    return [];

  }

  closemodal_click(modal: any) {

    modal.dismiss();
    /* this.page = 1; */
  }

  columnDefs: ColDef[] = [
    { field: 'quocode', headerName: "Quotation Code" },
    { field: 'billtoname', headerName: "Customer" },
    { field: 'reqdate', headerName: "Req.Date" },
    { field: 'paymentterms', headerName: "Payment Term" },
    { field: 'qtypack', headerName: "Item" },
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

  open(content: any) {
    this.modal.open(content, { size: 'lg' });
    this.getcustomer();
    this.getemployee();
    this.getproduct();
    this.Activequotation.quocode = this.va.datetostring(new Date, 4);
    this.Activequotation.reqdate = this.va.datetostring(new Date, 8);
    this.Activequotation.empname = this.va.userdata.fullname;
    this.Activequotation.empid = this.va.userdata.empid;

  }

  customerchange(event: any) {


    var data = event.target.value;
    console.log("data : ", data);


    var selectdata = this.customerlist.find(x => x.custid == data);
    if (selectdata != undefined) {
      this.Activequotation.custid = selectdata.custid;
      this.Activequotation.bill = selectdata.custname;
      this.Activequotation.billaddress = selectdata.custaddress;
    } else {
      this.Activequotation.custid = 0;
      this.Activequotation.bill = "";
      this.Activequotation.billaddress = "";
    }
  }

  employeechange(event: any) {

    var data = event.target.value;
    console.log("data : ", data);


    var selectdata = this.employeelist.find(x => x.empid == data);
    if (selectdata != undefined) {
      this.Activequotation.saleid = selectdata.empid;
      this.Activequotation.salename = selectdata.fullname;

    } else {
      this.Activequotation.saleid = 0;
      this.Activequotation.salename = "";
    }
  }

  btnadditem_click(contentadditem: any) {
    this.modal.open(contentadditem, { size: 'none' });

  }

  //api ต่างๆ
  async getdata(key: string) {
    let pram = { tbname: "getquotation", keyword: key }
    try {
      var response = await this.va.getdata("getquotation", pram);
      console.log("getdata response: ", response);
      if (response.data.length > 0 && response.code == '000') {
        this.rowData = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    };
  }

  async getproduct() {
    let pram = { tbname: "getproduct" }
    try {
      var response = await this.va.getdata("getquotation", pram);
      console.log("getproduct response : ", response);
      if (response.data.length > 0) {
        this.product = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
  }

  async getquodetail() {
    let pram = { tbname: "getquodetail" }
    try {
      var response = await this.va.getdata("getquodetail", pram);
      console.log("response: ", response);
      if (response.data.length > 0) {
        this.rowData2 = response.data;

      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (ex) {

    }
  }

  async insertquotation(modal: any) {
    var response;
    try {
      let pram = { tbname: "insertquotation", data: this.Activequotation, uid: this.va.userdata.empid };
      console.log("pram: ", pram);
      response = await this.http.post<any>("http://localhost:3000/quoinsert", pram).toPromise();
      if (response.code == "000" && response.msg == "OK") {
        alert("บันทึกสำเร็จ");
        modal.close();
      } else {
        alert("บันทึกไม่สำเร็จ กรุณาตรวจสอบใหม่อีกครั้ง");
      }
      //

    } catch (ex: any) {

    }
    return;
  }

  async insertitemproduct(modal: any) {
    var response;
    try {

      var detail = { ...this.Activeitemproduct }; // ... เป็นคำสั่ง copy activeitemproduct 


      detail.item = this.Activequotation.detail.length + 1;
      detail.amount = detail.qty * detail.unitprice;
      detail.vat = (detail.amount - detail.discount) * 0.07;
      detail.total = (detail.amount - detail.discount) + detail.vat;
      console.log("detail : ", detail)
      /* var item: any = {
        itemproductcode: this.Activeitemproduct.itemproductcode ,
        itemprice: this.Activeitemproduct.itemprice,
        numunit: this.Activeitemproduct.numunit,
        totalvalue: this.Activeitemproduct.totalvalue
      }; */


      this.Activequotation.detail.push(detail);

      console.log("Activequotation : ", this.Activequotation)
      modal.close();

    } catch (ex: any) {

    }
    return;
  }

}
