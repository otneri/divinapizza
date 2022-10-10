const { request, response } = require('express');
const express = require('express');
const app = express()

app.use(express.json())

let pizzas = []
let pedidos = []

app.get('/pizzas', (request, response) => {
    response.json(pizzas)
}) 

app.post('/pizzas',(request, response)=>{
    console.log(request.body);

    const novaPizza = {
        id: Math.random(3),
        nome: request.body.nome,
        descricao: request.body.descricao,
        preco: request.body.preco,
        ingredientes: request.body.ingredientes
    }
    pizzas.push(novaPizza);
    response.status(201).json(novaPizza)
})

app.get('/solicitations', (request, response) => {
    response.json(pedidos)
}) 

app.post('/solicitations', (request, response)=>{
    console.log(request.body);
    const pedido = {
        nome: request.body.nome,
        cpf : request.body.cpf,
        endereco: request.body.endereco,
        tel: request.body.tel,
        pagamento: request.body.pagamento,
        observacao: request.body.observacao,
        pedido: request.body.pedido
    }
    pedidos.push(pedido)
    response.status(201).json(pedido)
})

app.get('/solicitations/:cpf', (request, response) => {
    console.log(request.params);
    const filtraPedido = pedidos.find(pedido => pedido.cpf === request.params.cpf)
    if(!filtraPedido) {
        return response.status(404).json({error:'Not Find'})
    }
    response.json(filtraPedido)
})

app.put('/solicitations/:cpf', (request, response) => {
    console.log(request.params);
    const editaPedido = pedidos.map(pedido => {
        if(pedido.cpf === request.params.cpf){
            pedido.nome = request.body.nome;
            pedido.cpf = request.body.cpf;
            pedido.endereco = request.body.endereco;
            pedido.observacao = request.body.observacao;
            pedido.tel = request.body.tel;
            pedido.pagamento = request.body.pagamento;
            pedido.pedido = request.body.pedido;
        }
        return pedido
    })
    pedidos = [...editaPedido]
    response.json('Pedido atualizado!')

})


app.delete('/solicitations/:cpf', (request, response) => {
    console.log(request.params);
    const filtraPedido = pedidos.filter(pedido => pedido.cpf !== request.params.cpf)
    pedidos = [...filtraPedido]
    response.json('Pedido Deletado.')
})


app.listen(3333, () => {
    console.log('Servidor online na porta 3333.');
})