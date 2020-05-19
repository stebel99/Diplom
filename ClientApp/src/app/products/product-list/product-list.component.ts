import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../../interfaces/product';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // For the FormControl - Adding products
  insertForm: FormGroup;
  name: FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  // Updating the Product
  updateForm: FormGroup;
  _name: FormControl;
  _price: FormControl;
  _description: FormControl;
  _imageUrl: FormControl;
  _id: FormControl;


  // Add Modal
  @ViewChild('template', {static:false}) modal: TemplateRef<any>;

  // Update Modal
  @ViewChild('editTemplate', { static: false }) editmodal: TemplateRef<any>;


  // Modal properties
  modalMessage: string;
  modalRef: BsModalRef;
  selectedProduct: Product;
  products$: Observable<Product[]>;
  products: Product[] = [];
  userRoleStatus: string;


  // Datatables Properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;




  constructor(private productservice: ProductService,
              private modalService: BsModalService
  ) { }

  onAddProduct() {
    this.modalRef = this.modalService.show(this.modal);
  }



  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.products$ = this.productservice.getProducts();

    this.products$.subscribe(result => {
      this.products = result;

      this.dtTrigger.next();
    });

    this.modalMessage = "Все поля обязательны к заполнению";

    let validateImageUrl: string = '^(https?:\/\/.*\.(?:png|jpg))$';

  }

}
