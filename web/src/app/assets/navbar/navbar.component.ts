import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/modelo/user.model';
import { SecurityService } from 'src/app/servicios/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private securityService:SecurityService) { }

  activeSession?:boolean = false;
  subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.subs = this.securityService.datosUsuarioSesion().subscribe((data: UserModel) => {
      console.log(data)
        this.activeSession = data.isLoggedIn;
    })
  }

}
