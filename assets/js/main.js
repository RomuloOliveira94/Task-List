const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

//função que mapeia o botão enter para enviar a tarefa
inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13){
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})

//função para criar o botão de apagar, recebe o li la da função de adicionar a tarefa
function criaBotaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

//unicamente cria a li de adicionar as tarefas
function criaLi(){
    const li = document.createElement('li')
    return li
}

//limpa a area de texto onde digita as tarefas        
function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}

//função criadora das tarefas ela que chama a função de limpar a do botão criado a partir dela e salva as tarefas
function criaTarefa(texto){
    const li = criaLi()
    li.innerText = texto
    tarefas.appendChild(li)
     limpaInput();
     criaBotaoApagar(li);
     salvarTarefas()
}

//botão que adiciona a tarefa na lista
btnTarefa.addEventListener('click', function(){
    if(!inputTarefa.value) return //se nao tiver nada escrito retorna nada para o console
    criaTarefa (inputTarefa.value) //chama a criação da tarefa mandando o que foi escrito como parametro
})

//dinamicamente busca o clique no botao de apagar que foi criado pela função de apagar
document.addEventListener('click', function (e){
    const el = e.target //coloca o evento de clique em uma variavel
    if(el.classList.contains('apagar')){ //busca o evento que tenha a classe apagar 
        el.parentElement.remove() //e remove o pai do elemento dessa forma
        salvarTarefas(); //e no final chama o salvar tarefas para que possa ser apagado do localstorage também
    }
})

//função que salva tudo, primeiramente busca os lis das tarefas, todos com selectorAll e cria o array que vai receber tudo
function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []
    
    for(let tarefa of liTarefas){ //nesse for o conteúdo das lis sao repassadas para o array
        let tarefaTexto = tarefa.innerText //usando innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim() //aqui tiramos o valor 'apagar' do texto e o espaço do final
        listaDeTarefas.push(tarefaTexto) //e por fim colocamos tudo no array, com push, mandando tudo como parametro
    }
    //agora criamos o json dessa forma 
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)  //e salvamos no cache do navegador
}

/*//aqui adicionamos de volta no site, buscando direto do cache
function adicionaTarefas(){
    const tarefas = localStorage.getItem('tarefas') //puxamos os dados com localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas) //pegamos o JSON e convertemos para array de novo
    for(let tarefas of listaDeTarefas){
        criaTarefa(tarefas); //e por fim iteramos com for, pegando todos esses dados, passando como parametro na função de criar as tarefas, ou seja elas sao colocadas dinamicamente no site a partir do cachê salvo
    }
}

adicionaTarefas(); //essa função esta aqui para ela ficar sempre ativa, para que o cache seja resgatado.*/