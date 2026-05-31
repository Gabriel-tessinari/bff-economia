import type { AxiosInstance } from "axios";
import axios from "axios";
import type { Divida } from "../models/Divida.js";

export class DividaGateway {
  private static client: AxiosInstance = axios.create({
    baseURL: process.env.JAVA_SERVICE_URL + "/dividas",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async listarTodas(): Promise<Divida[]> {
    const { data } = await this.client.get<Divida[]>("");
    return data;
  }
}
