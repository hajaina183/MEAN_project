import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

const routes: Routes =[
  { path: "", component: LoginComponent},
  {
    path: 'acceuil',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'user-profile',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: UserProfileComponent,
      },
    ],
  },
  { 
    path: 'table-list',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: TableListComponent,
      },
    ], 
  },
  { 
    path: 'typography',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: TypographyComponent,
      },
    ], 
  },
  { 
    path: 'icons',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: IconsComponent,
      },
    ], 
  },
  { 
    path: 'maps',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: MapsComponent,
      },
    ], 
  },
  { 
    path: 'notifications',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: NotificationsComponent,
      },
    ], 
  },
  { 
    path: 'upgrade',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: UpgradeComponent,
      },
    ], 
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
