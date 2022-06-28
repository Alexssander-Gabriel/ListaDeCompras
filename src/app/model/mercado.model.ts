import { Atendimento } from "./enums";

export interface Mercado {
    id: number;
    nome: string;
    endereco : string;
    contato: string;
    urlFoto: string;
    atendimento : Atendimento;
    ativo: string;
  }