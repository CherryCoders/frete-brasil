Uma biblioteca que faz scrapping de correios para calcular o preço de entrega. Foi desenvolvido com intuito de não haver necessidade de criar uma conta para utilizar funções simples da plataforma, além que o endpoint aberto de correios anda instável.

```
⚠ No momento o calculo do frete funciona apenas para encomenda do tipo caixa selected esta biblioteca esta em versão alpha.
```

```
npm install @cherry-code/correios
pnpm install @cherry-code/correios
yarn add @cherry-code/correios
```

## Como utilizar

Existe apenas duas formas de você utilizar, uma delas utilizando o sistema de cache para evitar várias requisições desnecessárias, aqui esta um exemplo abaixo utilizando sistema de cache.

```ts
import { ClientCorreios, CorreiosAPI } from "@cherry-code/correios";

const client = new ClientCorreios({
  cache: true,
});

// input com apenas informações obrigatórias para serem enviadas
const input: CorreiosAPI.Input = {
  service: "PAC",
  cep: {
    from: "00000-000",
    to: "00000-000",
  },
  format: "BOX",
  packing: "OTHER_PACK",
};

/**
 * Você também pode instanciar direto e informar para true caso seja com cache ou false
 *
 * const gateway = new CorreiosGateway(true)
 * await gateway.getCalcterm(inpit)
 */

const response = await client.gateway.getCalcTerm(input);

// o retorno do response abaixo.
//  {
//     service: {
//       code?: number;
//       serviceName?: string;
//       formatedPrice: string;
//       price: number;
//     };
//     total: {
//       formatedPrice: string;
//       price: number;
//     };
//   };
```

## Todas as opções de input de getCalcTerm

| Atributo | Tipo de valor                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| service  | Informações do serviço e seu preço.                                                                                 |
| total    | Informações do valor total do frete con serviço.                                                                    |
| cep      | Informar o cep de `origem` e `destino` para informar dentro do objeto cep, informe `from` (origem) e `to` (destino) |
| box      | Informar as medidas da caixa, `height`, `width`, `greeting`                                                         |
| size     | informar quanto pesa a encomenda.                                                                                   |

### ⚠ As informações da tabela logo abaixo pode vim tanto no `service` quanto no `total`

| Atributo      | Tipo de valor                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------- |
| code          | Código de serviço da encomenda que vem dentro do atributo `service`.                           |
| serviceName   | Informações do valor total do frete con serviço.                                               |
| formatedPrice | valor do frete em `string` formatado com `currency`, vem dentro do atributo `service` ou total |
| price         | Valor do frete em `number` vem dentro do atributo `service` ou `total`.                        |

Caso esteja dificultando algum problema de utilizar esta biblioteca, entre em contato com o desenvolvedor na `CherryCode`.
