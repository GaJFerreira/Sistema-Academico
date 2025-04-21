package com.cadastroaluno.DB.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cadastroaluno.DB.Entity.SalaEntity;

@Repository
public interface SalaRepository extends JpaRepository<SalaEntity, Long> {
    
    SalaEntity findByAreaAndBlocoAndNumero(int area, String bloco, int numero);

    List<SalaEntity> findAll();


}
