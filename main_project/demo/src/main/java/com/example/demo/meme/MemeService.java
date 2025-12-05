package com.example.demo.meme;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MemeService {

    private final MemeDataRepository memeDataRepository;

    public MemeService(MemeDataRepository memeDataRepository) {
        this.memeDataRepository = memeDataRepository;
    }

    public List<MemeData> getMemesByYear(String year) {
        return memeDataRepository.findByYearCategory(year);
    }
    public MemeData saveMeme(@NonNull MemeData memeData) {
        return memeDataRepository.save(memeData);
    }
    
    public MemeData incrementViewCount(Long id) {
        MemeData memeData = memeDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meme not found with id: " + id));
        memeData.setViewCount(memeData.getViewCount() + 1);
        return memeDataRepository.save(memeData);
    }
    
    public MemeData getMemeById(Long id) {
        return memeDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meme not found with id: " + id));
    }
}