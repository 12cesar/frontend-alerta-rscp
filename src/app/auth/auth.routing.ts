import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AtencionComponent } from './atencion/atencion.component';


const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'alerta', component: LoginComponent },
            { path: 'login', component: RegisterComponent },
            { path: 'atencion', component: AtencionComponent },
            { path: '', redirectTo: '/alerta', pathMatch: 'full' }
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
export class AuthRoutingModule { }
