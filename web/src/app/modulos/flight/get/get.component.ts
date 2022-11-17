import { Component, OnInit } from '@angular/core';
import { flightModel } from 'src/app/modelo/flight.model';
import { FlightService } from 'src/app/servicios/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private flightservice : FlightService) { }
  listado: flightModel[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.flightservice.getAll().subscribe((data: flightModel[]) => {
    this.listado = data
    console.log(data)
    })
    }

    delete(id?: any){
      console.log(id)
      Swal.fire({
        title: '¿Esta seguro de eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.flightservice.delete(id).subscribe((data: any) => {
            Swal.fire('¡Eliminado correctamente!', '', 'success')
            this.getAll();
          })
        }
      })
    }
}
