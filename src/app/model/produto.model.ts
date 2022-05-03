import { Categoria, Unidade } from "./enums";

export interface Produto {
    id: number;
    descricao: string;
    categoria : Categoria;
    preco: number;
    foto: string;
    unidade : Unidade;
  }