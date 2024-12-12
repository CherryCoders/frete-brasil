import { AxiosInstance } from "axios";
import { AxiosGatewayUtil } from "../utils/axios-gateway.util";
import { CorreiosAPI } from "../repository/types/correios.types";

export class CorreiosGateway {
  private readonly request: AxiosInstance = AxiosGatewayUtil.request();
  constructor() {}

  async call(input: CorreiosAPI.Input) {
    const response = await this.request.post("prazos.cfm");
  }
}
