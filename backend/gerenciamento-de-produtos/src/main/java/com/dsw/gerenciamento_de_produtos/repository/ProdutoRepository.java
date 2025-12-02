package com.dsw.gerenciamento_de_produtos.repository;

import com.dsw.gerenciamento_de_produtos.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
