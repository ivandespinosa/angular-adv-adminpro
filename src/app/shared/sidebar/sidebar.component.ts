import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  //menuItems: any[];
  
  constructor( public sidebarService: SidebarService,
               private usuarioService: UsuarioService ) {
    //this.menuItems = sideService.menu;
    //console.log(this.menuItems);
    this.usuario = usuarioService.usuario
   }

  ngOnInit(): void {
  }

}
