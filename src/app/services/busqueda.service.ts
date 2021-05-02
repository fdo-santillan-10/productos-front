import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url, favoritos } from '../../environments/environment';
import { ResultModel, ProductoModel } from '../models/productos.models';
import { FavoritoModel } from '../models/favorito.models';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }

  buscarProductos(prod: string) {
    return this.http.get<ResultModel>(url + prod);
  }

  guardarFavorito(favorito: FavoritoModel) {
    return this.http.post(favoritos.url + 'guardar', favorito);
  }

  consultarFavoritos() {
    return this.http.get<FavoritoModel[]>(favoritos.url + 'consultar');
  }

  eliminarFavorito(id: string) {
    return this.http.delete(favoritos.url + 'eliminar?id=' + id);
  }
}
