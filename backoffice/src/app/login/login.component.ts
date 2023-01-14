import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AdminService } from '../shared/admin/admin.service';
import { Admin } from '../shared/admin/admin.model';

import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AdminService]
})
export class LoginComponent implements OnInit {
  email!: string;
  mdp!: string;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  traitementLogin() {
    var adm = new Admin();
    adm.email = this.email;
    adm.mdp = this.mdp;
    this.adminService.traitementLoginAdmin(adm).subscribe((res) => {
      if(res) {
        this.router.navigate(['../acceuil']);
      } else {
        alert("Compte introuvable")
      }
    })
  }

}
