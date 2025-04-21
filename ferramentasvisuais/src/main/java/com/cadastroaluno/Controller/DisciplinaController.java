package com.cadastroaluno.Controller;

import com.cadastroaluno.DB.Entity.DisciplinaEntity;
import com.cadastroaluno.DB.Service.DisciplinaService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/disciplinas")
public class DisciplinaController {

    @Autowired
    private DisciplinaService disciplinaService;

    @GetMapping
    public List<DisciplinaEntity> listar() {

        return disciplinaService.listar();
    }

    @PostMapping
    public DisciplinaEntity cadastrar(@RequestBody DisciplinaEntity disciplina) {
        return disciplinaService.salvar(disciplina);
    }

    @PutMapping("/{id}")
    public DisciplinaEntity atualizar(@PathVariable Long id, @RequestBody @NotNull DisciplinaEntity novaDisciplina) {
        novaDisciplina.setId(id);
        return disciplinaService.salvar(novaDisciplina);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {

        disciplinaService.deletar(id);
    }
}
