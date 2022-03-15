package com.ssafy.camping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class FileReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;
    private String filePath;

    @Builder
    public FileReview(Review review, String filePath) {
        this.review = review;
        this.filePath = filePath;
    }
}
