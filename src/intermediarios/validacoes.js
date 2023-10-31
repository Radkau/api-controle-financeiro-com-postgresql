const pool = require('../conexao')
const bcrypt = require('bcrypt')

const validarCamposUsuario = async (req, res, next) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
    }

    next()
}

const validarCadastroEmail = async (req, res, next) => {
    const { email } = req.body

    try {
        const { rowCount } = await pool.query(`select * from usuarios where email = $1 `, [email])
            
        if (rowCount != 0) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})
    }
    
    next()
}

const validarLoginUsuario = async (req, res, next) => {
    const { email, senha } = req.body

    try {
        const { rowCount, rows } = await pool.query(`select * from usuarios where email = $1`, [email])
    
        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Email ou senha inválida!' })
        }
    
        if(!senha) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida!' })
        }
    
        const senhaValida = await bcrypt.compare(senha, rows[0].senha)
    
        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida!' })
        }
    
        req.usuario = rows[0]
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})
    }

    next()
}

const validarAtualizarEmail = async (req, res, next) => {
    const { id } = req.usuario
    const { email } = req.body

    try {
        const { rowCount } = await pool.query(`select * from usuarios where email = $1 and id <> $2`, [email, id])
            
        if (rowCount != 0) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})
    }

    next()
}

const validarCamposTransacao = async (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo} = req.body
    
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados!' })
    }

    if (tipo != 'entrada' && tipo != 'saida') {
        return res.status(400).json({ mensagem: 'Tipo de transação inválida!' })
    }

    try {
        const { rowCount } = await pool.query(
            `select * from categorias where id = $1`, [categoria_id]
        )

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada!'})
        }   
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})
    }

    next() 
}

const validarTransacao = async (req, res, next) => {
    const { id: id_usuario } = req.usuario
    const { id } = req.params

    try {
        const { rowCount, rows } = await pool.query(
            `select * from transacoes where id = $1`, [id]
        )

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada!' })
        }

        if (rows[0].usuario_id != id_usuario) {
            return res.status(401).json({ mensagem: 'Transação de outro usuário!'})
        }

    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'})
    }

    next()
}

module.exports = {
    validarCamposUsuario,
    validarCadastroEmail,
    validarLoginUsuario,
    validarAtualizarEmail,
    validarCamposTransacao,
    validarTransacao
}

