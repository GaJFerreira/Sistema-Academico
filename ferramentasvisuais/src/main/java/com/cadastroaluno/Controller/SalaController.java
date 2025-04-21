package com.cadastroaluno.Controller;

import com.cadastroaluno.DB.Entity.SalaEntity;
import com.cadastroaluno.DB.Service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salas")
public class SalaController {

    @Autowired
    private SalaService salaService;

    @GetMapping
    public List<SalaEntity> listar(){

        return salaService.listar();
    }

    @PostMapping
    public SalaEntity cadastrar(@RequestBody SalaEntity sala){
        return salaService.salvar(sala);
    }

    @PutMapping("/{id}")
    public SalaEntity atualizar(@PathVariable Long id, @RequestBody SalaEntity sala){
        return salaService.salvar(sala);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        salaService.deletar(id);
    }

}
