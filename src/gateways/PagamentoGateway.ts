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

  static async listarPorDividaId(dividaId: number): Promise<Pagamento[]> {
    const { data } = await this.client.get<Pagamento[]>(`/divida/${dividaId}`);
    return data;
  }

  static async listarPorDividaIds(dividaIds: number[]): Promise<Pagamento[]> {
    if (!dividaIds || dividaIds.length === 0) return [];
    const idsParam = dividaIds.join(",");
    const { data } = await this.client.get<Pagamento[]>("", {
      params: { dividaIds: idsParam },
    });

    return data;
  }

  static async criar(pagamento: Pagamento): Promise<Pagamento> {
    const { data } = await this.client.post<Pagamento>("", pagamento);
    return data;
  }

  static async atualizar(id: number, pagamento: Pagamento): Promise<Pagamento> {
    const { data } = await this.client.put<Pagamento>(`/${id}`, pagamento);
    return data;
  }
}
