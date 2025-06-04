# Despesas.io - Assistente-financeiro

Uma aplicação web simples para gerenciamento financeiro pessoal, onde você pode adicionar, visualizar e filtrar despesas por categorias, além de buscar por títulos. O projeto armazena os dados no `localStorage` para persistência local.

---

## Funcionalidades

- Criar cards de despesas com título, valor e categoria.
- Visualizar cards em formato grid ou linha.
- Filtrar despesas por categorias usando checkboxes.
- Buscar despesas pelo título com atualização instantânea.
- Deletar cards de despesas.
- Visualizar o total gasto atualizado dinamicamente.
- Armazenamento local dos dados no navegador (localStorage).
- Menu lateral para seleção dos filtros.

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API

---

## Como usar

1. Clone ou baixe o repositório.
2. Abra o arquivo `index.html` em um navegador moderno.
3. Para adicionar uma despesa, clique no botão de criar (+), preencha os campos e clique em "Criar".
4. Use a barra de pesquisa para buscar despesas pelo título.
5. Utilize os filtros (checkboxes) no menu lateral para filtrar por categoria.
6. Alterne a visualização entre grid e lista clicando nos ícones correspondentes.
7. Clique no ícone de deletar em cada card para removê-lo.
8. O total gasto é atualizado automaticamente.

---

## Estrutura dos dados

Cada despesa é armazenada como um objeto no array `obj` com as seguintes propriedades:

- `titulo`: string - título da despesa
- `valor`: number (string numérica) - valor da despesa
- `select`: string - categoria da despesa (`casa`, `familia`, `remedio`, `cartao`, `pessoal`, `contas`)

Os dados são salvos e recuperados do `localStorage` na chave `"dados"`.

---

## Capturas de tela

*Adicione aqui algumas imagens do seu app funcionando para ilustrar.*

---

## Como contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -m 'Minha feature'`).
4. Faça push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

---

## Autor

GabrielCasteloDev - https://github.com/GabrielCasteloDev

---
