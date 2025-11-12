package com.example.demo.meme;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemeDataRepository extends JpaRepository<MemeData, Long> {
    List<MemeData> findByYearCategory(String yearCategory);
}