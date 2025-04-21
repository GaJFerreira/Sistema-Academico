package com.cadastroaluno.DB.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cadastroaluno.DB.Entity.ProfessorEntity;
import com.cadastroaluno.DB.Repository.ProfessorRepository;

@Service
public class ProfessorService {
    
    private final ProfessorRepository professorRepository;

    @Autowired
    public ProfessorService(ProfessorRepository professorRepository){

        this.professorRepository = professorRepository;
    }

    public ProfessorEntity login(String nome, Long id){

        return professorRepository.findByNomeAndId(nome, id);
    }
    
    public ProfessorEntity salvar(ProfessorEntity professor){

        return professorRepository.save(professor);
    }

    public List<ProfessorEntity> listar(){

        return professorRepository.findAll();
    }

    public void deletar(long id) {

        professorRepository.deleteById(id);
    }
}
