import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultLogin } from 'src/app/interface/login';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private fb: FormBuilder, private loginService:LoginService, private router: Router) { 
    this.loginForm = this.fb.group({
      usuario:['', Validators.required],
      password:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    const formData = new FormData();
    formData.append('usuario',this.loginForm.get('usuario')?.value);
    formData.append('password',this.loginForm.get('password')?.value);
    this.loginService.postLogin(formData).subscribe(
      (data:ResultLogin)=>{
        console.log(data);
        localStorage.setItem('x-token', data.token);  
        localStorage.setItem('usuario', data.user.name);
        localStorage.setItem('rol', String(data.user.rolId));
        this.router.navigate(['/admin/usuario'])
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
