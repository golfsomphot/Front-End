import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { varible } from '../varible';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  constructor(private http: HttpClient, private ngbModal: NgbModal, private va: varible, private router: Router) {

  }
  async ngOnInit() {

    await this.router.events.subscribe((page) => {
      if (page instanceof NavigationStart) {
        console.log("page.url", page.url);
        if (page.url != '/quotation') {
          this.ngbModal.dismissAll();
        }
      }
    });
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
  }
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


  async changedpd(event: any) {
    try {
      var inputs = (event.target as HTMLInputElement).value;
      const result = this.products.find((pd: { productname: string }) => pd.productname === inputs);
      this.active.Prices = result.price;

    } catch (error) {

    }
  }
  changedUnit() {
    this.active.total = this.active.Prices * this.active.unit;
  }
  //เปิดmodal
  btn_openmodal(openmodal: any) {
    this.ngbModal.open(openmodal, { size: 'lg' });
  }
  btn_additem(additem: any) {
    this.Searchqt("");
    this.ngbModal.open(additem, { size: 'none' });
  }

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
  }

  async Searchqt(key: any) {
    let pram = { tbname: "addqt", keyword: key };
    try {
      var response = await this.va.getdata("products", pram);
      if (response.data.length > 0) {
        this.products = response.data;

        console.log("this.products:", this.products)
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {

    }
  }
  async btnSearch(keyword: any) {
    await this.getdata(keyword)
  }
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
  }


}
