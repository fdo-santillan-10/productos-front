import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../../services/busqueda.service';
import { FavoritoModel } from '../../models/favorito.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {


  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  favoritos: FavoritoModel[];

  constructor(private busqueda: BusquedaService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.buscar();
  }

  buscar(): void {
    this.busqueda.consultarFavoritos().subscribe( list => {
      this.favoritos = list;
    });
  }

  eliminar(prod: FavoritoModel): void {
    this.busqueda.eliminarFavorito(prod.id).subscribe( r => {
      this.buscar();
      Swal.fire({
        icon: 'success',
        text: 'Producto eliminado de favorito',
        timer: 1500
      });
    }, () => {
      Swal.fire({
        icon: 'error',
        text: 'Error al eliminar favorito',
        timer: 1500
      });
    });
  }
}
