import { Component, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/modelo/route.model';
import { RouteService } from 'src/app/servicios/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private routesservice : RouteService) { }
  listado: RouteModel[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.routesservice.getAll().subscribe((data: RouteModel[]) => {
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
          this.routesservice.delete(id).subscribe((data: any) => {
            Swal.fire('¡Eliminado correctamente!', '', 'success')
            this.getAll();
          })
        }
      })
    }
}
