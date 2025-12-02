"use client";
import React, { FormEvent, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import api from "@/services/api"
import Nomes from "@/components/Nomes"

type Produto = {
    id: number
    nome: string
    fabricante: string
    preco: number
    quantidade: number
    descricao: string
}

export default function AlterarProdutoPage() {
    const params = useParams()
    const router = useRouter()
    const produtoId = params?.id as string | undefined

    const [produto, setProduto] = useState<Produto | null>(null)
    const [nome, setNome] = useState("")
    const [fabricante, setFabricante] = useState("")
    const [preco, setPreco] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [descricao, setDescricao] = useState("")
    const [mensagemErro, setMensagemErro] = useState("")
    const [mensagemSucesso, setMensagemSucesso] = useState("")

    useEffect(() => {
        const carregarProduto = async () => {
            if (!produtoId) return

            try {
                const resposta = await api.get<Produto>(`/produtos/${produtoId}`)
                const dados = resposta.data
                setProduto(dados)
                setNome(dados.nome)
                setFabricante(dados.fabricante)
                setPreco(String(dados.preco))
                setQuantidade(String(dados.quantidade))
                setDescricao(dados.descricao)
                setMensagemErro("")

            } catch (erro) {
                setMensagemErro("Não foi possível carregar os dados do produto.")
            }
        }

        carregarProduto()
    }, [produtoId])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!nome || !fabricante || !preco || !quantidade) {
            setMensagemErro("Preencha todos os campos obrigatórios.")
            return
        }

        if (descricao.trim().length < 10) {
            setMensagemErro("A descrição precisa ter pelo menos 10 caracteres.")
            return
        }

        if (Number(preco) <= 0 || Number(quantidade) <= 0) {
            setMensagemErro("Preço e quantidade devem ser maiores que zero.")
            return
        }

        try {
            await api.put(`/produtos/${produtoId}`, {
                nome,
                fabricante,
                preco: Number(preco),
                quantidade: Number(quantidade),
                descricao,
            })

            setMensagemSucesso("Produto atualizado com sucesso!")

            setTimeout(() => {
                router.push("/")
            }, 2000)

        } catch (erro) {
            setMensagemErro("Não foi possível salvar as alterações.")
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center px-4 py-10">
            <header className="w-full max-w-3xl text-center py-4">
                <h1 className="text-3xl font-semibold uppercase">Gerenciamento de Produtos</h1>
            </header>

            <main className="w-full max-w-3xl space-y-6">
                <h2 className="text-xl font-semibold">Alterar produto</h2>

                {!produto && !mensagemErro && (
                    <p className="text-center text-gray-600">Carregando...</p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="nome">
                            Produto
                        </label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="rounded border border-gray-400 px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="fabricante">
                            Fabricante
                        </label>
                        <input
                            id="fabricante"
                            type="text"
                            value={fabricante}
                            onChange={(e) => setFabricante(e.target.value)}
                            className="rounded border border-gray-400 px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold" htmlFor="preco">
                                Preço
                            </label>
                            <input
                                id="preco"
                                type="number"
                                step="0.01"
                                min="0"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                className="rounded border border-gray-400 px-3 py-2"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold" htmlFor="quantidade">
                                Quantidade em estoque
                            </label>
                            <input
                                id="quantidade"
                                type="number"
                                min="0"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                className="rounded border border-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="descricao">
                            Descrição do produto
                        </label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="min-h-[120px] rounded border border-gray-400 px-3 py-2"
                        />
                    </div>

                    {mensagemErro && <p className="text-sm text-red-600">{mensagemErro}</p>}
                    {mensagemSucesso && (
                        <div className="rounded border border-green-400 bg-green-50 px-3 py-2 text-sm text-green-700">
                            {mensagemSucesso}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <button className="rounded bg-blue-500 px-6 py-2 text-white font-medium cursor-pointer">
                            Salvar alterações
                        </button>
                    </div>
                </form>
            </main>

            <footer className="mt-auto w-full max-w-3xl py-4 text-center">
                <Nomes />
            </footer>
        </div>
    )
}
