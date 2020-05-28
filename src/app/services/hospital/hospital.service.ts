import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get( url ).pipe(
      map( (resp: any) => {        
        this.totalHospitales = resp.hospitals.length;
        return resp.hospitals;
      })
    );

  }

  obtenerHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' +  id;

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        console.log(resp);
        return resp.hospital;
      })
    );

  }

  borrarHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };
    
    return this.http.delete(url, httpOptions)
                .pipe(
                  map(resp => {                    
                    Swal.fire(
                      'Borrado!',
                      `El hospital fue borrado`,
                      'success'
                    );

                    return true;
                  })
                );

  }

  crearHospital(nombre: string) {
    console.log('olakase');
    const url = URL_SERVICIOS + '/hospital';

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };

    // Retorna un observable    
    return this.http.post(url, {nombre}, httpOptions)
      .pipe(
        map((resp: any) => {

          Swal.fire(
            'Hospital creado',
            nombre,
            'success'
          );

          return resp.hospital;
        })
      );

  }

  buscarHospitales( termino: string) {

    let url = URL_SERVICIOS + '/hospital/busqueda?q=' + termino;
    return this.http.get(url)
      .pipe(
        map( (resp: any) => {
          return resp.hospitals;
        })
      );

  }

  actualizarHospital(hospital: Hospital) {

    const url = URL_SERVICIOS + '/hospital/' + hospital.id;

    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', auth: this._usuarioService.token }),

    };
    
    return this.http.patch(url, hospital, httpOptions)
      .pipe(
        map(
          (resp: any) => {            

            Swal.fire(
              'Usuario actualizado',
              hospital.nombre,
              'success'
            );

            return true;

          }
        )
      );

  }
  
}
