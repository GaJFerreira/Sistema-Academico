package com.cadastroaluno.DB.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class GradeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aluno_id")
    @JsonIgnore
    private AlunoEntity aluno;

    @ManyToOne(optional = false)
    @JoinColumn(name = "disciplina_id")
    private DisciplinaEntity disciplina;

    @ManyToOne(optional = false)
    @JoinColumn(name = "professor_id")
    private ProfessorEntity professor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sala_id")
    private SalaEntity sala;

    private String status;

    private GradeEntity(){}

    public GradeEntity(AlunoEntity aluno, DisciplinaEntity disciplina, ProfessorEntity professor, SalaEntity sala, String statu) {
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.professor = professor;
        this.sala = sala;
        this.status = status;

    }

    /**
     * @return Long return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return DisciplinaEntity return the disciplina
     */
    public DisciplinaEntity getDisciplina() {
        return disciplina;
    }

    /**
     * @param disciplina the disciplina to set
     */
    public void setDisciplina(DisciplinaEntity disciplina) {
        this.disciplina = disciplina;
    }

    /**
     * @return ProfessorEntity return the professor
     */
    public ProfessorEntity getProfessor() {
        return professor;
    }

    /**
     * @param professor the professor to set
     */
    public void setProfessor(ProfessorEntity professor) {
        this.professor = professor;
    }

    /**
     * @return SalaEntity return the sala
     */
    public SalaEntity getSala() {
        return sala;
    }

    /**
     * @param sala the sala to set
     */
    public void setSala(SalaEntity sala) {
        this.sala = sala;
    }


    /**
     * @return AlunoEntity return the aluno
     */
    public AlunoEntity getAluno() {
        return aluno;
    }

    /**
     * @param aluno the aluno to set
     */
    public void setAluno(AlunoEntity aluno) {
        this.aluno = aluno;
    }

    /**
     * @return String return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

}
