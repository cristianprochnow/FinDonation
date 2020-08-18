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

[![Database schema diagram][database-image]][database-url]

## Por quê?

Facilitar a comunicação entre pessoas que querem doar, e quem necessita de ajuda. Por meio desta interface, ONGs que estejam buscando auxílio, ou também fazendo grandes campanhas para o bem, poderão se conectar e assim ficarem visíveis no mapa para todo mundo que queira apoiar tal causa. E além disso, qualquer um que esteja em busca de desapegar de algo pode fazer o cadastro do item, e assim, outrem achar e adquirir o que esteja precisando.

# Requisitos funcionais

1. O sistema deve **permitir o cadastro de ONGs**.
```sql
INSERT INTO `ongs` (
  name,
  email,
  whatsapp,
  password,
  description,
  image,
  uf,
  city,
  neighbourhood,
  street,
  number,
  latitude,
  longitude
) VALUES (
  'Exército da Salvação',
  'contato@exercitodasalvacao.com',
  '47999999999',
  '$2b$12$BNRCXsXWYUaVOCTmdMs5YeeGnEyA87bnChiyQWaWKEkm7HRINIxc6',
  'Somos uma ONG que visa ajudar o próximo e dar-lhe, assim, itens para auxiliar em sua vivência.',
  'exercito-da-salvacao-avatar.png',
  'SC',
  'Camboriú',
  'Centro',
  'Ernesto Pereira',
  1963,
  -26.4686229,
  -48.6179328
)
```
2. O sistema deve **permitir o cadastro de doações**.
```sql
INSERT INTO `donations` (
  title,
  email,
  whatsapp,
  description,
  image,
  uf,
  city,
  neighbourhood,
  street,
  number,
  latitude,
  longitude
) VALUES (
  'Sofá de camurça',
  'contato@alguem.com',
  '47912345678',
  'Um simples sofá. Bonito, charmoso e gostoso. Tudo de melhor para o seu conforto e o de sua família.',
  'sofa-de-camurca.png',
  'SC',
  'Camboriú',
  'Centro',
  'Ernesto Pereira',
  1963,
  -26.4686229,
  -48.6179328
)
```
3. O sistema deve **permitir o cadastro de pontos de coleta**.
```sql
INSERT INTO `collect_points` (
  ong_id,
  title,
  description,
  image,
  uf,
  city,
  neighbourhood,
  street,
  number,
  latitude,
  longitude
) VALUES (
  'Objetos e roupas',
  'Estamos coletando comida, sofás e seus sapatos de couro.',
  'couro.png',
  'SC',
  'Camboriú',
  'Centro',
  'Ernesto Pereira',
  1963,
  -26.4686229,
  -48.6179328
);
```
4. O sistema deve **exibir no mapa os pontos de doação cadastrados**.
```sql
SELECT * FROM `collect_points`;
```
5. O sistema deve **exibir os detalhes de cada doação**.
```sql
SELECT * FROM `donations`;
```
6. O sistema deve **exibir o perfil de cada ONG**.
```sql
SELECT * FROM `ongs`;
```

# Requisitos não-funcionais

1. Todo o front-end será baseado em HTML, CSS e JS.
2. O sistema deverá capturar a coordenada de cada usuário.
3. Na versão Mobile, o sistema permitirá a comunicação direta com o contato usando o Whatsapp ou o aplicativo padrão de E-mail.

# Regras de negócio

1. Apenas ONGs que realizaram Log In poderão fazer cadastro de doações/pontos de coleta.
2. A busca será realizada a partir do estado, cidade de cada usuário.
3. A exibição de cada item será realizada a partir de categorias.

[mockup-shield]: https://img.shields.io/static/v1?label=mockup&message=WHIMSICAL&color=7211c2&style=flat
[mockup-url]: https://whimsical.com/YYMxJmtCh9n9mS9iSUi3Fj
[prototype-shield]: https://img.shields.io/static/v1?label=prototype&message=FIGMA&color=1994fb&style=flat
[prototype-url]: https://www.figma.com/file/OxPXQzuV7QjLT2mysPUFxX/FinDonation?node-id=1%3A38
[database-image]: ./database/.github/findonation.png
[database-url]: https://github.com/cristianprochnow/FinDonation/tree/master/docs/database
