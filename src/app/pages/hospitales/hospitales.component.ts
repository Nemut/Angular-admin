import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];  
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarHospitales());
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales()
              .subscribe( (resp: any) => {

                this.totalRegistros = this._hospitalService.totalHospitales;
                this.hospitales = resp;
                this.cargando = false;

              });

  }

  buscarHospital( termino: string) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales( termino )
            .subscribe( (hospitales: Hospital[]) => {
              this.hospitales = hospitales;
              this.cargando = false;
            });

  }

  borrarHospital(hospital: Hospital) {    

    Swal.fire({
      title: 'Está seguro?',
      text: "Está a punto de borrar un usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {

        this._hospitalService.borrarHospital( hospital.id )
            .subscribe( (borrado: boolean) => {
              console.log(borrado);
              this.cargarHospitales();
            });        
      }
    });
    
  }

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
            .subscribe();
    
  }

  crearHospital() {

    Swal.fire({
      title: 'Nombre hospital',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {        
        if ( value.length < 3 ) {          
          return 'Necesita escribir algo';
        }
      }
    }).then((valor) => {
      
      if ( valor.hasOwnProperty('dismiss')) return;

      this._hospitalService.crearHospital( valor.value )
          .subscribe(() => {
            this.cargarHospitales();
          });

    });

// if (ipAddress) {
//   Swal.fire(`Your IP address is ${ipAddress}`)
// }
  }

}
