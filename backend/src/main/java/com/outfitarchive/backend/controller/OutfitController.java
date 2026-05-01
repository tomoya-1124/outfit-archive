package com.outfitarchive.backend.controller;

import com.outfitarchive.backend.domain.OutfitEntity;
import com.outfitarchive.backend.repository.OutfitJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outfits")
@CrossOrigin(origins = "*")
public class OutfitController {
    private final OutfitJpaRepository repository;

    public OutfitController(OutfitJpaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<OutfitEntity> list() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public OutfitEntity get(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Outfit not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OutfitEntity create(@RequestBody OutfitEntity body) {
        body.setId(null);
        return repository.save(body);
    }
}
