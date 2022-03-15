package com.ssafy.camping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ratingId;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "review_id")
    private Review review;

    private int environment;
    private int facility;
    private int service;

    @Builder
    public Rating(Review review, int environment, int facility, int service) {
        this.review = review;
        this.environment = environment;
        this.facility = facility;
        this.service = service;
    }
}
