import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import { UserModel } from 'src/app/modelo/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private userservice : UserService,
              private router : Router) { }
              
  fgValidacion = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(6)]],
    correo: ['', [Validators.required, Validators.email]],
  });
            
  ngOnInit(): void {
  }

  store(){
    let usuario = new UserModel();
    usuario.Nombre = this.fgValidacion.controls["nombre"].value as string;
    usuario.Apellido = this.fgValidacion.controls["apellidos"].value as string;
    usuario.Correo = this.fgValidacion.controls["correo"].value as string;
    usuario.Numero = this.fgValidacion.controls["telefono"].value as string;
 
    this.userservice.store(usuario).subscribe((data: UserModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      
      this.router.navigate(['/admin/get']);
      //this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Datos invalidos',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }

}
