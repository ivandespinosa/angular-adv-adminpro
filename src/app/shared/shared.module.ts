import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
