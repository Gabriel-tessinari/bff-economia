import type { AxiosInstance } from "axios";
import axios from "axios";
import type { Pagamento } from "../models/Pagamento.js";

export class PagamentoGateway {
  private static client: AxiosInstance = axios.create({
    baseURL: process.env.JAVA_SERVICE_URL + "/pagamentos",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async listarTodos(): Promise<Pagamento[]> {
    const { data } = await this.client.get<Pagamento[]>("");
    return data;
  }
}
