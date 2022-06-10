import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interface/alertas';
import { AlertaService } from 'src/app/servicios/alerta.service';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {
  listAlerta:Alerta[]=[];
  pageActual: number = 1;
  constructor(private alertaService:AlertaService) { }
  
  ngOnInit(): void {
    this.mostrarAlerta();
  }
  mostrarAlerta(){
    this.alertaService.getAtencion().subscribe(
      (data)=>{
        this.listAlerta = data.alerta;
        console.log(this.listAlerta);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
