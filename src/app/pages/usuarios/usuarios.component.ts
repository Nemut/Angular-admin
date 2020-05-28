import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  page: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarusuarios( this.page )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;

              });

  }

  cambiarDesde( valor: number ) {

    let page = this.page === 0 ? 1 : this.page;
    
    // Siguiente pagina
    page += valor;

    if ( !page ) return;

    if ( (this.totalRegistros > (5 * page)) || ( ((5 * page) - this.totalRegistros) < 5) ) {
      this.page = page;
      this.cargarUsuarios();
      
    } else {
      return;
    }  
    
  }

  buscarUsuario( termino: string) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
            .subscribe( (usuarios: Usuario[]) => {
              this.usuarios = usuarios;
              this.cargando = false;
            });

  }

  borrarUsuario(usuario: Usuario) {

    if ( usuario.id === this._usuarioService.usuario.id ) {
      Swal.fire(
        'No se puede borrar',
        'No se puede borrar a si mismo',
        'error'
      );
      return;
    }

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

        this._usuarioService.borrarUsuario( usuario )
            .subscribe( (borrado: boolean) => {
              console.log(borrado);
              this.cargarUsuarios();
            });        
      }
    });
    
  }

  guardarUsuario(usuario: Usuario) {

    this._usuarioService.actualizarUsuario(usuario)
            .subscribe();
    
  }

}
