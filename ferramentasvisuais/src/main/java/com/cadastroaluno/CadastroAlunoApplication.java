package com.cadastroaluno;

import com.cadastroaluno.DB.Repository.DisciplinaRepository;

import javax.swing.SwingUtilities;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cadastroaluno.DB.Entity.AlunoEntity;
import com.cadastroaluno.DB.Entity.DisciplinaEntity;
import com.cadastroaluno.DB.Repository.AlunoRepository;

@SpringBootApplication
public class CadastroAlunoApplication {
    public static void main(String[] args) {
        System.setProperty("java.awt.headless", "false");

        var context = SpringApplication.run(CadastroAlunoApplication.class, args);

       /* SwingUtilities.invokeLater(() -> {
            TelaInicialDB tela = context.getBean(TelaInicialDB.class);
            tela.setVisible(true);
        }); */
        
    }
}
