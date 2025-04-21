package com.cadastroaluno.DB.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cadastroaluno.DB.Entity.AlunoEntity;
import com.cadastroaluno.DB.Repository.AlunoRepository;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    @Autowired
    public AlunoService(AlunoRepository alunoRepository) {

        this.alunoRepository = alunoRepository;
    }

    public AlunoEntity login(String nome, String matricula) {
        AlunoEntity aluno = alunoRepository.findByNomeAndMatricula(nome, matricula);
        return aluno;
    }

    public AlunoEntity salvar(AlunoEntity aluno) {
        return alunoRepository.save(aluno);
    }

    public List<AlunoEntity> listar() {
        return alunoRepository.findAll();
    }

    public void deletar(Long id) {
        alunoRepository.deleteById(id);
    }

    public AlunoEntity findByMatricula(String matricula) {
        return alunoRepository.findByMatricula(matricula);
    }
    

}
