import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { WebsocketService } from './socket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';
  respuesta:any;
  readonly VAPID_PUBLIC_KEY = "BCtSWj1bktdbd3E6fHGecSnIy9NHt-4cjm-ZKPIrNttXC4jRszxnlLQB9sGc-9RA4EMKSbd43NG9br3p_5Ukzlk"

  constructor(private wsService: WebsocketService, private swPush:SwPush){
    wsService.checkStatus();
  }
  subcribeToNotification(){
    this.swPush.requestSubscription(
      {
        serverPublicKey:this.VAPID_PUBLIC_KEY
      }
    ).then(respuest=>{
      this.respuesta =respuest
    })
    .catch(err=>{
      this.respuesta = err
    })
  }
}
