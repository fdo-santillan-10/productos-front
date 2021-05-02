import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
