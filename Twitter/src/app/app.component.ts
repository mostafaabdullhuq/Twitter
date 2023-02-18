import { Component, OnInit } from '@angular/core';
import { LoggedService } from './Services/logged.service';
import { Router } from '@angular/router';
import { TokenService } from './Services/token.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'Twitter';
  public loggedIn: boolean= true;

constructor(
  private Logged: LoggedService,
  private router: Router,
  private Token: TokenService,
  private snotifyService: SnotifyService,

  ) { }

ngOnInit(): void {
    this.Logged.authStatus.subscribe(value => this.loggedIn=value);
    
  }

  logout(event: MouseEvent){
   event.preventDefault();
   this.Token.remove();
   this.Logged.changeAuthStatus(false);
   this.router.navigateByUrl('/login');
  }  

}
