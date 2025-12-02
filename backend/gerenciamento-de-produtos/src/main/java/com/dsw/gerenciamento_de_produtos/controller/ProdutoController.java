package com.dsw.gerenciamento_de_produtos.controller;

import com.dsw.gerenciamento_de_produtos.domain.Produto;
import com.dsw.gerenciamento_de_produtos.repository.ProdutoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping
    public Produto criarProduto(@RequestBody @Valid Produto produto) {
        return produtoRepository.save(produto);
    }

    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Produto editarProduto(@PathVariable Long id, @RequestBody @Valid Produto produto) {
        Optional<Produto> produtoAtual = produtoRepository.findById(id);

        if (produtoAtual.isPresent()) {
            Produto p = produtoAtual.get();

            p.setNome(produto.getNome());
            p.setFabricante(produto.getFabricante());
            p.setPreco(produto.getPreco());
            p.setQuantidade(produto.getQuantidade());
            p.setDescricao(produto.getDescricao());

            return produtoRepository.save(p);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
    }
}
