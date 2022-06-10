import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alerta } from 'src/app/interface/alerta';
import { WebsocketService } from 'src/app/socket/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  alertaForm: FormGroup;
  alertaEnvio:Alerta = {
    area:'',
    descripcion:''
  }
  constructor(private fb: FormBuilder, private wsService:WebsocketService) { 
    this.alertaForm = this.fb.group({
      descripcion:[''],
      area:['']
    })
  }

  ngOnInit(): void {
  }
  registrarAlerta(){
  }
}
