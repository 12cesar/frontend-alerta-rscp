import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { closeAlert, loadData } from 'src/app/function/cargando';
import { ToastSuccess } from 'src/app/function/validar';
import { ResultDni } from 'src/app/interface/dni';
import { FormUsuario } from 'src/app/interface/formusuario';
import { ResultRol, Rol } from 'src/app/interface/rol';
import { ResultSemanas, Semana } from 'src/app/interface/semana';
import { ResultUserInd } from 'src/app/interface/usuario';
import { RolService } from 'src/app/servicios/rol.service';
import { SemanasService } from 'src/app/servicios/semanas.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ValidarSunatService } from 'src/app/servicios/validar-sunat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  listRol: Rol[] = [];
  listSemanas:Semana[]=[];
  active: string = '1';
  titulo: string = 'Crear';
  cargar: boolean = true;
  semana=[];
  data:FormUsuario={
    apellido:'',
    dni:'',
    nombre:'',
    password:'',
    rol:'',
    semanas:[],
    celular:'',
    usuario:''
  };
  constructor(
    private userService: UsuarioService,
    private rolService: RolService,
    private semanaServices:SemanasService,
    private dniService:ValidarSunatService
  ) {
   
   }

  ngOnInit(): void {
    this.mostrarRol();
    this.mostrarSemanas();
  }


  mostrarSemanas(){
    this.semanaServices.getSemanas().subscribe(
      (data:ResultSemanas)=>{
        this.listSemanas = data.semanas;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  userAdd() {
    const dato = new FormData();
    dato.append('nombre',this.data.nombre);
    dato.append('apellido',this.data.apellido);
    dato.append('usuario',this.data.usuario);
    dato.append('password',this.data.password);
    dato.append('celular',this.data.celular);
    dato.append('dni',this.data.dni);
    dato.append('rol',this.data.rol);
    Array.from(this.data.semanas).forEach((f:any) => {dato.append('semana',f)});
    this.userService.postUser(dato).subscribe(
      (dat:any)=>{
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${dat.msg}`,
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error)=>{
        
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: `${error.error.errors[0].msg}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
  mostrarRol() {
    this.rolService.getRoles(1).subscribe(
      (data: ResultRol) => {
        this.listRol = data.rol;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancelar() {
   this.data={
    apellido:'',
    dni:'',
    nombre:'',
    password:'',
    rol:'',
    semanas:[],
    celular:'',
    usuario:''
   }
    this.titulo = 'Crear';
  }
  buscarSunat(){
    this.cargar=true
    if (this.cargar) {
      loadData('Cargando Datos','Espere porfavor');
    }
    this.dniService.getValidarSunat(this.data.dni).subscribe(
      (dato:ResultDni)=>{
        console.log(dato);
        this.data.nombre=dato.data.nombre;
        this.data.apellido=dato.data.apellido;
        this.cargar=false;
        if (!this.cargar) {
          closeAlert();
        }        
      },
      (error)=>{
        closeAlert();
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: `${error.error.msg}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
