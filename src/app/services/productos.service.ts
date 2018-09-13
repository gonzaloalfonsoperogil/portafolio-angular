import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];

  constructor( public http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {
    this.http.get('https://angular-html-1c563.firebaseio.com/productos_idx.json').subscribe( (resp: ProductoInterface[]) => {
      console.log(resp);
      this.productos = resp;

      setTimeout(() => {
        this.cargando = false;
      }, 2000);
    });
  }
}
