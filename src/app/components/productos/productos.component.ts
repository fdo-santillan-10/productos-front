import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../../services/busqueda.service';
import { ProductoModel } from '../../models/productos.models';
import { FavoritoModel } from '../../models/favorito.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto!: string;
  productos: ProductoModel[] = [];

  page: number;
  total: number;
  paginas: number[];
  elementos: ProductoModel[];

  constructor(private busqueda: BusquedaService) { }

  ngOnInit(): void {

  }

  paginar(pag: number): void {

    const size = 10;
    const inicio = pag * size;
    const fin = ((1 + pag) * size) - 1;

    this.page = pag;
    this.elementos = this.productos.slice(inicio, fin);
  }

  counter(i: number) {
    return new Array(i);
  }

  buscarProducto(): void {

    this.busqueda.buscarProductos(this.producto).subscribe( list => {

      this.productos = list.results;
      this.total = this.productos.length;

      this.paginar(0);

      this.productos = list.results.map( obj => {
        return {
          id: obj.id,
          title: obj.title,
          price: obj.price,
          thumbnail: obj.thumbnail
        };
      });

    });
  }

  agregarProducto(prod: ProductoModel): void {

    const favorito: FavoritoModel = {
      id: undefined,
      imagen: prod.thumbnail,
      producto: prod.title,
      precio: prod.price
    };

    this.busqueda.guardarFavorito(favorito).subscribe( r => {
      Swal.fire({
        icon: 'success',
        text: 'Producto agregado a favorito',
        timer: 1500
      });
    }, () => {
      Swal.fire({
        icon: 'error',
        text: 'Error al agregar a favorito',
        timer: 1500
      });
    });
  }

}
