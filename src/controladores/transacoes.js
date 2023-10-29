const pool = require('../conexao')

const cadastrarTransacaoUsuarioLogado = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo} = req.body
    const { id } = req.usuario

    try {
        const { rows: id_transacao } = await pool.query(
            `insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo)
            values ($1, $2, $3, $4, $5, $6) returning id`,
            [descricao, valor, data, categoria_id, id, tipo]
        )

        const { rows: categoria_nome } = await pool.query(
            `select descricao from categorias where id = $1`, [categoria_id]
        )

        const transacao = {
                id: id_transacao[0].id,
                tipo,
                descricao,
                valor,
                data,
                usuario_id: id,
                categoria_id,
                categoria_nome: categoria_nome[0].descricao
            }
            
        return res.status(201).json(transacao)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

const listarTransacoesUsuarioLogado = async (req, res) => {
    const { id } = req.usuario
    const { filtro } = req.query
    let resultado = []

    try {
        const { rows } = await pool.query(
            `select c.descricao as categoria_nome,
            t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id
            from transacoes t left join categorias c
            on t.categoria_id = c.id
            where t.usuario_id = $1`, [id]
        )
    
        if (filtro != undefined) {
            for (let item of filtro) {
                rows.map(transacao => {
                    if (transacao.categoria_nome == item) {
                        resultado.push(transacao)
                    }
                })
            }
            
            const transacoes = resultado.map(transacao => {
                return  {
                    id: transacao.id,
                    tipo: transacao.tipo,
                    descricao: transacao.descricao,
                    valor: transacao.valor,
                    data: transacao.data,
                    usuario_id: transacao.usuario_id,
                    categoria_id: transacao.categoria_id,
                    categoria_nome: transacao.categoria_nome
                }
            })
    
            return res.status(200).json(transacoes)
        }

        const transacoes = rows.map(transacao => {
            return  {
                id: transacao.id,
                tipo: transacao.tipo,
                descricao: transacao.descricao,
                valor: transacao.valor,
                data: transacao.data,
                usuario_id: transacao.usuario_id,
                categoria_id: transacao.categoria_id,
                categoria_nome: transacao.categoria_nome
            }
        })

        return res.status(200).json(transacoes)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

const detalharTransacaoUsuarioLogado = async (req, res) => {
    const { id } = req.params

    try {
        const { rows } = await pool.query(
            `select c.descricao as categoria_nome,
            t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id
            from transacoes t left join categorias c
            on t.categoria_id = c.id
            where t.id = $1`, [id]
        )
        
        const transacoes = rows.map(transacao => {
            return  {
                id: transacao.id,
                tipo: transacao.tipo,
                descricao: transacao.descricao,
                valor: transacao.valor,
                data: transacao.data,
                usuario_id: transacao.usuario_id,
                categoria_id: transacao.categoria_id,
                categoria_nome: transacao.categoria_nome
            }
        })

        return res.status(200).json(transacoes)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

const atualizarTransacaoUsuarioLogado = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { id } = req.params

    try {
        await pool.query(
            `update transacoes
            set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6`,
            [descricao, valor, data, categoria_id, tipo, id]
        )

        return res.json()        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

const excluirTransacaoUsuarioLogado = async (req, res) => {
    const { id } = req.params

    try {
        await pool.query(
            `delete from transacoes where id = $1`, [id]
        )
    
        return res.json()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

const extratoTransacoesUsuarioLogado = async (req, res) => {
    const { id } = req.usuario

    try {
        const { rows } = await pool.query(
            `select tipo, sum(valor) as total from transacoes where usuario_id = $1 group by tipo`, [id]
        )
    
        const entrada = rows[0].total
        const saida = rows[1].total
    
        const extrato = {
            entrada,
            saida
        }
    
        return res.status(200).json(extrato)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

module.exports = {
    cadastrarTransacaoUsuarioLogado,
    listarTransacoesUsuarioLogado,
    detalharTransacaoUsuarioLogado,
    atualizarTransacaoUsuarioLogado,
    excluirTransacaoUsuarioLogado,
    extratoTransacoesUsuarioLogado
}