import { Component, OnInit } from '@angular/core';
import { AirportModel } from 'src/app/modelo/airport.model';
import { AirportService } from 'src/app/servicios/airport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private airportservice : AirportService) {}
  listado: AirportModel[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.airportservice.getAll().subscribe((data: AirportModel[]) => {
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
          this.airportservice.delete(id).subscribe((data: any) => {
            Swal.fire('¡Eliminado correctamente!', '', 'success')
            this.getAll();
          })
        }
      })
    }
}

