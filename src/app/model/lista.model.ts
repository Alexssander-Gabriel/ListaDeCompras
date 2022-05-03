import { Produto } from "./produto.model";
import { Mercado } from "./mercado.model";
import { Tipo } from "./enums";

export interface Lista {
    id: number;
    descricao: string;
    produtos: Produto[];
    mercado: Mercado[];
    categoria: Tipo; 
  }