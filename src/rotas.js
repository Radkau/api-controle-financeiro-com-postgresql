const express = require('express')

const {
    validarLoginUsuario,
    validarCamposUsuario,
    validarCamposTransacao,
    validarTransacao,
    validarCadastroEmail,
    validarAtualizarEmail
} = require('./intermediarios/validacoes')

const {
    cadastrarUsuarios,
    logarUsuario,
    detalharUsuarioLogado,
    atualizarUsuarioLogado
} = require('./controladores/usuarios')

const {
    cadastrarTransacaoUsuarioLogado,
    listarTransacoesUsuarioLogado,
    detalharTransacaoUsuarioLogado,
    atualizarTransacaoUsuarioLogado,
    excluirTransacaoUsuarioLogado,
    extratoTransacoesUsuarioLogado
} = require('./controladores/transacoes')

const listarCategorias = require('./controladores/categorias')
const verificarUsuarioLogado = require('./intermediarios/autenticacao')


const rotas = express()

rotas.post('/usuario', validarCamposUsuario, validarCadastroEmail, cadastrarUsuarios)
rotas.post('/login', validarLoginUsuario, logarUsuario)

rotas.use(verificarUsuarioLogado)

rotas.get('/usuario', detalharUsuarioLogado)
rotas.put('/usuario', validarCamposUsuario, validarAtualizarEmail, atualizarUsuarioLogado)

rotas.get('/categorias', listarCategorias)

rotas.post('/transacao', validarCamposTransacao, cadastrarTransacaoUsuarioLogado)
rotas.get('/transacao', listarTransacoesUsuarioLogado)
rotas.get('/transacao/extrato', extratoTransacoesUsuarioLogado)
rotas.get('/transacao/:id', validarTransacao, detalharTransacaoUsuarioLogado)
rotas.put('/transacao/:id', validarCamposTransacao, validarTransacao, atualizarTransacaoUsuarioLogado )
rotas.delete('/transacao/:id', validarTransacao, excluirTransacaoUsuarioLogado)


module.exports = rotas