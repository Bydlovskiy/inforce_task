import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICommentResponse } from 'src/app/shared/interfaces/IComment-interface';
import { IProductResponse } from 'src/app/shared/interfaces/product-interface';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  public productList !: IProductResponse[];
  public currentDetailProductData !: IProductResponse;
  public currentComments !: ICommentResponse[];
  public addCommentOpened = false;
  public addModalOpened = false;
  public detailModalOpened = false;
  public confirmedOpened = false;
  public confirmedCommentOpened = false;
  public isEdit = false;
  public deleteCommentId !: number;
  public commentForm !: FormGroup;
  public addProductForm !: FormGroup;

  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initAddForm();
    this.initCommentForm();
    this.initProductList();
  }

  // Forms Inits

  initAddForm(): void {
    this.addProductForm = this.fb.group({
      id: [null],
      imageUrl: [null, Validators.required],
      name: [null, Validators.required],
      count: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
    })
  }

  initCommentForm(): void {
    this.commentForm = this.fb.group({
      productId: [null],
      commentText: [null, Validators.required],
      date: new Date()
    })
  }

  // Products

  initProductList(): void {
    this.productService.getAll().subscribe(data => {
      this.productList = data;
    })
  }

  addProduct(): void {
    if (this.addProductForm.valid) {
      let productData: any = this.addProductForm.value;
      productData.size = {
        width: productData.width,
        height: productData.height
      }
      delete productData['width'];
      delete productData['height'];
      this.productService.create(productData).subscribe(() => {
        this.addModalOpened = false;
        this.addProductForm.reset();
        this.initProductList();
      })
      this.toastr.success('Succsesfully added')
    } else {
      this.toastr.error('Check yor form')
    }
  }

  productDetail(id: number): void {
    this.productService.getOne(id).subscribe(data => {
      this.currentDetailProductData = data;
      this.getComments();
    })
    this.detailModalOpened = true;
  }

  editProduct(): void {
    this.addProductForm.patchValue({
      id: this.currentDetailProductData.id,
      imageUrl: this.currentDetailProductData.imageUrl,
      name: this.currentDetailProductData.name,
      count: this.currentDetailProductData.count,
      width: this.currentDetailProductData.size.width,
      height: this.currentDetailProductData.size.height,
      weight: this.currentDetailProductData.weight
    });
    this.isEdit = true;
    this.addModalOpened = true;
  }

  saveProduct(): void {
    if (this.addProductForm.valid) {
      let productData: any = this.addProductForm.value;
      productData.size = {
        width: productData.width,
        height: productData.height
      }
      delete productData['width'];
      delete productData['height'];
      this.currentDetailProductData = this.addProductForm.value;
      this.productService.update(productData, productData.id).subscribe(() => {
        this.toastr.success('Succsesfully saved')
        this.initProductList();
        this.addModalOpened = false;
        this.isEdit = false;
      })
    } else {
      this.toastr.error('Check yor form')
    }

  }

  deleteProduct(): void {
    this.productService.delete(this.currentDetailProductData.id).subscribe(() => {
      this.confirmedOpened = false;
      this.detailModalOpened = false;
      this.initProductList();
      this.toastr.success('Succsesfully deleted')
    })
  }

  // Comments

  getComments(): void {
    this.commentsService.getAll().subscribe(data => {
      this.currentComments = data.filter(el => el.productId == this.currentDetailProductData.id)
    })
  }

  addComment(): void {
    this.commentForm.patchValue({
      productId: this.currentDetailProductData.id,
    })
    if (this.commentForm.valid) {
      this.commentsService.create(this.commentForm.value).subscribe(() => {
        this.toastr.success('Succsesfully saved')
        this.getComments();
        this.addCommentOpened = false;
        this.commentForm.reset();
      })
    } else {
      this.toastr.error('Check yor form')
    }
  }

  deleteComment(id: number): void {
    this.deleteCommentId = id;
    this.confirmedCommentOpened = true;
  }

  confirmDelete(): void {
    this.commentsService.delete(this.deleteCommentId).subscribe(() => {
      this.getComments();
      this.toastr.success('Succsesfully deleted')
      this.confirmedCommentOpened = false;
    })
  }

  closeAdd(): void {
    this.addModalOpened = false;
    this.addProductForm.reset();
  }

  closeDetails(): void {
    this.detailModalOpened = false;
    this.addCommentOpened = false;
  }



}
