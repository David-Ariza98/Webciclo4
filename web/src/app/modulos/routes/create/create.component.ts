import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteModel } from 'src/app/modelo/route.model';
import { RouteService } from 'src/app/servicios/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private routesservice : RouteService,
    private router : Router) { }

  fgValidacion = this.fb.group({
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    TiempoEstimado:['', [Validators.required]],
  });

ngOnInit(): void {
}

store(){
  let rutas = new RouteModel();
  rutas.origen = this.fgValidacion.controls["origen"].value as string;
  rutas.destino = this.fgValidacion.controls["destino"].value as string;
  rutas.TiempoEstimado = this.fgValidacion.controls["TiempoEstimado"].value as string;

  this.routesservice.store(rutas).subscribe((data: RouteModel)=> {
    Swal.fire('Creado correctamente!', '', 'success')
    this.router.navigate(['/routes/get']);
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
