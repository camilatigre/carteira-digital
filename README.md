# carteira-digital

Este projeto te ajuda com a venda, troca, cotação e extrato de transações entre criptomoedas

## [ TL;DR ]

1. `yarn` || `yarn install`
2. `yarn start`
3. `yarn build`
4. `yarn test`
5. [Demo](https://carteiradigitalstone.herokuapp.com/)

## Rodar projeto localmente

1. Para instalar as depências rode o comando `yarn` ou `yarn install`
2. O segundo passo é rodar `yarn start` no terminal para iniciar o projeto no endereço **http://localhost:3000**
3. Agora é só navegar (:

## Preparando o projeto para produção

1. Para colocar em produção é preciso montar um build com o comando: `yarn build`
2. Por enquanto não serão necessárias configurações de .env
3. O projeto está implantado na ferramenta [Heroku](https://www.heroku.com/) e disponível no endereço [https://carteiradigitalstone.herokuapp.com/](https://carteiradigitalstone.herokuapp.com/)
4. Merges para a branch **master** serão automaticamente disponibilzados em produção

## Testes

1. Para rodar a suite de testes automatizados utilize: `yarn test`
2. Para ver cobertura de testes use: `yarn test --coverage`

#### Pre-commits

- Este projeto possui configuração de pre-commits, antes de conectar com o git o projeto confere se as regras de eslint estão corretas. As regras desse script podem ser encontradas no package.json

#### Prettier

- O prettier é uma ferramenta que nos ajuda a manter a identação, é preciso configurar no seu editor para ao salvar formatar usando a ferramenta ou rodar o comando `npx prettier --write .`
- [Documentação do prettier](https://prettier.io/docs/en/editors.html)
