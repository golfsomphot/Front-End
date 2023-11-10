import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { varible } from '../varible';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private ngbModal: NgbModal, private http: HttpClient, private va: varible) {

  }

  ngOnInit() {
    this.getdata("");
  }
  //ตัวแปลในmodal
  public activeproducts: any = {
    productscode: "",
    productsid: "",
    productsname: "",
    unit: "",
    qtyperpack: "",
    price: "",
    remark: "",
  };
  rowDoubleClicked(event: any, contentupdate: any) {

    this.ngbModal.open(contentupdate, { size: 'lg' });
    //console.log("event : ", event.data);

  }
  //ข้อมูลภายใน ng และ 
  rowData = [];
  columnDefs: ColDef[] = [

    { field: 'productcode', headerName: "Product-Code" },
    { field: 'productid', headerName: "Product-Id" },
    { field: 'productname', headerName: "Name" },
    { field: 'unitid', headerName: "Unit" },
    { field: 'qtyperpack', headerName: "Qty" },
    { field: 'price', headerName: "Price" },
    { field: 'price2', headerName: "Price", },
  ];
  // ฟังชั่นเปิด modal
  open(customeradd: any) {
    this.ngbModal.open(customeradd, { size: 'lg' });
    //ตั้งรูปเริ่มต้น ให้เป็นรูปจากพาท 
    this.base64textString = "../../assets/photo/pdprofilradd.png"
    console.log();
  }
  //ฟังชั่นเพิ่มรูป

  //ปุ่มSearch
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

  async getINSERT(modal: any) {
    let pram = { tbname: "insertproducts", data: this.activeproducts, uid: this.va.userdata ,pic: this.base64textString};

    var response;
    try {

      response = await this.http.post<any>("http://localhost:9000/productsinsert", pram).toPromise();
      console.log("response:", response)

      if (response.code == "000" && response.msg == "ok") {
        alert("บันทึกข้อมูลเรียบร้อย");
        modal.close()
      } else {
        alert("ไม่สามารถบันทึกข้อมูลได้");
      }
    } catch (error) {
      alert("บันทึกข้อมูลไม่สำเร็จ");
    }
    return response;
  }
  async getdata(key: any) {
    let pram = { tbname: "searchproducts", keyword: key };

    console.log("searchproducts:", response);
    try {
      var response = await this.va.getdata("products", pram);
      if (response.data.length > 0) {
        this.rowData = response.data;
      } else {
        alert("ไม่พบข้อมูล");
      }
    } catch (error) {

    }
  }

}
