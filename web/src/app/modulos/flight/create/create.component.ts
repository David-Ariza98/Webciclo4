import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { flightModel } from 'src/app/modelo/flight.model';
import { FlightService } from 'src/app/servicios/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private flightservice : FlightService,
    private router : Router) { }

  fgValidacion = this.fb.group({
    FechaInicio: ['', [Validators.required]],
    HoraInicio: ['', [Validators.required]],
    FechaFin: ['', [Validators.required]],
    HoraFin: ['', [Validators.required]],
    Asientos: ['', [Validators.required]],
    NombrePiloto: ['', [Validators.required]],
    Ruta: ['', [Validators.required]],
  });

ngOnInit(): void {
}

store(){
  let vuelos = new flightModel();
  vuelos.FechaInicio = this.fgValidacion.controls["FechaInicio"].value as string;
  vuelos.HoraInicio = this.fgValidacion.controls["HoraInicio"].value as string;
  vuelos.FechaFin = this.fgValidacion.controls["FechaFin"].value as string;
  vuelos.HoraFin = this.fgValidacion.controls["HoraFin"].value as string;
  vuelos.Asientos = this.fgValidacion.controls["Asientos"].value as string;
  vuelos.NombrePiloto = this.fgValidacion.controls["NombrePiloto"].value as string;
  vuelos.Ruta = this.fgValidacion.controls["Ruta"].value as string;

  this.flightservice.store(vuelos).subscribe((data: flightModel)=> {
    Swal.fire('Creado correctamente!', '', 'success')
    this.router.navigate(['/flights/get']);
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
