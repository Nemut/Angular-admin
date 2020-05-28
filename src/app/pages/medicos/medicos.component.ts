import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = true;

  constructor(
    public _medicosService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {

    this.cargarMedicos();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarMedicos());
    
  }

  cargarMedicos() {

    this.cargando = true;

    this._medicosService.cargarMedicos()
              .subscribe( (resp: any) => {                
                this.medicos = resp;console.log(resp);
                this.cargando = false;
              });

  }

  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicosService.buscarMedicos(termino)
        .subscribe(medicos => {
          this.medicos = medicos;
          this.cargando = false;
        });
    
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('medicos', id);
  }

  borrarMedico(medico: Medico) {    

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

        this._medicosService.borrarMedico( medico.id )
            .subscribe( (borrado: boolean) => {
              console.log(borrado);
              this.cargarMedicos();
            });        
      }
    });
    
  }

}
