package com.cadastroaluno.DB.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cadastroaluno.DB.Entity.AlunoEntity;
import java.util.List;

@Repository
public interface AlunoRepository extends JpaRepository<AlunoEntity, Long> {

    AlunoEntity findByNome(String nome);

    AlunoEntity findByNomeAndMatricula(String nome, String matricula);

    public AlunoEntity findByMatricula(String matricula);

    public void deleteByMatricula(String matricula);

}
