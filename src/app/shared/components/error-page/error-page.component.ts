import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  error?: string | null;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.error = this.route.snapshot.paramMap.get('error');
  }

}
