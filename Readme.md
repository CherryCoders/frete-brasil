Uma biblioteca que realiza scraping dos Correios para calcular o preço de entrega. Foi desenvolvida com o intuito de eliminar a necessidade de criar uma conta para utilizar funções simples da plataforma, além de contornar a instabilidade do endpoint aberto dos Correios.

```
⚠ No momento, o cálculo do frete funciona apenas para encomendas do tipo caixa. Vale destacar que esta biblioteca está em versão alpha.
```

```
npm install @cherry-code/frete-brasil
pnpm install @cherry-code/frete-brasil
yarn add @cherry-code/frete-brasil
```

## Como utilizar

Existem apenas duas formas de utilizar a biblioteca. Uma delas é utilizando o sistema de cache para evitar várias requisições desnecessárias. Abaixo está um exemplo utilizando o sistema de cache:

```ts
import { ClientCorreios, CorreiosAPI } from "@cherry-code/frete-brasil";

const client = new ClientCorreios({
  cache: true,
});

// Input com apenas as informações obrigatórias a serem enviadas
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
 * Você também pode instanciar diretamente e configurar o cache com `true` ou `false`:
 *
 * const gateway = new CorreiosGateway(true)
 * await gateway.getCalcterm(input)
 */

const response = await client.gateway.getCalcTerm(input);

// Retorno esperado do response:
//  {
//     service: {
//       code?: number;
//       serviceName?: string;
//       formatedPrice: string;
//       price: number;
//     },
//     total: {
//       formatedPrice: string;
//       price: number;
//     },
//  };
```

## Todas as opções de input para getCalcTerm

| Atributo | Tipo de valor                                                                                |
| -------- | -------------------------------------------------------------------------------------------- |
| service  | Informações sobre o serviço e seu preço.                                                     |
| total    | Informações sobre o valor total do frete com o serviço.                                      |
| cep      | CEP de origem e destino. Informe no objeto `cep` os campos `from` (origem) e `to` (destino). |
| box      | Dimensões da caixa: `height`, `width`, `length`.                                             |
| size     | Peso da encomenda.                                                                           |

### ⚠ As informações da tabela abaixo podem estar tanto no `service` quanto no `total`

| Atributo      | Tipo de valor                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| code          | Código do serviço da encomenda (presente no atributo `service`).                                     |
| serviceName   | Nome do serviço associado ao valor total do frete.                                                   |
| formatedPrice | Valor do frete como `string`, formatado com `currency`. Presente nos atributos `service` ou `total`. |
| price         | Valor do frete como `number`. Presente nos atributos `service` ou `total`.                           |

Caso enfrente algum problema ao utilizar esta biblioteca, entre em contato com o desenvolvedor da `CherryCode`.
