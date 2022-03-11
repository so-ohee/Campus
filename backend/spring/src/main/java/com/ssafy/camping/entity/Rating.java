package com.ssafy.camping.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ratingId;
    private Integer reviewId;
    private int environment;
    private int facility;
    private int service;

    @Builder
    public Rating(Integer reviewId, int environment, int facility, int service) {
        this.reviewId = reviewId;
        this.environment = environment;
        this.facility = facility;
        this.service = service;
    }
}
