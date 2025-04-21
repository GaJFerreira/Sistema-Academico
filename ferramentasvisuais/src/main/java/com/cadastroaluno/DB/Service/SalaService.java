package com.cadastroaluno.DB.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cadastroaluno.DB.Entity.SalaEntity;
import com.cadastroaluno.DB.Repository.SalaRepository;

import java.util.*;

@Service
public class SalaService {
    
    private final SalaRepository salaRepository;

    @Autowired
    public SalaService(SalaRepository salaRepository){

        this.salaRepository = salaRepository;
    }

    public SalaEntity salvar(SalaEntity sala){

        return salaRepository.save(sala);
    }

    public List<SalaEntity> listar(){

        return salaRepository.findAll();
    }

    public void deletar(Long id) {

        salaRepository.deleteById(id);
    }
}
