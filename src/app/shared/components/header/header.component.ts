import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../../../interfaces/auth.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth: Auth | undefined;
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSvc.verifyLogged().subscribe(
      resp => {
        if(resp){
          this.auth = this.authSvc.auth;
        }
    })
  }

  login(){
    this.authSvc.login().subscribe(resp => {
      if(resp.id){
        this.auth = resp;
        this.router.navigate(['/']);
      }
    })
  }

  logout(){
    this.authSvc.logout();
    this.auth = undefined;
  }

}
