package com.cadastroaluno.DB.Entity;

import org.springframework.jmx.export.annotation.ManagedResource;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class DisciplinaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String nome;
    private int cargaHoraria;
    private int periodo;
    private String areaDeEstudo;

    public DisciplinaEntity(){}

    public DisciplinaEntity(String nome, int periodo, int cargaHoraria, String areaDeEstudo){
        this.nome = nome;
        this.periodo = periodo;
        this.cargaHoraria = cargaHoraria;
        this.areaDeEstudo = areaDeEstudo;
    }

    /**
     * @return String return the nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * @return int return the cargaHoraria
     */
    public int getCargaHoraria() {
        return cargaHoraria;
    }

    /**
     * @param cargaHoraria the cargaHoraria to set
     */
    public void setCargaHoraria(int cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    /**
     * @return int return the periodo
     */
    public int getPeriodo() {
        return periodo;
    }

    /**
     * @param periodo the periodo to set
     */
    public void setPeriodo(int periodo) {
        this.periodo = periodo;
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
     * @return String return the areaDeEstudo
     */
    public String getAreaDeEstudo() {
        return areaDeEstudo;
    }

    /**
     * @param areaDeEstudo the areaDeEstudo to set
     */
    public void setAreaDeEstudo(String areaDeEstudo) {
        this.areaDeEstudo = areaDeEstudo;
    }

}
