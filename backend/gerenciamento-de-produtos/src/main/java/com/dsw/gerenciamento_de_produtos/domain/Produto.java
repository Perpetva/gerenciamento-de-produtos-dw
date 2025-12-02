package com.dsw.gerenciamento_de_produtos.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotNull(message = "Fabricante é obrigatório")
    @Column(nullable = false)
    private String fabricante;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior ou igual a 0.01")
    @Column(nullable = false)
    private BigDecimal preco;

    @NotNull(message = "Quantidade é obrigatória")
    @Min(value = 1, message = "Quantidade deve ser maior ou igual a 1")
    @Column(nullable = false)
    private Integer quantidade;

    @NotNull(message = "Descrição é obrigatória")
    @Size(min = 10, message = "Descrição deve ter no mínimo 10 caracteres")
    @Column(nullable = false)
    private String descricao;

    public Produto (String nome, String fabricante, BigDecimal preco, Integer quantidade, String descricao) {
        this.nome = nome;
        this.fabricante = fabricante;
        this.preco = preco;
        this.quantidade = quantidade;
        this.descricao = descricao;
    }

    public Produto() {

    }
}
