
let obj = []

// Carregar dados do localStorage na variável obj
const dadossalvos = localStorage.getItem('dados')
if (dadossalvos) {
    obj = JSON.parse(dadossalvos)
}

// Variável global para guardar o texto da pesquisa
let textoPesquisa = ''

// Renderizar cards
function renderizarCards() {
    const container = document.getElementById('tela-financeira')
    const checkboxes = document.querySelectorAll('#filtros input[type="checkbox"]')

    const categoriasSelecionadas = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value)

    container.innerHTML = ''

    let total = 0

    obj.forEach((item, index) => {
        // Se houver checkboxes marcados, só mostra as categorias selecionadas
        if (categoriasSelecionadas.length > 0 && !categoriasSelecionadas.includes(item.select)) {
            return
        }

        // Filtrar pelo texto da pesquisa no título (case insensitive)
        if (textoPesquisa && !item.titulo.toLowerCase().includes(textoPesquisa.toLowerCase())) {
            return
        }

        const cardFinanceiro = document.createElement('div')
        cardFinanceiro.classList.add('cardFinanceiro')
        cardFinanceiro.setAttribute('data-index', index)

        const valorFormatado = Number(item.valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        cardFinanceiro.innerHTML = `
            <h3>${item.titulo}</h3>
            <h2>${valorFormatado}</h2>
            <div style="width:100%; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; width:auto; align-itens:center; justify-content:center;text-align:center;">
                <p class="bloco-select" style="border-radius:10px; padding:4px 10px;">${item.select}</p>
            </div>
                <img src="./src/icon/delete.svg" class="btn-delete" data-index="${index}" style="cursor:pointer; width:24px;">
            </div>
        `

        //<p style="font-size: 7pt; color: white; text-align:center;">${item.data || 'data não disponível'}</p>

        switch (item.select) {
            case 'casa':
                cardFinanceiro.classList.add('bg-casa')
                break
            case 'familia':
                cardFinanceiro.classList.add('bg-familia')
                break
            case 'remedio':
                cardFinanceiro.classList.add('bg-remedio')
                break
            case 'cartao':
                cardFinanceiro.classList.add('bg-cartao')
                break
            case 'pessoal':
                cardFinanceiro.classList.add('bg-pessoal')
                break
        }

        total += Number(item.valor)

        container.appendChild(cardFinanceiro)
    })

    const totalFormatado = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    document.getElementById('total-gasto').textContent = totalFormatado


    const valorTotalMobile = document.getElementById('valor-total-mobile')
    if (valorTotalMobile) {
        valorTotalMobile.textContent = totalFormatado
    }

    // Evento de deletar card
    const botoesDeletar = container.querySelectorAll('.btn-delete')
    botoesDeletar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let confirm = window.confirm("Realmente quer apagar essa conta?")
            if( confirm == true){
            const index = parseInt(e.target.getAttribute('data-index'))
            obj.splice(index, 1)
            localStorage.setItem('dados', JSON.stringify(obj))
            renderizarCards()
            } else{
                return
            }
        })
    })
}

// Filtro com checkboxes
document.querySelectorAll('#filtros input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        renderizarCards()
    })
})

// Filtro com barra de pesquisa
document.querySelector('.search-bar').addEventListener('input', (e) => {
    textoPesquisa = e.target.value.trim()
    renderizarCards()
})

// Criação de card
document.getElementById('button-create-card').addEventListener('click', () => {
    const card = document.getElementById('create-card')
    const overlay = document.getElementById('overlay')
    const titleInput = document.getElementById('input-name')
    const valueInput = document.getElementById('input-value')
    const selectInput = document.getElementById('select')

    const titulo = titleInput.value
    const valor = valueInput.value
    const select = selectInput.value

    if (!titulo || !valor) {
        alert('Preencha todos os campos')
        return
    }

    const data = new Date().toLocaleDateString('pt-BR')

    obj.push({ titulo, valor, select, data })
    localStorage.setItem('dados', JSON.stringify(obj))

    card.classList.toggle('off-display')
    overlay.classList.toggle('off-display')

    titleInput.value = ''
    valueInput.value = ''

    renderizarCards()
})

// Alternar entre grid e linha
document.getElementById('img-grid').addEventListener('click', () => {
    document.getElementById('img-grid').classList.toggle('off-display')
    document.getElementById('img-line').classList.toggle('off-display')

    document.querySelectorAll('.cardFinanceiro').forEach(card => {
        card.classList.add('grid')
    })
})

document.getElementById('img-line').addEventListener('click', () => {
    document.getElementById('img-line').classList.toggle('off-display')
    document.getElementById('img-grid').classList.toggle('off-display')

    document.querySelectorAll('.cardFinanceiro').forEach(card => {
        card.classList.remove('grid')
    })
})

// Abrir e fechar painel de criação
document.getElementById('button-create').addEventListener('click', () => {
    document.getElementById('create-card').classList.toggle('off-display')
    document.getElementById('overlay').classList.toggle('off-display')
})

document.getElementById('close-create-card').addEventListener('click', () => {
    document.getElementById('create-card').classList.toggle('off-display')
    document.getElementById('overlay').classList.toggle('off-display')
})

// Menu lateral
document.getElementById('menu-button').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('hidden')
    document.getElementById('main').classList.toggle('full-width')
})

// Inicializa os cards ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    renderizarCards()
})



if (window.innerWidth <= 768) {
    document.getElementById('main').classList.remove('full-width')


    window.addEventListener('DOMContentLoaded', () => {
        const totalTexto = document.getElementById('total-gasto').textContent

        const totalGastos = document.createElement('div')
        totalGastos.innerHTML = `
            <div style="position: fixed; bottom: 0px; width: 100%; height: auto; background-color: rgba(255, 255, 255, 0.6);backdrop-filter: blur(10px); text-align: center; padding:5px;">
                <p style="font-size:15pt;">Total gasto:</p>
                <h1 id="valor-total-mobile" style="font-size:17pt; color:rgb(92, 0, 179);">${totalTexto}</h1>
            </div>
        `

        document.body.appendChild(totalGastos)
    })
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registrado com sucesso!'))
        .catch(err => console.error('Erro ao registrar o Service Worker:', err))
}