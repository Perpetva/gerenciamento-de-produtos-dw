"use client";
import React, { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/services/api"
import Nomes from "@/components/Nomes"
import ExcluirPopUp from "@/components/ExcluirPopUp"

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [mensagemErro, setMensagemErro] = useState("")
  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null)

  useEffect(() => {
    api.get("/produtos")
      .then((resposta) => {
        setProdutos(resposta.data)
      })
  }, [])

  const excluirProduto = async (id: number) => {
    try {
      await api.delete(`/produtos/${id}`)
      setProdutos((listaAtual: any) => listaAtual.filter((produto: any) => produto.id !== id))

    } catch (erro) {
      setMensagemErro("Não foi possível excluir o produto.")
    }
  }

  const abrirConfirmacao = (produto: any) => {
    setProdutoSelecionado(produto)
    setMostrarPopup(true)
  }

  const cancelarExclusao = () => {
    setMostrarPopup(false)
    setProdutoSelecionado(null)
  }

  const confirmarExclusao = async () => {
    if (!produtoSelecionado) return

    await excluirProduto(produtoSelecionado.id)

    setMostrarPopup(false)
    setProdutoSelecionado(null)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center px-4 py-10">
      <header className="w-full max-w-3xl text-center py-4">
        <h1 className="text-3xl font-semibold uppercase">Gerenciamento de Produtos</h1>
      </header>

      <main className="w-full max-w-3xl space-y-6">
        {mensagemErro && <p className="text-red-600 text-center">{mensagemErro}</p>}

        {!mensagemErro && produtos.length === 0 && (
          <p className="text-center text-gray-600">Nenhum produto cadastrado.</p>
        )}

        {!mensagemErro && produtos.length > 0 && (
          <div className="space-y-4">
            {produtos.map((produto: any) => (
              <div key={produto.id} className="border border-gray-400 bg-gray-100 p-4">
                <header className="space-y-1">
                  <h2 className="text-xl font-semibold">{produto.nome}</h2>
                  <p><span className="font-semibold">Fabricante:</span> {produto.fabricante}</p>
                  <p><span className="font-semibold">Preço:</span> R$ {Number(produto.preco).toFixed(2)}</p>
                  <p><span className="font-semibold">Quantidade:</span> {produto.quantidade}</p>
                  <p><span className="font-semibold">Descrição:</span> {produto.descricao || "Sem descrição."}</p>
                </header>

                {Number(produto.quantidade) <= 3 && (
                  <span className="mt-3 inline-block bg-orange-400 px-3 py-1 text-sm font-semibold text-white">
                    Estoque baixo
                  </span>
                )}

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/alterar/${produto.id}`}
                    className="rounded bg-blue-500 px-5 py-2 text-white font-medium cursor-pointer"
                  >
                    Alterar
                  </Link>
                  <button
                    onClick={() => abrirConfirmacao(produto)}
                    className="rounded bg-red-600 px-5 py-2 text-white font-medium cursor-pointer"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 text-center">
          <Link
            href="/cadastro"
            className="inline-block rounded bg-blue-500 px-6 py-2 text-white font-medium cursor-pointer"
          >
            Incluir novo produto
          </Link>
        </div>
      </main>

      <footer className="mt-auto w-full max-w-3xl py-4 text-center">
        <Nomes />
      </footer>

      <ExcluirPopUp
        isOpen={mostrarPopup}
        onCancel={cancelarExclusao}
        onConfirm={confirmarExclusao}
        title="Excluir produto"
        message={
          produtoSelecionado
            ? `Deseja escluir o produto de Id ${produtoSelecionado.id}?`
            : "Tem certeza que deseja excluir este produto?"
        }
      />
    </div>
  )
}
