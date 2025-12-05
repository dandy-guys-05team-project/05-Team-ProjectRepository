package com.example.demo.detailedoverview;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DetailedOverviewPageController {

    @GetMapping("/detailed-overview")
    public String showDetailedOverviewPage(@RequestParam(value = "year", required = false) String year) {
        // year 파라미터는 클라이언트 사이드에서 JavaScript로 처리
        // 서버에서는 단순히 페이지만 반환
        return "redirect:/DetailedOverviewPage/index.html" +
               (year != null ? "?year=" + year : "");
    }
    
}
