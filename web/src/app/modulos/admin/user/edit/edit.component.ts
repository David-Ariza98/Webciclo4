import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/modelo/user.model';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Numero: ['', [Validators.required, Validators.minLength(6)]],
      Correo: ['', [Validators.required, Validators.email]],
    });  

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id)
  }

  getWithId(id: string){
    this.usuarioService.getWithId(id).subscribe((data: UserModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["Nombre"].setValue(data.Nombre as string)
      this.fgValidacion.controls["Apellido"].setValue(data.Apellido as string)
      this.fgValidacion.controls["Correo"].setValue(data.Correo as string)
      this.fgValidacion.controls["Numero"].setValue(data.Numero as string)
    })
  }

  edit(){
    let usuario = new UserModel();
    usuario.id = this.fgValidacion.controls["id"].value as string;
    usuario.Nombre = this.fgValidacion.controls["Nombre"].value as string;
    usuario.Apellido = this.fgValidacion.controls["Apellido"].value as string;
    usuario.Correo = this.fgValidacion.controls["Correo"].value as string;
    usuario.Numero = this.fgValidacion.controls["Numero"].value as string;
 
    this.usuarioService.update(usuario).subscribe((data: UserModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
