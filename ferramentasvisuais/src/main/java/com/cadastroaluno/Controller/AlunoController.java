package com.cadastroaluno.Controller;

import com.cadastroaluno.DB.Entity.AlunoEntity;
import com.cadastroaluno.DB.Service.AlunoService;

import org.apache.logging.log4j.message.StringFormattedMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;



@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public List<AlunoEntity> listar(){

        return alunoService.listar();
    }

    @GetMapping("/{matricula}")
    public AlunoEntity buscAlunoMatricula(@PathVariable String matricula) {
        AlunoEntity aluno = alunoService.findByMatricula(matricula);
        if (aluno == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado");
        }
        return aluno;
    }

    @PostMapping
    public AlunoEntity cadastrar(@RequestBody AlunoEntity aluno){
        return alunoService.salvar(aluno);
    }

@PutMapping("/{id}")
public AlunoEntity atualizar(@PathVariable Long id, @RequestBody AlunoEntity aluno) {
    aluno.setId(id); // garante que o ID do aluno não seja sobrescrito por engano

    // Adiciona a referência reversa: cada grade deve ter o aluno setado
    if (aluno.getGrade() != null) {
        aluno.getGrade().forEach(g -> g.setAluno(aluno));
    }

    return alunoService.salvar(aluno);
}


    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        alunoService.deletar(id);
    }

    @GetMapping("/login/{nome}/{matricula}")
    public AlunoEntity login(@PathVariable String nome, @PathVariable String matricula) {
        return alunoService.login(nome, matricula);
    }
    

}
