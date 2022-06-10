import { Component, OnInit } from '@angular/core';
import { closeAlert, loadData } from 'src/app/function/cargando';
import { Alerta, AlertaNew } from 'src/app/interface/alertas';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { SoporteService } from 'src/app/servicios/soporte.service';
import { WebsocketService } from 'src/app/socket/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  listAlerta: Alerta[] = [];
  estado: string = "0";
  cargar: boolean = true;
  pageActual: number = 1;
  soporteForm = {
    evaluacion: '',
    accion: '',
    alerta: 0
  }
  constructor(private alertaService: AlertaService, private wsService: WebsocketService, private soporteService: SoporteService) { }

  ngOnInit(): void {
    this.mostrarAlertas();
  }
  mostrarAlertas() {
    if (this.cargar) {
      loadData('Cargando datos!!', 'Porfavor espere')
    }
    this.alertaService.getAlertas(this.estado).subscribe(
      (data: AlertaNew) => {
        this.listAlerta = data.alerta;
        if (this.cargar) {
          closeAlert();
        }
        this.cargar = false
      },
      (error) => {
        console.log(error);

      }
    )
  }
  ShowSelected(event: any) {
    if (event.target.value === '1') {
      this.estado = "1";
      this.cargar = true;
      this.mostrarAlertas();

    }
    if (event.target.value === '2') {
      this.estado = "0";
      this.cargar = true;
      this.mostrarAlertas();
    }
  }
  generarId(ids: number) {
    console.log(ids);
    this.soporteForm.alerta = ids;

  }
  crearSoporte() {
    if (this.soporteForm.alerta !== 0) {
      console.log(this.soporteForm);
      const data = new FormData();
      data.append('alerta', `${this.soporteForm.alerta}`);
      data.append('evaluacion', this.soporteForm.evaluacion);
      data.append('accion', this.soporteForm.accion);
      this.soporteService.postSoporte(data).subscribe(
        (data)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se genero el soporte',
            showConfirmButton: false,
            timer: 1500
          });
          this.cancelar();
          this.mostrarAlertas();
        },
        (error)=>{
          console.log(error);
        }
      )
    } else if (this.soporteForm.alerta === 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione una alerta',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  cancelar() {
    this.soporteForm = {
      accion: '',
      alerta: 0,
      evaluacion: ''
    }
  }
}
