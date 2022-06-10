import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { closeAlert, loadData } from 'src/app/function/cargando';
import { ResultRol } from 'src/app/interface/rol';
import {
  ResultUser,
  Rol,
  User,
  ResultUserInd,
} from 'src/app/interface/usuario';
import { RolService } from 'src/app/servicios/rol.service';
import { SemanasService } from 'src/app/servicios/semanas.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { ToastSuccess } from '../../function/validar';
import { Semana, ResultSemanas } from '../../interface/semana';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  listUser: User[] = [];
  listRol: Rol[] = [];
  listSemanas:Semana[]=[];
  active: string = '1';
  titulo: string = 'Crear';
  userForm: FormGroup;
  id: string = '';
  cargar: boolean = true;
  constructor(
    private userService: UsuarioService,
    private fb: FormBuilder,
    private rolService: RolService,
    private semanaServices:SemanasService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      password: '',
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarUsuarios();
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
  mostrarUsuarios() {
    if (this.cargar) {
      loadData('Cargando datos!!!', 'Porfavor espere');
    }
    this.userService.getUsers(this.active).subscribe(
      (data: ResultUser) => {
        this.listUser = data.user;
        if (this.cargar) {
          closeAlert();
        }
        this.cargar = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  userAddPut() {
    if (this.id === '') {
      const formData = new FormData();
      formData.append('nombre', this.userForm.get('nombre')?.value);
      formData.append('apellido', this.userForm.get('apellido')?.value);
      formData.append('usuario', this.userForm.get('usuario')?.value);
      formData.append('password', this.userForm.get('password')?.value);
      formData.append('rol', this.userForm.get('rol')?.value);
      this.userService.postUser(formData).subscribe(
        (data: ResultUserInd) => {
          ToastSuccess('success', 'Usuario creado con exito');
          this.cancelar();
          this.mostrarUsuarios();
        },
        (error) => {
          console.log(error.error.errors[0].msg);
          ToastSuccess('warning', error.error.errors[0].msg);
        }
      );
    }
    if (this.id !== '') {
      const formData = new FormData();
      formData.append('nombre', this.userForm.get('nombre')?.value);
      formData.append('apellido', this.userForm.get('apellido')?.value);
      formData.append('usuario', this.userForm.get('usuario')?.value);
      if (this.userForm.get('password')?.value !== '') {
        formData.append('password', this.userForm.get('password')?.value);
      }
      formData.append('rol', this.userForm.get('rol')?.value);
      this.userService.putUser(formData, this.id).subscribe(
        (data) => {
          ToastSuccess('success', 'Usuario editado con exito');
          this.mostrarUsuarios();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  editarUsuario(id: any) {
    this.userService.getUser(id).subscribe(
      (data: ResultUser) => {
        this.userForm.setValue({
          nombre: data.user[0].name,
          apellido: data.user[0].lastname,
          usuario: data.user[0].alias,
          password: '',
          rol: data.user[0].rol.id,
        });
        this.titulo = 'Editar';
        this.id = String(data.user[0].id);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  borrarUsuario(id: any, active: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        active === 1
          ? 'Este usuario, sera desbloqueado!'
          : 'Este usuario, sera bloqueado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: active === 1 ? 'Si, desbloquear' : 'Si, bloquear',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id, active).subscribe(
          (data) => {
            Swal.fire(
              'Deleted!',
              active === 1
                ? 'Usuario, desbloqueado con exito'
                : 'Usuario, bloqueado con exito',
              'success'
            );
            this.mostrarUsuarios();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  ShowSelected(event: any) {
    if (event.target.value === '1') {
      this.active = '1';
      this.mostrarUsuarios();
    }
    if (event.target.value === '2') {
      this.active = '0';
      this.mostrarUsuarios();
    }
  }
  mostrarRol() {
    this.rolService.getRoles(1).subscribe(
      (data: ResultRol) => {
        console.log(data);
        this.listRol = data.rol;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancelar() {
    this.userForm.setValue({
      nombre: '',
      apellido: '',
      usuario: '',
      password: '',
      rol: '',
    });
    this.id = '';
    this.titulo = 'Crear';
  }
}
