package com.example.demo.landing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LandingPageController {

    @GetMapping("/")
    public String showLandingPage() {
        return "redirect:/LandingPage/index.html";
    }

    @GetMapping("/landing")
    public String landingPath() {
        return "redirect:/LandingPage/index.html";
    }
}

