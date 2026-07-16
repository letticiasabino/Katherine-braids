# Landing Page — KATHERINE BRAIDS

Landing page responsiva e sofisticada para apresentação de serviços de tranças e solicitação de agendamento pelo WhatsApp. O projeto usa somente HTML, CSS e JavaScript puro e pode ser aberto localmente, sem servidor e sem banco de dados.

## Funcionalidades

- Cabeçalho fixo com navegação e menu mobile acessível;
- hero com chamada principal e acesso ao WhatsApp;
- oito cards de serviços com mensagens personalizadas;
- galeria responsiva com lightbox, navegação por setas e teclado;
- apresentação da profissional e diferenciais;
- explicação do processo de agendamento;
- formulário completo com validações individuais;
- máscara de telefone brasileiro e bloqueio de datas anteriores;
- montagem automática da solicitação e envio pelo WhatsApp;
- depoimentos marcados como placeholders;
- FAQ em accordion;
- chamada final, botão flutuante e rodapé com ano automático;
- animações leves com suporte a `prefers-reduced-motion`;
- melhorias de SEO, acessibilidade e performance.

## Tecnologias

- HTML5 semântico;
- CSS3 com variáveis, Grid, Flexbox e media queries;
- JavaScript puro;
- Font Awesome por CDN para ícones;
- Google Fonts por CDN (`DM Sans` e `Playfair Display`).

Se não houver internet, o conteúdo e as funções continuam funcionando; apenas as fontes e ícones externos podem usar alternativas locais do navegador.

## Estrutura

```text
Katherine-braids/
├── index.html
├── style.css
├── script.js
├── README.md
└── img/
    ├── 1784237728692.png
    ├── IMG-20260516-WA0170.jpg
    ├── IMG-20260516-WA0172.jpg
    ├── IMG-20260516-WA0173.jpg
    ├── IMG-20260516-WA0175.jpg
    ├── IMG-20260516-WA0176.jpg
    ├── IMG-20260516-WA0177.jpg
    ├── IMG-20260516-WA0181.jpg
    ├── IMG-20260516-WA0190.jpg
    ├── IMG-20260516-WA0192.jpg
    ├── IMG-20260516-WA0193.jpg
    ├── IMG-20260516-WA0198.jpg
    ├── IMG-20260516-WA0199.jpg
    └── IMG-20260516-WA0200.jpg
```

As imagens `WA0170` e `WA0172` são capturas de conversas e foram preservadas na pasta, mas não são exibidas no site. Isso evita publicar conversas privadas. As imagens utilizadas no site são todas locais.

## Como executar

### Sem Live Server

Abra a pasta do projeto e dê dois cliques em `index.html`. O site abrirá no navegador padrão.

### Com Live Server no VS Code

1. Abra a pasta no VS Code;
2. instale a extensão **Live Server**, caso ainda não tenha;
3. clique com o botão direito em `index.html`;
4. escolha **Open with Live Server**.

## Imagens

Para substituir uma imagem, coloque o novo arquivo dentro de `img` e mantenha o mesmo nome. Se preferir outro nome, atualize o atributo `src` correspondente em `index.html` ou a imagem de fundo em `style.css`.

Nomes originalmente sugeridos, caso queira padronizar futuramente:

```text
logo.png
hero.jpg
tranca-1.jpg
tranca-2.jpg
tranca-3.jpg
tranca-4.jpg
profissional.jpg
```

Use JPG ou WebP otimizado para fotos e PNG somente quando precisar de transparência. Recomenda-se manter imagens com pelo menos 900 px no lado maior.

## Como funciona o agendamento

O formulário não envia nem salva dados em servidor. Ao ser validado, o JavaScript organiza as informações preenchidas, codifica a mensagem e abre uma conversa com a profissional no WhatsApp. A cliente ainda precisa tocar em **Enviar** no WhatsApp. O pedido não confirma automaticamente o horário.

Número configurado:

```text
+55 (XX) 9XXXX-XXXX
API: 55219XXXXXXXX
```

### Alterar o WhatsApp

No início de `script.js`, altere:

```js
const WHATSAPP_NUMBER = '552197XXXXXXXX';
```

Depois, pesquise por `55219XXXXXXXX` em `index.html` e substitua os links de fallback e o link de telefone. Use somente números no valor usado pela API, incluindo país e DDD.

## Personalização

### Serviços

Edite os cards na seção `#servicos` de `index.html`. Para manter a mensagem personalizada, ajuste também o valor `data-service` do botão. As opções do formulário ficam no campo `<select id="service">`.

### Cores

Altere as variáveis no início de `style.css`:

```css
:root {
  --background: #050505;
  --background-secondary: #101010;
  --card-background: #161616;
  --pink-primary: #ff1675;
  --pink-hover: #ff3d91;
}
```

### Placeholders substituídos

Os seguintes placeholders foram substituídos pelos valores fornecidos:

- Nome da trancista: **KATHERINE BRAIDS**
- Instagram: **https://www.instagram.com/supernegona/**
- Biografia: história pessoal da profissional
- Depoimentos: Ana Beatriz Souza, Camila Ferreira, Renata Lima (nomes fictícios para exemplificação)

Para personalizar outros textos, pesquise por colchetes (`[`) em `index.html`.

## Publicação futura (opcional)

Por ser um site estático, pode ser publicado em GitHub Pages, Netlify, Vercel ou hospedagem tradicional. Envie os arquivos mantendo a estrutura e os caminhos relativos. Nenhuma configuração de backend é necessária.

## Privacidade

Não há backend, cookies, rastreamento ou banco de dados. Os dados do formulário permanecem no navegador e são usados somente para compor a mensagem que a cliente decide enviar pelo WhatsApp.

## Créditos

Desenvolvido para **KATHERINE BRAIDS**. Fotografias pertencem à profissional e devem ser publicadas somente com as autorizações necessárias.
"# Katherine-braids"  
