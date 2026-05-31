export interface Divida {
  id: number;
  valor: number;
  tipo: "RECEBER" | "PAGAR";
  pessoaId: number;
}
