package com.example.service;

import com.example.model.Filme;
import com.example.repository.FilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmeService {

    @Autowired
    private FilmeRepository filmeRepository;

    public List<Filme> listarTodos() {
        return filmeRepository.findAll();
    }

    public Optional<Filme> buscarPorId(Long id) {
        return filmeRepository.findById(id);
    }

    public Filme salvar(Filme filme) {
        return filmeRepository.save(filme);
    }

    public Filme atualizarFilme(Long id, Filme filmeDetalhes) {
        return filmeRepository.findById(id)
                .map(filme -> {
                    filme.setTitulo(filmeDetalhes.getTitulo());
                    filme.setDiretor(filmeDetalhes.getDiretor());
                    filme.setAnoLancamento(filmeDetalhes.getAnoLancamento());
                    filme.setGenero(filmeDetalhes.getGenero());
                    filme.setDuracaoMinutos(filmeDetalhes.getDuracaoMinutos());
                    filme.setSinopse(filmeDetalhes.getSinopse());
                    return filmeRepository.save(filme);
                }).orElseGet(() -> {
                    filmeDetalhes.setId(id);
                    return filmeRepository.save(filmeDetalhes);
                });
    }

    public void excluir(Long id) {
        filmeRepository.deleteById(id);
    }
}