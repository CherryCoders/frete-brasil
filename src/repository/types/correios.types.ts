import {
  BoxType,
  PackingType,
  ServicesType,
} from "../constants/correios.constants";

export namespace CorreiosAPI {
  export type Response = {
    service: {
      code?: number;
      serviceName?: string;
      formatedPrice: string;
      price: number;
    };
    total: {
      formatedPrice: string;
      price: number;
    };
    delivery: {
      postedAt: string;
      days: number;
    };
  };

  export type Configuration = {
    cache: boolean;
  };

  export type Input = {
    currentDate?: Date;
    service: keyof typeof ServicesType;
    cep: {
      from: string;
      to: string;
    };
    box?: {
      height: number;
      width: number;
      greeting: number;
    };
    size?: number;
    selection?: string;
    format: keyof typeof BoxType;
    packing: keyof typeof PackingType;
  };
}
