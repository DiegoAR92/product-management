import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product? : string;
  @Input() amountToCheck?: number;
  @Input() id?: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(){
    this.router.navigateByUrl(`/list-products/${this.id}`);
  }

}
