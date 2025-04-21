package com.cadastroaluno.DB.Entity;

import java.util.Random;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ProfessorEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String nome;
    //private int matricula;
    private String formacao;
    private String especializacao;

    public ProfessorEntity(){}

    public ProfessorEntity(String nome, String formacao, String expecializacao){
        this.nome = nome;
        this.formacao = formacao;
        this.especializacao = especializacao;
    }

    /**
     * @return String return the nome
     */
    public String getNomeP() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * @return String return the formacao
     */
    public String getFormacao() {
        return formacao;
    }

    /**
     * @param formacao the formacao to set
     */
    public void setFormacao(String formacao) {
        this.formacao = formacao;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEspecializacao(String especializacao) {
        this.especializacao = especializacao;
    }


    public Long getId() {
        return id;
    }

    public String getEspecializacao() {
        return especializacao;
    }

    public String getNome() {
        return nome;
    }


}
