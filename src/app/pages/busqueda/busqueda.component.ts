import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from 'src/app/services/busquedas.service';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medicos.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private activateRoute: ActivatedRoute,
               private busquedasService: BusquedasService ) { }

  ngOnInit(): void {

    this.activateRoute.params
      .subscribe( ({ termino }) => { this.busquedaGlobal( termino ) });
  }

  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log( resp );
          this.usuarios   = resp.usuarios;
          this.medicos    = resp.medicos;
          this.hospitales = resp.hospitales;
        });
  }

}
