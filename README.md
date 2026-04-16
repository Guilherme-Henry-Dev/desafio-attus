# 🚀 Desafio Frontend Attus - Gestão de Usuários

Este projeto é uma aplicação de gerenciamento de usuários desenvolvida com **Angular 17+**, focada em alta performance reativa e conformidade com as melhores práticas de Clean Code e UI/UX.

## 📝 Respostas do Teste Técnico

As respostas detalhadas do teste técnico podem ser encontradas em:

📂 [D:\desafio-attus\docs\Resposta-teste-tecnico-Attus.docx](D:\desafio-attus\docs\Resposta-teste-tecnico-Attus.docx)

---

## 🛠️ Decisões Técnicas e Diferenciais
- **Reatividade com Signals:** Implementação de gerenciamento de estado local utilizando `signal` e `computed` para evitar detecções de mudança desnecessárias.
- **RxJS Avançado:** Uso de `debounceTime` e `distinctUntilChanged` na busca para otimizar chamadas, e `switchMap` para garantir a integridade dos dados durante requisições assíncronas.
- **Validações Customizadas:** Além dos campos obrigatórios, foram implementadas validações de formato para e-mail e lógica de tratamento de dados.
- **Gerenciamento de Memória:** Uso de `takeUntilDestroyed` do Angular Interop para prevenir memory leaks.
---
## 🚀 Tecnologias Utilizadas
- Angular 17 (Standalone Components, Control Flow `@for/@if`)
- Angular Signals (State Management Local)
- RxJS (Fluxos assíncronos, debounceTime, switchMap, catchError)
- Angular Material (Componentização de UI)
- Vitest/Jest (Testes Unitários)

## 📦 Como rodar o projeto localmente

1. Certifique-se de ter o Node.js instalado (v18.13+).
2. Clone o repositório:
   \`git clone https://github.com/Guilherme-Henry-Dev/desafio-attus.git\`
3. Instale as dependências:
   \`npm install\`
4. Inicie o servidor de desenvolvimento:
   \`npm start\` ou \`ng serve\`
5. O aplicativo estará disponível em \`http://localhost:4200/\`

## 🧪 Como rodar os testes
Para rodar a suíte de testes unitários:
\`npm  test\`