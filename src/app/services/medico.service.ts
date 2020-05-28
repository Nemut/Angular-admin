import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from './usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    
    let url = URL_SERVICIOS + '/doctor';

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };

    return this.http.get( url, httpOptions ).pipe(
              map((resp: any) => {

                this.totalMedicos = resp.doctors[1];
                return resp.doctors[0];
                
              })
            );

  }

  buscarMedicos( termino: string) {

    let url = URL_SERVICIOS + '/doctor/busqueda?q=' + termino;
    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.doctors)
      );

  }

  borrarMedico(id: string) {

    const url = URL_SERVICIOS + '/doctor/' + id;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };
    
    return this.http.delete(url, httpOptions)
                .pipe(
                  map(resp => {                    
                    Swal.fire(
                      'Borrado!',
                      `El medico fue borrado`,
                      'success'
                    );

                    return true;
                  })
                );

  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/doctor';

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };

    if ( medico.id ) {

      url += '/' + medico.id;

      // Actualizando
      return this.http.patch(
        url, 
        {
          ... medico,
          hospitalId: medico.hospital
        }, 
        httpOptions
      )
        .pipe(
          map((resp: any) => {
  
            Swal.fire(
              'Usuario actualizado',
              medico.nombre,
              'success'
            );
  
            return resp.doctor;
  
          })
        );

    } else {

      // Creando
      return this.http.post(url, medico, httpOptions)
        .pipe(
          map((resp: any) => {
  
            Swal.fire(
              'Usuario creado',
              medico.nombre,
              'success'
            );
  
            return resp.doctor;
  
          })
        );

    }
    
  }

  cargarMedico(id: string) {

    const url = URL_SERVICIOS + '/doctor/' + id;

    return this.http.get(url)
      .pipe(
        map( (resp: any) => {
          return resp.doctor;
        })
      );
    
  }
  
}
