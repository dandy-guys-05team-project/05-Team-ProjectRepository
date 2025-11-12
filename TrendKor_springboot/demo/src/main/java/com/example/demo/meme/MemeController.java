package com.example.demo.meme;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/memes")
public class MemeController {
    private final MemeService memeService;

    public MemeController(MemeService memeService){
        this.memeService = memeService;
    }

    @GetMapping("/{year}")
    public List<MemeData> getMemesByYear(@PathVariable("year") String year){
        return memeService.getMemesByYear(year);
    }

    //@PostMapping
    //public MemeData createMeme(@RequestBody MemeData memeData){
    //    return memeService.saveMeme(memeData);
    //}
}
