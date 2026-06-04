export interface Divida {
  id: number;
  valor: number;
  tipo: "RECEBER" | "PAGAR";
  descricao: string;
  data: string;
  observacao: string;
  pessoaId: number;
}
