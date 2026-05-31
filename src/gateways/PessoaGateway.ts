import type { AxiosInstance } from "axios";
import axios from "axios";
import type { Pessoa } from "../models/Pessoa.js";

export class PessoaGateway {
  private static client: AxiosInstance = axios.create({
    baseURL: process.env.JAVA_SERVICE_URL + "/pessoas",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async listarTodas(): Promise<Pessoa[]> {
    const { data } = await this.client.get<Pessoa[]>("");
    return data;
  }
}
