import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirportService } from 'src/app/servicios/airport.service';
import { AirportModel } from 'src/app/modelo/airport.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private airpotservice : AirportService,
    private router : Router) { }
  
    fgValidacion = this.fb.group({
      Nombre: ['', [Validators.required]],
      Ciudad: ['', [Validators.required]],
      Pais: ['', [Validators.required]],
      CoorX: ['', [Validators.required]],
      CoorY: ['', [Validators.required]],
      Siglas: ['', [Validators.required, Validators.maxLength(3)]],
      Tipo: ['', [Validators.required]],
    });

  ngOnInit(): void {
  }

  store(){
    let aeropuerto = new AirportModel();
    aeropuerto.Nombre = this.fgValidacion.controls["Nombre"].value as string;
    aeropuerto.Ciudad = this.fgValidacion.controls["Ciudad"].value as string;
    aeropuerto.Pais = this.fgValidacion.controls["Pais"].value as string;
    aeropuerto.CoorX = this.fgValidacion.controls["CoorX"].value as string;
    aeropuerto.CoorY = this.fgValidacion.controls["CoorY"].value as string;
    aeropuerto.Siglas = this.fgValidacion.controls["Siglas"].value as string;
    aeropuerto.Tipo = this.fgValidacion.controls["Tipo"].value as string;
 
    this.airpotservice.store(aeropuerto).subscribe((data: AirportModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/airports/get']);
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
