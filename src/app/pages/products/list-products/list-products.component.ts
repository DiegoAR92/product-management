import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, startWith, switchMap, catchError, of, Subscription, merge } from 'rxjs';
import { Category, Product } from '../../../interfaces/product.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  limit: number = 5
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

  constructor(private productSrv: ProductsService, private route: ActivatedRoute) { }
  
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
}
