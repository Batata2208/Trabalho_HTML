let colocarnovatarefa = document.querySelector('#colocarnovatarefa');
let adicionartarefa = document.querySelector('#adicionartarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicaoButtFechar = document.querySelector('#janelaEdicaoButtFechar');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let buttAtualizarTarefa = document.querySelector('#buttAtualizarTarefa');
let IdEdicao = document.querySelector('#IdEdicao');
let colocarTarefaEditar = document.querySelector('#colocarTarefaEditar');

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}

colocarnovatarefa.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        let tarefa = {
            nome: colocarnovatarefa.value, id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoButtFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

adicionartarefa.addEventListener('click', (e) => {
    let tarefa = {
        nome: colocarnovatarefa.value, id: gerarId(),
    }   
    adicionarTarefa(tarefa);

});

buttAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = IdEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome: colocarTarefaEditar.value, 
        id: idTarefa
    }
    let tarefaAtual = document.getElementById('' + idTarefa + '');
    
    if(tarefaAtual){
        let li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }

});


function gerarId() {
    return Math.floor(Math.random() * 3000);  
}

function adicionarTarefa(tarefa) {
    let li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    colocarnovatarefa.value = '';
}

function criarTagLi(tarefa) {

    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
        span.classList.add('textoTarefa');
        span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let  buttEditar = document.createElement('button');
         buttEditar.classList.add('buttAcao');
         buttEditar.innerHTML = '<i class="fa fa-pencil"></i>';
         buttEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let  buttExcluir = document.createElement('button');
         buttExcluir.classList.add('buttAcao');
         buttExcluir.innerHTML = '<i class="fa fa-trash"></i>';
         buttExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(buttEditar);
    div.appendChild(buttExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idTarefa){
    let li = document.getElementById('' + idTarefa + '');
    if(li){
        IdEdicao.innerHTML = '#' + idTarefa;
        colocarTarefaEditar.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}

function excluir(idTarefa){
    let confirmar = window.confirm('Deseja realmente excluir a tarefa?');
    if(confirmar){
        let tarefa = document.getElementById('' + idTarefa + '');
        listaTarefas.removeChild(tarefa);
    } else {
        alert('Elemento HTML não encontrado!');
    }
}




