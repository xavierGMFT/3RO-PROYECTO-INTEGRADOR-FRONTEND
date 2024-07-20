export interface Product {
  id: number;
  imagen: string;
  titulo: string;
  precio: number;
  descripcion: string;
  enOferta?: boolean
}
