package com.cadastroaluno.DB.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cadastroaluno.DB.Entity.AlunoEntity;
import com.cadastroaluno.DB.Entity.GradeEntity;

@Repository
public interface GradeRepository extends JpaRepository<GradeEntity, Long>{

    List<GradeEntity> findByAlunoId(Long IDAluno);

    List<GradeEntity> findByAluno(AlunoEntity alunoEntity);


}
