<img
  src="../.github/findonation-with-label.png"
  height="80"
/>

**Encontre, comunique, doe.**

[![Mockup][mockup-shield]][mockup-url]
[![Prototype][prototype-shield]][prototype-url]

# Table of Contents
* [Sobre](#sobre)
  * [Por quê?](#por-quê?)
* [Requisitos funcionais](#requisitos-funcionais)
* [Requisitos não-funcionais](#requisitos-não-funcionais)
* [Regras de negócio](#regras-de-negócio)

# Sobre

Muitas vezes nos vemos em meio a situações que desejamos fazer o bem, porém não sabemos como. **Estes atos podem ser como o de doar algum objeto, roupa, ou qualquer outra coisa que não precise mais**. E é por isso que este sistema foi criado.

Baseando-se em GPS, ache ONGs e pessoas ao seu redor, tornando assim o contato muito mais rápido e efetivo. **Simplesmente separe o que deseja doar - ou tenha em mente o que deseja adquirir -, encontre no mapa, entre em contato e faça uma boa ação**.

## Por quê?

Facilitar a comunicação entre pessoas que querem doar, e quem necessita de ajuda. Por meio desta interface, ONGs que estejam buscando auxílio, ou também fazendo grandes campanhas para o bem, poderão se conectar e assim ficarem visíveis no mapa para todo mundo que queira apoiar tal causa. E além disso, qualquer um que esteja em busca de desapegar de algo pode fazer o cadastro do item, e assim, outrem achar e adquirir o que esteja precisando.

# Banco de dados

## Diagrama ilustrativo

[![Database diagram][database-diagram]][database-url]

## Diagrama lógico

[![Database diagram][database-logic-diagram]][database-url]

# Requisitos funcionais

1. O sistema deve **permitir o cadastro de usuários**.
```sql
INSERT INTO `users` (
  name,
  password,
  email,
  whatsapp,
  avatar,
  type_user_id
) VALUES (
  'Affonso Difakha',
  '$2b$12$BNRCXsXWYUaVOCTmdMs5YeeGnEyA87bnChiyQWaWKEkm7HRINIxc6',
  'contato@affonso.difakha.com',
  '47999999999',
  'affonso.png',
  1
);
```
2. O sistema deve **exibir os detalhes de cada usuário**.
```sql
SELECT * FROM `users`;
```
3. O sistema deve **permitir o cadastro de ONGs**.
```sql
INSERT INTO `users` (
  name,
  password,
  email,
  whatsapp,
  avatar,
  type_user_id
) VALUES (
  'Exército da Salvação',
  '$2b$12$BNRCXsXWYUaVOCTmdMs5YsdGnEyA87bnXhgyQsdfSasd7HRINIxc6',
  'contato@exercitodasalvacao.com',
  '47912345678',
  'exercito-da-salvacao.png',
  2
);

INSERT INTO `ongs_location` (
  uf,
  city,
  neighbourhood,
  street,
  number,
  latitude,
  longitude,
  user_id
) VALUES (
  'SC',
  'Camboriú',
  'Centro',
  'Ernesto Pereira',
  1963,
  -26.4686229,
  -48.6179328,
  2
);
```
4. O sistema deve **exibir os detalhes de cada ONG**.
```sql
SELECT *
FROM `users`
FULL OUTER JOIN `ongs_location`
ON `users.ID` = `ongs_location.user_id`;
```
5. O sistema deve **permitir o cadastro de doações**.
```sql
INSERT INTO `donations` (
  title,
  description,
  image,
  uf,
  city,
  neighbourhood,
  street,
  number,
  latitude,
  longitude,
  user_id
) VALUES (
  'Sofá de camurça',
  'Um simples sofá. Bonito, charmoso e gostoso. Tudo de melhor para o seu conforto e o de sua família.',
  'sofa-de-camurca.png',
  'SC',
  'Camboriú',
  'Centro',
  'Ernesto Pereira',
  1963,
  -26.4686229,
  -48.6179328,
  1
);
```
6. O sistema deve **exibir os detalhes de cada doação**.
```sql
SELECT * FROM `donations`;
```

# Requisitos não-funcionais

1. Todo o front-end será baseado em HTML, CSS e JS.
2. O sistema deverá capturar a coordenada de cada usuário.
3. O sistema permitirá a comunicação direta com o contato usando o Whatsapp ou o aplicativo padrão de e-mail.

# Regras de negócio

1. Apenas ONGs que realizaram Log In poderão fazer cadastro de doações/pontos de coleta.
2. A busca será realizada a partir do estado e cidade de cada usuário.
3. A exibição de cada item será realizada a partir de categorias.
4. Cada usuário pode ser dividido em duas categorias. Um novo usuário pode se cadastrar como ONG, ou como usuário padrão.

[mockup-shield]: https://img.shields.io/static/v1?label=mockup&message=WHIMSICAL&color=7211c2&style=flat
[mockup-url]: https://whimsical.com/YYMxJmtCh9n9mS9iSUi3Fj
[prototype-shield]: https://img.shields.io/static/v1?label=prototype&message=FIGMA&color=1994fb&style=flat
[prototype-url]: https://www.figma.com/file/OxPXQzuV7QjLT2mysPUFxX/FinDonation?node-id=1%3A38
[database-diagram]: ./database/.github/findonation.png
[database-logic-diagram]: ./database/.github/findonation-logic.png
[database-url]: https://github.com/cristianprochnow/FinDonation/tree/master/docs/database
