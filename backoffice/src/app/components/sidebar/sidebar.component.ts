import { Component, OnInit } from '@angular/core';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/depense', title: 'Depense',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/voiture-diagnostique', title: 'Voiture List',  icon:'design_bullet-list-67', class: '' },
    { path: '/voiture-garage', title: 'Garage List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    var adminJSON = localStorage.getItem('adminSession');
    var adminLS = adminJSON && JSON.parse(adminJSON);
    if(adminLS.grade == 1) {
      ROUTES.splice(7,2);
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else if(adminLS.grade == 0) {
      ROUTES.splice(5,1);
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
}
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
