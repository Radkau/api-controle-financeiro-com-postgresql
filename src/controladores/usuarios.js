const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJWT = require('../senhaJWT')

const cadastrarUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptograda = await bcrypt.hash(senha, 10)

        const novoUsuario = await pool.query(
            `insert into usuarios (nome, email, senha)
            values ($1, $2, $3) returning id, nome, email`,
            [nome, email, senhaCriptograda]
        )

        return res.status(201).json(novoUsuario.rows[0])
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})
    }
}

const logarUsuario = async (req, res) => {
    const usuario = req.usuario

    try {
        const token = jwt.sign({ id: usuario.id }, senhaJWT, {expiresIn: '8h'})

        const { senha: s,...usuarioLogado } = usuario

        return res.json({ usuario: usuarioLogado, token})

    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})
    }
}

const detalharUsuarioLogado = async (req, res) => {
    const {senha: s, ...usuarioLogado} = req.usuario

    return res.status(200).json(usuarioLogado)
}

const atualizarUsuarioLogado = async (req, res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario

    try {
        const senhaCriptograda = await bcrypt.hash(senha, 10) 

        await pool.query(
            `update usuarios
            set nome = $1, email = $2, senha = $3
            where id = $4`, [nome, email, senhaCriptograda, id]
        )

        return res.json()
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})     
    }

}


module.exports = {
    cadastrarUsuarios,
    logarUsuario,
    detalharUsuarioLogado,
    atualizarUsuarioLogado
}