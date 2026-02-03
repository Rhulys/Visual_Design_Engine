# 🚀 Visual Design Engine
Uma ferramenta de autoria visual construída com React e TypeScript que permite criar layouts complexos e exportar automaticamente para componentes Styled Components.

## 🛠️ O Desafio Técnico
O objetivo deste projeto foi resolver o problema de manipulação de estruturas de dados em árvore no Frontend, permitindo que usuários sem conhecimento técnico em CSS possam estruturar layouts enquanto a engine garante a saída de código limpo e performático.

## 🏗️ Arquitetura e Tecnologias
- **React 18 & TypeScript:** Garantindo tipagem estrita para a estrutura da árvore de nós.
- **Zustand:** Gerenciamento de estado atômico para atualizações rápidas na árvore de layout.
- **dnd-kit:** Orquestração de Drag-and-Drop em estruturas recursivas com detecção de colisão.
- **Styled Components:** Estilização dinâmica e geração de código CSS-in-JS.

## ✨ Funcionalidades Principais
- **Recursive Rendering Engine:** Motor capaz de renderizar N níveis de profundidade de elementos.
- **Visual Style Inspector:** Controle em tempo real de propriedades como Flexbox, Padding e Cores.
- **Tree Manipulation:** Algoritmos de busca (DFS) para atualização e reordenamento de nós.
- **Code Export:** Compilador interno que transforma o JSON da árvore em código React funcional.
- **Layers Panel:** Visualização hierárquica para facilitar a seleção de elementos complexos.

## 🧠 Decisões de Engenharia
- **Performance:** Implementação de React.memo e useMemo para evitar re-renders desnecessários em árvores profundas.
- **DX (Developer Experience):** Uso de sensores de ativação no DnD para diferenciar intenção de clique (seleção) de arraste (movimentação).
- **Escalabilidade:** Estrutura de tipos extensível, permitindo adicionar novos componentes (Input, Imagens, etc) apenas atualizando o NodeType

## 🚀 Como rodar o projeto
1 - Instale as dependências
2 - `npm install`
3 - Inicie o servidor de desenvolvimento
4 - `npm run dev`