package com.cadastroaluno.DB.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cadastroaluno.DB.Entity.ProfessorEntity;

@Repository
public interface ProfessorRepository extends JpaRepository<ProfessorEntity, Long> {

    ProfessorEntity findByNome(String nome);

    ProfessorEntity findByNomeAndId(String nome, Long id);


}
