# Mendes & Favaro — Documentação de Implementação

> Projeto Next.js 14 · TypeScript · Tailwind CSS · Princípios SOLID

---

## Índice

1. [Estrutura do Projeto](#estrutura)
2. [Arquitetura e Princípios SOLID](#solid)
3. [Configuração Inicial](#configuracao)
4. [Variáveis de Ambiente](#env)
5. [Páginas e Rotas](#paginas)
6. [Componentes Principais](#componentes)
7. [SEO e Schema.org](#seo)
8. [Chatbot WhatsApp](#chatbot)
9. [Integrações Externas](#integracoes)
10. [Performance e Core Web Vitals](#performance)
11. [Acessibilidade WCAG AA](#acessibilidade)
12. [Deploy — Vercel](#deploy)
13. [Checklist de Configuração](#checklist)
14. Diagrama de arquitetura do projeto

---

## 1. Estrutura do Projeto {#estrutura}

```
mendes-favaro/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (fonts, GTM, Pixel, Schema)
│   │   ├── page.tsx                  # Home
│   │   ├── imoveis/page.tsx          # Listagem de imóveis
│   │   ├── sobre/page.tsx            # Sobre Nós
│   │   ├── contato/page.tsx          # Contato + Mapa
│   │   ├── blog/page.tsx             # Blog (SEO)
│   │   ├── privacidade/page.tsx      # Política de Privacidade (LGPD)
│   │   └── api/
│   │       ├── contact/route.ts      # POST /api/contact
│   │       ├── chatbot/lead/route.ts # POST /api/chatbot/lead
│   │       └── sitemap/route.ts      # GET /api/sitemap (XML)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Header fixo + glassmorphism + mobile menu
│   │   │   └── Footer.tsx            # Footer completo + redes sociais
│   │   └── features/
│   │       ├── properties/
│   │       │   ├── PropertyCard.tsx  # Card de imóvel (favoritar, compartilhar, WA)
│   │       │   └── PropertyFilters.tsx # Filtros avançados com URL sync
│   │       ├── calculator/
│   │       │   └── FinancingCalculator.tsx  # Calculadora Price em tempo real
│   │       ├── chatbot/
│   │       │   └── WhatsAppChatbot.tsx      # Widget chatbot completo
│   │       └── ContactForm.tsx       # Formulário de contato com Zod
│   ├── lib/
│   │   ├── config.ts                 # ⭐ Single source of truth
│   │   ├── financing.ts              # Cálculo financeiro (função pura)
│   │   ├── seo/metadata.ts           # Gerador de metadata Next.js
│   │   ├── schema/index.ts           # JSON-LD generators (Schema.org)
│   │   └── analytics/index.tsx       # GTM + GA4 + FB Pixel helpers
│   ├── services/
│   │   ├── properties/index.ts       # IPropertyService + implementação
│   │   ├── whatsapp/index.ts         # IWhatsAppService + link builder
│   │   └── crm/index.ts              # ICRMService + Google Sheets adapter
│   ├── hooks/
│   │   └── useScrollReveal.ts        # IntersectionObserver reveal
│   ├── types/index.ts                # Tipos TypeScript globais
│   └── styles/globals.css            # CSS vars, utilitários Tailwind
├── .env.example                      # Template de variáveis de ambiente
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 2. Arquitetura e Princípios SOLID {#solid}

### S — Single Responsibility

Cada arquivo tem uma única responsabilidade clara:

| Arquivo | Responsabilidade |
|---------|-----------------|
| `lib/config.ts` | Única fonte de verdade para configurações da marca |
| `lib/financing.ts` | Somente cálculo matemático de financiamento |
| `lib/seo/metadata.ts` | Somente geração de metadata SEO |
| `lib/schema/index.ts` | Somente criação de JSON-LD |
| `lib/analytics/index.tsx` | Somente eventos de rastreamento |

### O — Open/Closed

Os schemas JSON-LD são extensíveis sem modificação:
```typescript
// Adicionar novo schema sem tocar nos existentes:
export function buildOrganizationSchema() { ... }   // ✅ novo
export function buildRealEstateAgentSchema() { ... } // ✅ intacto
```

### L — Liskov Substitution

Qualquer implementação que satisfaça `ICRMService` pode substituir `GoogleSheetsCRMService`:
```typescript
// Trocar para HubSpot sem afetar consumidores:
export class HubSpotCRMService implements ICRMService {
  async saveLead(lead) { /* HubSpot API */ }
}
export const crmService = new HubSpotCRMService() // swap aqui
```

### I — Interface Segregation

Interfaces são pequenas e focadas:
```typescript
interface IPropertyService {
  list(filter): Promise<PaginatedResult<Property>>
  getBySlug(slug): Promise<Property | null>
  getFeatured(limit?): Promise<Property[]>
}
// Consumidores dependem da interface, não da implementação
```

### D — Dependency Inversion

Componentes dependem de abstrações (interfaces), não de implementações concretas:
```typescript
// PropertyCard depende de IWhatsAppService via injeção
import { whatsAppService } from '@/services/whatsapp' // singleton que implementa interface
```

---

## 3. Configuração Inicial {#configuracao}

### Pré-requisitos

- Node.js 18.17+ (recomendado: 20 LTS)
- npm 9+ ou pnpm 8+

### Instalação

```bash
# 1. Clone ou descompacte o projeto
cd mendes-favaro

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com seus dados reais

# 4. Execute em desenvolvimento
npm run dev
# → http://localhost:3000

# 5. Build de produção
npm run build
npm start
```

---

## 4. Variáveis de Ambiente {#env}

Copie `.env.example` para `.env.local` e preencha:

### Obrigatórias

```bash
NEXT_PUBLIC_SITE_URL          # URL completa do site em produção
NEXT_PUBLIC_PHONE             # Telefone exibido no site
NEXT_PUBLIC_WHATSAPP          # Número WA no formato: 5511999999999
NEXT_PUBLIC_EMAIL             # E-mail de contato
```

### Analytics (recomendadas)

```bash
NEXT_PUBLIC_GTM_ID            # Google Tag Manager (GTM-XXXXXXX)
NEXT_PUBLIC_GA4_ID            # Google Analytics 4 (G-XXXXXXXXXX)
NEXT_PUBLIC_FB_PIXEL          # Facebook Pixel ID (16 dígitos)
```

### CRM e WhatsApp Business

```bash
GOOGLE_SHEETS_WEBHOOK         # URL do Google Apps Script Web App
WA_BUSINESS_API_URL           # URL da API do provedor (Z-API, Twilio…)
WA_BUSINESS_API_KEY           # Chave/token da API
WA_NOTIFY_NUMBER              # Número que receberá notificações de leads
```

---

## 5. Páginas e Rotas {#paginas}

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `app/page.tsx` | Home: Hero, destaques, calculadora, FAQ, CTA |
| `/imoveis` | `app/imoveis/page.tsx` | Listagem com filtros avançados |
| `/imoveis/[slug]` | *(a implementar)* | Detalhe do imóvel + lightbox + mapa |
| `/sobre` | `app/sobre/page.tsx` | Institucional, missão, equipe |
| `/servicos` | *(a implementar)* | Página de serviços detalhados |
| `/contato` | `app/contato/page.tsx` | Formulário + mapa + informações |
| `/blog` | `app/blog/page.tsx` | Listagem de artigos SEO |
| `/blog/[slug]` | *(a implementar)* | Artigo individual |
| `/privacidade` | `app/privacidade/page.tsx` | Política de Privacidade (LGPD) |
| `/api/contact` | `app/api/contact/route.ts` | Recebe formulário de contato |
| `/api/chatbot/lead` | `app/api/chatbot/lead/route.ts` | Salva lead do chatbot + notifica WA |
| `/api/sitemap` | `app/api/sitemap/route.ts` | Gera sitemap.xml dinâmico |

---

## 6. Componentes Principais {#componentes}

### Header
- Glassmorphism ativado após 20px de scroll (`backdrop-blur: 12px`)
- Menu mobile com focus trap e `aria-modal="true"`
- Fecha com tecla `Esc`
- `aria-current="page"` no link ativo
- Botão WhatsApp com link pré-preenchido

### PropertyCard
- Imagem com `fill` + `sizes` otimizados para LCP
- Hover: `scale(1.03)` + sombra elevada
- Botão favoritar com `aria-pressed`
- Botão compartilhar usa `navigator.share` (mobile) ou Facebook Sharer (desktop)
- Botão WhatsApp com contexto do imóvel pré-preenchido
- Rastreamento FB Pixel e GA4 nos eventos

### FinancingCalculator
- Cálculo pelo Sistema Price (parcela constante)
- Todos os sliders com `aria-valuemin/max/now/text`
- Atualização em tempo real via `useMemo`
- Botão envia simulação formatada pelo WhatsApp

### WhatsAppChatbot
- Fluxo em árvore de decisão (7 etapas)
- Validação com Zod + React Hook Form
- Persistência em `localStorage` (após consentimento LGPD)
- Pulso de atenção a cada 8 segundos
- Focus trap dentro do diálogo
- `role="dialog" aria-modal="true"`
- Botão fechar com `Esc`

---

## 7. SEO e Schema.org {#seo}

### Metadata automática
```typescript
// Todas as páginas usam:
export const metadata = generatePageMetadata({
  title: 'Título da Página',
  description: 'Descrição com 120–160 chars...',
  path: '/caminho',
  keywords: ['palavra', 'chave'],
})
```

Gera automaticamente:
- `<title>` + `<meta description>`
- Open Graph completo (og:title, og:description, og:image 1200×630)
- Twitter Card `summary_large_image`
- `<link rel="canonical">`
- `robots` index/noindex

### JSON-LD Schema.org

Schemas implementados no `src/lib/schema/index.ts`:

| Schema | Onde usar | Função |
|--------|-----------|--------|
| `RealEstateAgent` | Root layout | `buildRealEstateAgentSchema()` |
| `RealEstateListing` | Página do imóvel | `buildPropertySchema(property)` |
| `LocalBusiness` | Página de contato | `buildLocalBusinessSchema()` |
| `BreadcrumbList` | Todas as internas | `buildBreadcrumbSchema(items)` |
| `FAQPage` | Home + FAQ | `buildFAQSchema(faqs)` |

### Sitemap dinâmico

Acesse: `https://seusite.com/api/sitemap`

Inclui automaticamente todas as páginas estáticas + todos os imóveis cadastrados. Revalidação a cada hora.

Submeta no **Google Search Console**: `Sitemaps → Adicionar sitemap → /api/sitemap`

---

## 8. Chatbot WhatsApp {#chatbot}

### Fluxo completo

```
[Abertura] → Saudação automática
     ↓
[Intent] → Comprar | Alugar | Anunciar | Falar com Corretor
     ↓                                        ↓
[Tipo Imóvel]                          [Redirecionamento direto WA]
     ↓
[Faixa de Preço]
     ↓
[Bairro/Região]
     ↓
[Coleta de dados] → nome + WhatsApp + aceite LGPD
     ↓
[Sucesso] → Notificação enviada → Link WA com contexto
```

### API WhatsApp Business

Testado com:
- **Z-API** (recomendado para Brasil): `https://api.z-api.io`
- **Evolution API** (open-source): deploy próprio
- **Twilio**: API global com maior confiabilidade

Configure no `.env.local`:
```bash
WA_BUSINESS_API_URL="https://api.z-api.io/instances/SEU_ID/token/SEU_TOKEN/send-text"
WA_BUSINESS_API_KEY="seu-token"
WA_NOTIFY_NUMBER="5511999999999"
```

### CRM — Google Sheets

1. Crie uma planilha no Google Sheets
2. Vá em `Extensões → Apps Script`
3. Cole o script abaixo e faça deploy como "Web App" (acesso: qualquer pessoa)

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data  = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.savedAt, data.name, data.whatsapp,
    data.intent, data.propertyType, data.priceRange,
    data.neighborhood, data.source
  ]);
  return ContentService.createTextOutput('OK');
}
```

4. Copie a URL do Web App para `GOOGLE_SHEETS_WEBHOOK`

---

## 9. Integrações Externas {#integracoes}

### Google Analytics 4 + GTM

1. Crie um container no [Google Tag Manager](https://tagmanager.google.com)
2. Dentro do GTM, adicione a tag GA4 com seu `G-XXXXXXXXXX`
3. Configure os eventos personalizados que já estão rastreados:
   - `view_item` — visualização de imóvel
   - `add_to_wishlist` — favoritar imóvel
   - `generate_lead` — lead via chat ou formulário
   - `contact_form_submit` — envio de formulário de contato

### Facebook Pixel

Eventos configurados automaticamente:
- `PageView` — toda visita
- `ViewContent` — visualização de imóvel (com `content_id` e `value`)
- `Contact` — envio de formulário
- `Lead` — lead via chatbot

Para configurar Conversions API (server-side), adicione em `/api/chatbot/lead`:
```typescript
import { FacebookAdsApi, ServerEvent } from 'facebook-nodejs-business-sdk'
// Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api
```

### Instagram Feed Embed

Para exibir os posts do Instagram, use a API oficial ou um serviço:
```typescript
// Opção 1: Elfsight (pago, fácil) — elfsight.com
// Opção 2: Instagram Basic Display API (gratuita, exige OAuth)
// Configurar em: src/components/features/social/InstagramFeed.tsx
```

---

## 10. Performance e Core Web Vitals {#performance}

### Metas (Google Core Web Vitals)

| Métrica | Meta | Como atingir |
|---------|------|-------------|
| LCP | < 2.5s | `priority` + `fetchpriority="high"` na imagem hero |
| CLS | < 0.1 | `width`/`height` em todas as imagens; `font-display: swap` |
| INP | < 200ms | Scripts com `defer`; sem bloqueio do thread principal |

### Imagens

- Todas via `next/image` com `sizes` adequado ao breakpoint
- Formato WebP/AVIF automático (configurado em `next.config.js`)
- Imagem hero: `priority` + `fetchpriority="high"`
- Demais imagens: `loading="lazy"` (padrão do `next/image`)

### Fontes

```typescript
// No layout.tsx — carregamento eficiente via next/font
const fontDisplay = Playfair_Display({ display: 'swap', ... })
const fontBody    = Source_Sans_3({ display: 'swap', ... })
```

### Scripts de terceiros

- GTM e FB Pixel carregados no `<head>` (necessário para rastreamento)
- Mapa Google Maps com `loading="lazy"` no iframe
- Swiper/Lightbox importados dinamicamente quando necessário

---

## 11. Acessibilidade WCAG AA {#acessibilidade}

### Implementado

- ✅ Skip link "Pular para o conteúdo principal" (visível no foco)
- ✅ `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`
- ✅ `aria-label` em todos os elementos interativos sem texto visível
- ✅ `aria-current="page"` nos links de navegação ativos
- ✅ `aria-expanded` em botões de accordion/menu
- ✅ `aria-live="polite"` na área de mensagens do chatbot
- ✅ `aria-invalid` em campos com erro
- ✅ Focus trap no menu mobile e chatbot
- ✅ Fechar modais com `Esc`
- ✅ `alt` descritivo em todas as imagens
- ✅ Contraste WCAG AA (4.5:1 texto normal, 3:1 texto grande)
- ✅ `prefers-reduced-motion` respeita preferência do usuário
- ✅ Formulários com `<label>` associado a cada `<input>`
- ✅ Navegação por teclado em todos os componentes interativos

### Verificação

```bash
# Instale o axe-core para testes automatizados:
npm install --save-dev @axe-core/react

# Ferramentas recomendadas:
# - Lighthouse (Chrome DevTools)
# - WAVE (extensão do navegador)
# - axe DevTools (extensão)
```

---

## 12. Deploy — Vercel {#deploy}

### Passo a passo

```bash
# 1. Instale a Vercel CLI
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy de preview
vercel

# 4. Deploy de produção
vercel --prod
```

### Configuração na Vercel

1. **Environment Variables**: Adicione todas as variáveis do `.env.example`
2. **Domain**: Configure seu domínio personalizado em `Settings → Domains`
3. **Build Command**: `npm run build` (padrão)
4. **Output Directory**: `.next` (padrão)

### Configurações recomendadas

```bash
# vercel.json (opcional)
{
  "regions": ["gru1"],  # São Paulo (mais próximo do Brasil)
  "headers": [
    { "source": "/(.*)", "headers": [
      { "key": "X-Robots-Tag", "value": "index, follow" }
    ]}
  ]
}
```

---

## 13. Checklist de Configuração {#checklist}

### Antes do go-live

**Identidade e Conteúdo**
- [ ] Atualizar dados em `src/lib/config.ts` (telefone, endereço, CRECI)
- [ ] Substituir imagens placeholder pelos imóveis reais
- [ ] Preencher `MOCK_POSTS` com artigos reais ou conectar ao CMS
- [ ] Implementar `src/app/imoveis/[slug]/page.tsx` com detalhes do imóvel
- [ ] Adicionar logo real em `/public/logo.svg` e `/public/og-default.jpg`

**Técnico**
- [ ] Preencher `.env.local` com todas as variáveis
- [ ] Configurar domínio + HTTPS
- [ ] Testar formulário de contato (email chega?)
- [ ] Testar chatbot → lead chega no Google Sheets?
- [ ] Testar notificação WhatsApp para o número do corretor
- [ ] Verificar Pixel do Facebook no Pixel Helper (extensão Chrome)
- [ ] Verificar GA4 em tempo real
- [ ] Submeter `/api/sitemap` no Google Search Console
- [ ] Validar Schema.org em: https://search.google.com/test/rich-results
- [ ] Testar Open Graph em: https://developers.facebook.com/tools/debug/

**Performance**
- [ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 90
- [ ] LCP < 2.5s na página inicial (testar com 4G simulado)
- [ ] Imagens em WebP/AVIF com `next/image`

**Acessibilidade**
- [ ] Navegar todo o site apenas com teclado
- [ ] Testar com leitor de tela (NVDA/VoiceOver)
- [ ] Verificar contraste no WAVE

**LGPD**
- [ ] Política de Privacidade revisada por advogado
- [ ] Banner de cookies implementado (recomendado: `next-cookie-consent`)
- [ ] Formulários com checkbox de aceite obrigatório

---

## Próximos passos (roadmap)

1. **Página de detalhe do imóvel** (`/imoveis/[slug]`) — galeria lightbox + mapa + compartilhamento
2. **Integração com CMS real** — Sanity.io (recomendado) para gestão de imóveis e blog sem código
3. **Busca avançada com IA** — integração com Algolia ou Typesense
4. **Dashboard do corretor** — área restrita para gestão de leads
5. **PWA** — `next-pwa` para funcionar offline
6. **Testes automatizados** — Vitest (unitários) + Playwright (E2E)
7. **Internacionalização** — `next-intl` caso precise de espanhol/inglês

---
## 14. Diagrama de arquitetura 

![Diagrama]([url_ou_caminho_da_imagem.jpg](https://github.com/MichaelRodr/SiteImobiliario/blob/main/Public/img/Diagrama.svg)

*Documentação gerada para o projeto Mendes & Favaro — v1.0.0*
