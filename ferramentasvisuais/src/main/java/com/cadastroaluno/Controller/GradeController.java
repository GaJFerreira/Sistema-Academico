package com.cadastroaluno.Controller;

import com.cadastroaluno.DB.Entity.AlunoEntity;
import com.cadastroaluno.DB.Entity.GradeEntity;
import com.cadastroaluno.DB.Service.AlunoService;
import com.cadastroaluno.DB.Service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/api/grades")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @Autowired AlunoService alunoService;

    @GetMapping
    public List<GradeEntity> listarTodas() {
        return gradeService.listarTodas();
    }

    /*@GetMapping("/aluno/{idAluno}")
    public List<GradeEntity> listarAlunoID(@PathVariable Long idAluno) {
        return gradeService.listarPorAlunoId(idAluno);
    }*/

    @PostMapping
    public GradeEntity cadastrar(@RequestBody GradeEntity grade) {
        return gradeService.salvar(grade);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        gradeService.deletar(id);
    }

    @GetMapping("/aluno/{matricula}")
    public List<GradeEntity> listarPorAluno(@PathVariable String matricula) {
        try {
            // Busque o aluno pela matrícula
            AlunoEntity aluno = alunoService.findByMatricula(matricula);
            
            // Se o aluno não for encontrado, lance um erro 404
            if (aluno == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado");
            }

            // Busque as grades associadas a esse aluno
            return gradeService.listarPorAlunoId(aluno.getId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar grades do aluno", e);
        }
    }

    
}
