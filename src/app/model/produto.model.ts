import { Categoria, Unidade } from "./enums";

export interface Produto {
    id: number;
    descricao: string;
    categoria : Categoria;
    unidade: Unidade;
    preco: number;
    urlFoto: string;
    ativo: string;
  }