package com.example.service;

import com.example.model.Filme;
import com.example.repository.FilmeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmeService {

    private final FilmeRepository filmeRepository;

    public FilmeService(FilmeRepository filmeRepository) {
        this.filmeRepository = filmeRepository;
    }

    public Filme salvarFilme(Filme filme) {
        return filmeRepository.save(filme); 
    }

    public List<Filme> listarTodos() {
        return filmeRepository.findAll(); 
    }

    public Optional<Filme> buscarPorId(Long id) {
        return filmeRepository.findById(id); 
    }
    
    public void excluirFilme(Long id) {
        filmeRepository.deleteById(id);
    }

    public Filme atualizarFilme(Long id, Filme filmeDetalhes) {
        Filme filmeExistente = filmeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Filme não encontrado com ID: " + id));

        filmeExistente.setTitulo(filmeDetalhes.getTitulo());
        filmeExistente.setDiretor(filmeDetalhes.getDiretor());
        filmeExistente.setAnoLancamento(filmeDetalhes.getAnoLancamento());
        filmeExistente.setGenero(filmeDetalhes.getGenero());
        filmeExistente.setDuracaoMinutos(filmeDetalhes.getDuracaoMinutos());
        filmeExistente.setSinopse(filmeDetalhes.getSinopse());

        return filmeRepository.save(filmeExistente);
    }
}