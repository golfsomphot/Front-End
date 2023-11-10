import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-saleorder',
  templateUrl: './saleorder.component.html',
  styleUrls: ['./saleorder.component.css']
})
export class SaleorderComponent implements OnInit {
  constructor(private http: HttpClient, private ngbModal: NgbModal) {

  }

  ngOnInit() {

  }
  public page: any = 1;
  rowData = [];
  columnDefs: ColDef[] = [
    { field: ' ', headerName: "S0 Code", width: 150 },
    { field: ' ', headerName: "Customer", width: 200 },
    { field: ' ', headerName: "Req.Date", width: 150 },
    { field: ' ', headerName: "Payment Term", width: 150 },
    { field: '', headerName: "Item", width: 200 },
    { field: ' ', headerName: "Amount", width: 150 },
    { field: ' ', headerName: "Discount", width: 150 },
    { field: ' ', headerName: "Total", width: 180 }

  ];
  rowData2 = [];
  columnDefs2: ColDef[] = [
    { field: 'quocode', headerName: "Quotation Code", width: 150 },
    { field: 'Customer', headerName: "Customer", width: 150 },
    { field: 'reqdate', headerName: "Req.Date", width: 150 },
    { field: 'paymentterms', headerName: "Total", width: 150 },
    { field: '', headerName: "User Req.", width: 150 },
    //ตัวอย่างการสร้างและ ระบุ ขนาด
    // { field: '', headerName: "Total", width: 100 },

  ];
  rowData3 = [];
  columnDefs3: ColDef[] = [
    { field: 'quocode', headerName: "NO.", width: 150 },
    { field: 'Customer', headerName: "Customer", width: 150 },
    { field: 'reqdate', headerName: "Req.Date", width: 150 },
    { field: 'paymentterms', headerName: "Total", width: 150 },
    { field: '', headerName: "User Req.", width: 150 },
    //ตัวอย่างการสร้างและ ระบุ ขนาด

  ];
  //ปุ่มเปิดmodal
  open(customeradd: any) {

    this.ngbModal.open(customeradd, { size: 'lg' });
    console.log("content", customeradd);
  }
  Next_click() {
    this.page++;

  }
  Back_click(modal: any) {
    modal.dismiss()
    this.page--;
  }
  async getsaleorder(key: string) {

    var response;
    let pram = { tbname: "getsaleorder", key };
    try {
      response = await this.http.post<any>("http://localhost:9000/saleorder", pram).toPromise();
      if (response.data.length > 0) {
        this.rowData = response.data;
        // this.activeemployees.position = response.data[0].id
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {
      alert("ค้นหาไม่สำเร็จ");
    }
    return response;
  }
}
