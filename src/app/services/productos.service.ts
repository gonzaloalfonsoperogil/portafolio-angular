import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( public http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {
    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-html-1c563.firebaseio.com/productos_idx.json').subscribe( (resp: ProductoInterface[]) => {
      console.log(resp);
      this.productos = resp;

      setTimeout(() => {
        this.cargando = false;
      }, 2000);
      resolve();
    });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-1c563.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then( () => {
        this.filtrarProducto(termino);
      });
    } else {
      this.filtrarProducto(termino);
    }
    console.log(this.productosFiltrado);
  }

  filtrarProducto(termino: string) {
    this.productosFiltrado = [];
    this.productos.forEach( prod => {

      const titulo: string = prod.titulo.toLowerCase();
      const categoria: string = prod.categoria.toLowerCase();

      if (categoria.indexOf(termino) >= 0 || titulo.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
