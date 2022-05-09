import { Mercado } from "./mercado.model";
import { Tipo } from "./enums";
import { Produto } from "./produto.model";

export interface Lista {
    id: number;
    descricao: string;
    produtos: Produto[];
    mercado: Mercado[];
    categoria: Tipo; 
  }