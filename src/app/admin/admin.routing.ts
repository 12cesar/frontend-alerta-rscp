import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AuthGuard } from '../guard/auth.guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { AreaComponent } from './area/area.component';
import { AlertaComponent } from './alerta/alerta.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';


const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'usuario', component: UsuarioComponent },
            { path: 'area', component: AreaComponent },
            { path: 'alerta', component: AlertaComponent },
            { path: 'agregar-usuario', component: AgregarUsuarioComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
        ],
        canActivateChild: [
            AuthGuard
        ]
    },
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
