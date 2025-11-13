package com.example.demo.meme;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MemeData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String yearCategory;
    private String title_kor;
    private String title_eng;
    @Column(length=1000)
    private String derivedFrom_kor;
    @Column(length=1000)
    private String derivedFrom_eng;
    @Column(length=1000)
    private String meaning_kor;
    @Column(length=1000)
    private String meaning_eng;
    @Column(length=1000)
    private String example_kor;
    @Column(length=1000)
    private String example_eng;
    @Column(length=1000)
    private String imagePath;

    public MemeData(){}

    public MemeData(String yearCategory,
                    String title_kor, 
                    String title_eng, 
                    String derivedFrom_kor,
                    String derivedFrom_eng,
                    String meaning_kor,
                    String meaning_eng,
                    String example_kor,
                    String example_eng,
                    String imagePath){
                        this.yearCategory = yearCategory;
                        this.title_kor = title_kor;
                        this.title_eng = title_eng;
                        this.derivedFrom_kor = derivedFrom_kor;
                        this.derivedFrom_eng = derivedFrom_eng;
                        this.meaning_kor = meaning_kor;
                        this.meaning_eng = meaning_eng;
                        this.example_kor = example_kor;
                        this.example_eng = example_eng;
                        this.imagePath = imagePath;
                    }
}
