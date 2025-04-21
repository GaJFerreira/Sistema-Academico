package com.cadastroaluno.DB.Service;

import java.util.List;

import org.hibernate.tuple.IdentifierProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cadastroaluno.DB.Entity.AlunoEntity;
import com.cadastroaluno.DB.Entity.GradeEntity;
import com.cadastroaluno.DB.Repository.GradeRepository;

@Service
public class GradeService {
    
    private final GradeRepository gradeRepository;

    @Autowired
    public GradeService(GradeRepository gradeRepository){

        this.gradeRepository = gradeRepository;
    }

    public GradeEntity salvar(GradeEntity gradeEntity){

        return gradeRepository.save(gradeEntity);
    }

    public List<GradeEntity> listarTodas(){
        return gradeRepository.findAll();
    }

    public List<GradeEntity> listarPorAlunoId(Long IDAluno){
        return gradeRepository.findByAlunoId(IDAluno);
    }
    
    public List<GradeEntity> listarPorAluno(AlunoEntity alunoEntity){
        return gradeRepository.findByAluno(alunoEntity);
    }
    

    public void deletar(Long id){
        gradeRepository.deleteById(id);
    }
}
