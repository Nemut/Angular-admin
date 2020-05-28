import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params.subscribe(params => {

      let termino = params.termino;
      this.buscar(termino);
      
    });
  }

  ngOnInit(): void {
  }

  buscar( termino: string ) {

    let url = URL_SERVICIOS + '/user/busqueda?q=' + termino;

    this.http.get(url).subscribe( (resp: any) => {

      this.usuarios = resp.usuarios;

    });

  }

}
