import axios from "axios";
import {
  CORREIOS_URI,
  USER_AGENT,
} from "../repository/constants/correios.constants";

export class AxiosGatewayUtil {
  public static request() {
    return axios.create({
      url: CORREIOS_URI,
      headers: {
        "User-Agent": USER_AGENT,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}
