import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interface/alertas';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { WebsocketService } from 'src/app/socket/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {
  listAlerta:Alerta[]=[];
  pageActual: number = 1;
  constructor(private alertaService:AlertaService, private wsService:WebsocketService) { }
  
  ngOnInit(): void {
    this.mostrarAlerta();
    this.alertaSocket();
  }
  mostrarAlerta(){
    this.alertaService.getAtencion().subscribe(
      (data)=>{
        this.listAlerta = data.alerta;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  alertaSocket(){
    this.wsService.listen('agregar-alerta').subscribe(
      (data)=>{
        this.mostrarAlerta();
      }
    )
  }
}
