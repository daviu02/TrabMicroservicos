package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data; 

@Entity 
@Data   
public class Filme {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    
    private String titulo;
    private String diretor;
    private Integer anoLancamento;
    private String genero;
    private String sinopse;
    private Integer duracaoMinutos;
    
}