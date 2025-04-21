package com.cadastroaluno.DB.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cadastroaluno.DB.Entity.DisciplinaEntity;
import com.cadastroaluno.DB.Repository.DisciplinaRepository;

import java.util.*;
@Service
public class DisciplinaService {
    
    private final DisciplinaRepository disciplinaRepository;

    @Autowired
    public DisciplinaService(DisciplinaRepository disciplinaRepository){
        this.disciplinaRepository = disciplinaRepository;
    }

    public DisciplinaEntity salvar(DisciplinaEntity disciplina){

        return disciplinaRepository.save(disciplina);
    }

    public List<DisciplinaEntity> listar(){

        return disciplinaRepository.findAll();
    }

    public void deletar(long id){

        disciplinaRepository.deleteById(id);
    }

}
