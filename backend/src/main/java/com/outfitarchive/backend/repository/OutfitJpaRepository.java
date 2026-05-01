package com.outfitarchive.backend.repository;

import com.outfitarchive.backend.domain.OutfitEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutfitJpaRepository extends JpaRepository<OutfitEntity, Long> {
}
