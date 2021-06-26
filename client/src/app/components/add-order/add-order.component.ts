import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { OrderService } from 'src/app/services/order.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { map, startWith, distinctUntilChanged, debounceTime, switchMap, filter } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  orderForm: FormGroup;
  orderDetailsForm: FormGroup;
  lineItems = [];
  supplier: any = [];
  orderId;
  filteredOptions: Observable<any[]>;
  constructor(private supplierService: SupplierService, private matSnackBar: MatSnackBar,
    private orderService: OrderService, private _formBuilder: FormBuilder, private router: Router,
    private productService: ProductService, private activatedRoute: ActivatedRoute) {
    this.orderForm = this._formBuilder.group({
      id: [0],
      refId: ['', [Validators.required, TypeNumber]],
      poNo: ['', Validators.required],
      poDate: ['', Validators.required],
      supplierId: ['', Validators.required],
      expectedDate: ['', Validators.required],
      remark: ['']
    });
    this.orderDetailsForm = this._formBuilder.group({
      product: ["", Validators.required],
      qty: ["", [Validators.required, TypeNumber]],
      rate: [{ value: "", disabled: true }]
    });
    this.orderDetailsForm.get("product").valueChanges.subscribe(e => {
      this.AutoCompleteValidator(e, this.orderDetailsForm, "product");
    })
    this.filteredOptions = this.orderDetailsForm.controls['product'].valueChanges
      .pipe(
        startWith(''),
        filter(e => e && e.length > 0),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val || '')
        })
      );
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.orderId = +e.get('id');
      if (this.orderId > 0) {
        this.orderService.getById(this.orderId).subscribe(e => {
          console.log(e);
          if (e) {
            this.orderForm.patchValue(e);
            this.lineItems = e.orderDetails
              .map(e => {
                return {
                  id: e.id, productId: e.productId, name: e.product.name, qty: e.qty,
                  rate: e.product.rate, product: e.product
                }
              });
          }
        })
      }
    })
    this.supplierService.getList().subscribe(e => {
      if (e)
        this.supplier = e;
    })
  }
  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }
  onOptionSelected(event) {
    console.log(event)
    let value = event.option.value;
    this.orderDetailsForm.get("rate").setValue(value.rate);
  }
  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.productService.search(val)
      .pipe(
        map(response => {
          console.log(response)
          return response;
        })
      )
  }
  onAddItem(formDirective: FormGroupDirective) {
    if (this.orderDetailsForm.valid) {
      let product = this.orderDetailsForm.get('product').value;
      console.log(product)
      if (this.indexOnEdit > -1) {
        let productToUpdate = this.lineItems.filter((val, i) => { if (this.indexOnEdit == i) { return val } })[0];
        productToUpdate.qty = Number(this.orderDetailsForm.get('qty').value);
        productToUpdate.productId = product.productId;
        productToUpdate.name = product.name;
        productToUpdate.rate = product.rate;
        productToUpdate.product = undefined;
        formDirective.resetForm();
        this.indexOnEdit = undefined;
      } else {
        let qty = Number(this.orderDetailsForm.get('qty').value);
        this.lineItems.push({ productId: product.id, name: product.name, qty: qty, rate: product.rate });
        formDirective.resetForm();
      }
    }
  }
  indexOnEdit;
  onEditQualification(index: number) {
    this.indexOnEdit = index;
    let product = this.lineItems.filter((val, i) => { if (index == i) { return val } });
    console.log(product)
    product[0]['product'] = product[0];
    this.orderDetailsForm.patchValue(product[0]);
    // this.lineItems.push({ name: product.name, qty: qty, rate: product.rate });
  }
  onDeleteQualification(index: number) {
    this.lineItems.splice(index, 1);
  }
  onSave() {
    let val = this.orderDetailsForm.value;
    if (val.product) {
      this.matSnackBar.open("Please save the details first", "GOT IT", { duration: 5000 })
    }
    else {
      this.orderForm.markAllAsTouched();
      if (this.orderForm.valid) {
        if (this.lineItems.length > 0) {
          let data = this.orderForm.value;
          data['orderDetails'] = this.lineItems;
          data.refId = Number(data.refId);
          if (this.orderId > 0) {
            this.orderService.update(JSON.stringify(data)).subscribe(e => {
              console.log(e);
              if (e) {
                this.matSnackBar.open("Order update successfull", "OK", { duration: 5000 });
                this.router.navigateByUrl("/");
              }
            })
          }
          else {
            this.orderService.save(JSON.stringify(data)).subscribe(e => {
              if (e) {
                this.matSnackBar.open("Order updated successfull", "OK", { duration: 5000 });
                this.router.navigateByUrl("/");
              }
            })
          }
        }
        else {
          this.matSnackBar.open("You need to add at least one product", "GOT IT", { duration: 5000 });
        }
      }
    }
  }
  AutoCompleteValidator(value: string, form: FormGroup, controlName: string) {
    if (typeof value !== 'object') {
      form.get(controlName).setErrors({ 'required': true });
    }
  }
}
export function TypeNumber(control: AbstractControl): { [key: string]: any } | null {
  const value = Number(control.value);
  if (!isNaN(value)) {
    return null;
  }
  else {
    return { "typeNumber": true };
  }
};
