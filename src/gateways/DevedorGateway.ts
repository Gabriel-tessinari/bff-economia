import type { AxiosInstance } from "axios";
import axios from "axios";
import type { Devedor } from "../models/Devedor.js";

export class DevedorGateway {
  private static client: AxiosInstance = axios.create({
    baseURL: process.env.JAVA_SERVICE_URL + "/devedores",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async listarTodos(): Promise<Devedor[]> {
    const { data } = await this.client.get<Devedor[]>("");
    return data;
  }
}
