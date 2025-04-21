package com.cadastroaluno.Controller;

import com.cadastroaluno.DB.Entity.DisciplinaEntity;
import com.cadastroaluno.DB.Entity.ProfessorEntity;
import com.cadastroaluno.DB.Service.DisciplinaService;
import com.cadastroaluno.DB.Service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public List<ProfessorEntity> listar() {

        return professorService.listar();
    }

    @PostMapping
    public ProfessorEntity cadastrar(@RequestBody ProfessorEntity professor) {
        return professorService.salvar(professor);
    }

    @PutMapping("/{id}")
    public ProfessorEntity atualizar(@PathVariable Long id, @org.jetbrains.annotations.NotNull @RequestBody ProfessorEntity professor) {
        professor.setId(id);
        return professorService.salvar(professor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {

        professorService.deletar(id);
    }
}
