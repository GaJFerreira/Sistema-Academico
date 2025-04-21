package com.cadastroaluno.DB.Repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cadastroaluno.DB.Entity.DisciplinaEntity;

@Repository
public interface DisciplinaRepository extends JpaRepository<DisciplinaEntity, Long>  {

    DisciplinaEntity findByNome(String nome);

    List<DisciplinaEntity> findAll();


}
