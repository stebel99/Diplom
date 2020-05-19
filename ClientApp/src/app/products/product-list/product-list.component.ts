import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
export class ProductListComponent implements OnInit, OnDestroy {

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
              private modalService: BsModalService,
              private fb: FormBuilder,
              private chRef: ChangeDetectorRef
  ) { }

  onAddProduct() {
    this.modalRef = this.modalService.show(this.modal);
  }

  onSubmit() {
    let newProduct = this.insertForm.value;

    this.productservice.insertProduct(newProduct).subscribe(
      result => {
        this.productservice.clearCache();
        this.products$ = this.productservice.getProducts();

        this.products$.subscribe(newlist => {
          this.products = newlist;
          this.modalRef.hide();
          this.insertForm.reset();
          this.rerender();

        });
        console.log("New Product added");

      },
      error => console.log('Could not add Product')

    )

  }

  onUpdate() {
    let editProduct = this.updateForm.value;
    this.productservice.updateProduct(editProduct.id, editProduct).subscribe(
      result => {
        console.log('Product Updated');
        this.productservice.clearCache();
        this.products$ = this.productservice.getProducts();
        this.products$.subscribe(updatedlist => {
          this.products = updatedlist;

          this.modalRef.hide();
          this.rerender();
        });
      },
      error => console.log('Could Not Update Product')
    )
  }








  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
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

      this.chRef.detectChanges();

      this.dtTrigger.next();
    });

    this.modalMessage = "Все поля обязательны к заполнению";

    let validateImageUrl: string = '^(https?:\/\/.*\.(?:png|jpg))$';


    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this.imageUrl = new FormControl('', [Validators.required, Validators.pattern(validateImageUrl)]);

    this.insertForm = this.fb.group({

      'name': this.name,
      'price': this.price,
      'description': this.description,
      'imageUrl': this.imageUrl,
      'outOfStock': true,

    });


    // Initializing Update Product properties
    this._name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this._price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this._description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this._imageUrl = new FormControl('', [Validators.required, Validators.pattern(validateImageUrl)]);
    this._id = new FormControl();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
