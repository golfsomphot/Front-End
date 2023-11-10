import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { varible } from '../varible';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  constructor(private http: HttpClient, private ngbModal: NgbModal, private va: varible) {
  };
  ngOnInit() {
    this.Searchqt("");
  }
  public page: any = 1;
  unitid: any[] = [];
  public rowData = [];
  products: any = [];
  public result: any;
  public changes: any;
  public active: any = {
    Prices: "",
    unit: "",
    total: "",
  };
  columnDefs: ColDef[] = [
    { field: 'quocode', headerName: "Quotation Code", width: 130 },
    { field: 'Customer', headerName: "Customer", width: 200 },
    { field: 'reqdate', headerName: "Req.Date", width: 150 },
    { field: 'paymentterms', headerName: "Payment Term", width: 200 },
    { field: '', headerName: "Item", width: 150 },
    { field: 'amount', headerName: "Amount", width: 150 },
    { field: 'discount', headerName: "Discount", width: 150 },
    { field: 'total', headerName: "Total", width: 200 }

  ];
  rowData2 = [];
  columnDefs2: ColDef[] = [
    { field: 'quocode', headerName: "NO.", width: 60 },
    { field: 'Customer', headerName: "item", width: 70 },
    { field: 'reqdate', headerName: "Unit", width: 60 },
    { field: 'paymentterms', headerName: "Unit-price", width: 80 },
    { field: '', headerName: "Total", width: 70 },

  ];

  //  ฟังชั่นเช็คราคาสินค้า หน้า additem
  async changedpd(event: any) {
    try {
      var inputs = (event.target as HTMLInputElement).value;
      const result = this.products.find((pd: { productname: string }) => pd.productname === inputs);
      this.active.Prices = result.price;

    } catch (error) {

    }
  };

  //ฟังชั่นรวมราคาสินค้า
  changedUnit() {
    this.active.total = this.active.Prices * this.active.unit;
  };

  //เปิดmodal
  open(customeradd: any) {
    this.ngbModal.open(customeradd, { size: 'lg' });
    // console.log("content", customeradd);
  };

  //ปุ่ม additem
  Next_click() {
    this.page++;
    // console.log(" Next_clickthis.page:", this.page);
  };

  //ปุ่มกดปิด modal
  Back_click(modal: any) {
    modal.dismiss()
    this.page--;
    // console.log("Back_click this.page:", this.page);
  };

  //ฟังชั่น เพิ่มข้อมูล หน้า additem
  async createquotation(modal: any) {
    let pram = { tbname: "createquotation" };
    try {
      var response = await this.va.getdata("createquotation", pram);
      if (response.code == "000" && response.msg == "ok") {
        alert("บันทึกข้อมูลเรียบร้อย");
        modal.close()
      } else {
        alert("ไม่สามารถบันทึกข้อมูลได้");
      }
    } catch (error) {
      alert("ไม่สามารถบันทึกข้อมูลได้");
      console.log(error);
    }
  };

  //ฟังชั่น ค้นหาสินค้าหน้า additem
  async Searchqt(key: any) {
    let pram = { tbname: "addqt", keyword: key };
    try {
      var response = await this.va.getdata("products", pram);
      if (response.data.length > 0) {
        this.products = response.data;

        // console.log("this.products:", this.products)
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {

    }
  };

  //ฟังชั่นปุ่มค้นหาสินค้า Search หลัก
  async btnSearch(keyword: any) {
    await this.getdata(keyword)
  };

  //ฟังชั่นค้นหาสินค้า Search หลัก
  async getdata(key: any) {

    let pram = { tbname: "pdquotation", keyword: key };
    try {
      var response = await this.va.getdata("quotation", pram);
      if (response.data.length > 0) {
        this.rowData = response.data;
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {

    }
  };


};
