import { Atendimento } from "./enums";

export interface Mercado {
    id: number;
    nome: string;
    endereco : string;
    contato: string;
    foto: string;
    atendimento : Atendimento;
  }