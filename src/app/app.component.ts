import { Component, OnInit } from '@angular/core';

import {TranslateService} from "@ngx-translate/core";
import { environment } from '../environments/environment.prod';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  lang: string = environment.lang;

  constructor(private translate: TranslateService, private authSrv: AuthService) {
    translate.setDefaultLang(this.lang);
    translate.use(this.lang);
  }

  title = 'product-management';
}
