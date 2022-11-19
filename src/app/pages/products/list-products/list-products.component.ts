import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, startWith, switchMap, catchError, of, Subscription, merge } from 'rxjs';
import { Category, Product } from '../../../interfaces/product.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit, AfterViewInit , OnDestroy {
  paginator?: MatPaginator;
  sort?: MatSort;

  #reloadData: Subject<void> = new Subject<void>;
  #subscription = new Subscription();

  id!: string;
  page: number = 1;
  limit: number = 5;
  products: Product[] = [];
  displayedColumns: string[] = ['name','price','format','mark', 'actions'];

  @ViewChild(MatPaginator, {static: false}) set pagSet(paginator: MatPaginator){
    if(paginator){
      this.paginator = paginator;
    }
  }

  @ViewChild(MatSort, {static: false}) set sortSet(sort: MatSort){
    if(sort){
      this.sort = sort;
    }
  }

  constructor(
    private productSrv: ProductsService, 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private translate: TranslateService) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.#loadObservables();
  }

  ngAfterViewInit(): void {
    this.#loadData();
  }

  ngOnDestroy(): void {
    this.#reloadData.unsubscribe();
    this.#subscription.unsubscribe();
  }

  #loadObservables(){
    this.#reloadData = new Subject();
  }

  #reload(){
    this.#reloadData.next();
  }

  #loadData(){
    this.#subscription.add(
      this.sort?.sortChange.subscribe(() => (this.paginator!.pageIndex = 0))
    );
    this.#subscription.add(
      merge(
        this.paginator!.page.asObservable(),
        this.sort!.sortChange.asObservable(),
        this.#reloadData.asObservable()
      )
      .pipe(
        startWith({}),
        switchMap(() => this.productSrv.getProductsByCategory(this.id, this.page, this.limit)!),
        catchError((err) => {
          console.error(err);
          return of();
        })
      ).subscribe(resp => {
        this.products = resp;
      }));
  }

  openDeletedDialog(product: Product){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    panelClass: 'custom-confirmation-dialog-container',
    width: '40vw',
    height: '20vh',
    hasBackdrop: false,
    data: {
      title: this.translate.instant('products.dialog.delete.title'),
      message: this.translate.instant('products.dialog.delete.message'),
      textBtnLeft: this.translate.instant('products.dialog.delete.btn_left'),
      textBtnRigth: this.translate.instant('products.dialog.delete.btn_rigth'),
      classBtnLeft: '',
      classBtnRigth: 'delete-btn',
    }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.productSrv.deleteProduct(product.id.toString()).subscribe();
        this.#reload();
      }
    })
  }
}
