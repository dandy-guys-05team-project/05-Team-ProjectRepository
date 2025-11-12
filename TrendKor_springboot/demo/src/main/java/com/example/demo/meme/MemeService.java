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
}