import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { closeAlert, loadData } from 'src/app/function/cargando';
import { ToastSuccess } from 'src/app/function/validar';
import { AreaService } from 'src/app/servicios/area.service';
import { WebsocketService } from 'src/app/socket/websocket.service';
import Swal from 'sweetalert2';
import { Area, ResultAreas, ResultAreasInd } from '../../interface/areas';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  listArea:Area[]=[];
  active: string="1";
  titulo:string="Crear";
  id:string="";
  cargar:boolean=true;
  areaForm:FormGroup;
  pageActual: number = 1;
  constructor(private fb:FormBuilder, private areaService:AreaService, private wsService: WebsocketService) { 
    this.areaForm = this.fb.group({
      titulo:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarAreas();
  }
  mostrarAreas(){
    if (this.cargar) {
      loadData('Cargando datos!!!','Porfavor espere')
    }
    this.areaService.getAreas(this.active).subscribe(
      (data:ResultAreas)=>{
        this.listArea=data.area;
        if (this.cargar) {
          closeAlert()
        }
        this.cargar=false;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  areaAddPut() {
    if (this.id === "") {
      const formData = new FormData();
      formData.append('titulo', this.areaForm.get('titulo')?.value);
      this.areaService.postArea(formData).subscribe(
        (data:ResultAreasInd) => {
          console.log(data);
          ToastSuccess('success', 'Area creado con exito');
          this.mostrarAreas();
          this.cancelar();
          this.wsService.emit('actualizar-area');
        },
        (error) => {
          ToastSuccess('warning',error.error.errors[0].msg);
        }
      )
    }
    if (this.id !== "") {
      const formData = new FormData();
      formData.append('titulo', this.areaForm.get('titulo')?.value);
      this.areaService.putArea(formData, this.id).subscribe(
        (data)=>{
          ToastSuccess('success','Area editado con exito');
          this.mostrarAreas();
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }
  }
  editarArea(id: any) {
    this.areaService.getArea(id).subscribe(
      (data: ResultAreasInd) => {
        this.areaForm.setValue({
          titulo: data.area.title,
        });
        this.titulo = "Editar";
        this.id = String(data.area.id);
      },
      (error) => {
        console.log(error);

      }
    )
  }
  borrarArea(id: any, active: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: active === 1 ? "Este area, sera desbloqueado!": "Este area, sera bloqueado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: active === 1 ? "Si, desbloquear": "Si, bloquear"
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaService.deleteArea(id, active).subscribe(
          (data)=>{
            Swal.fire(
              'Deleted!',
              active === 1 ? "area, desbloqueado con exito": "area, bloqueado con exito",
              'success'
            );
            this.mostrarAreas();
          },
          (error)=>{
            console.log(error);
            
          }
        )
        
      }
    })
  }
  ShowSelected(event: any) {
    if (event.target.value === '1') {
      this.active = "1";
      this.mostrarAreas();
    }
    if (event.target.value === '2') {
      this.active = "0";
      this.mostrarAreas();
    }
  }
  cancelar() {
    this.areaForm.setValue({
      titulo: '',
    });
    this.id = "";
    this.titulo = "Crear";
  }
}
