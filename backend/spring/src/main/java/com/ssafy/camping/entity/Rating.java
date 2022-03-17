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
    @JoinColumn(name = "board_id")
    private Board board;

    private int environment;
    private int facility;
    private int service;

    @Builder
    public Rating(Board board, int environment, int facility, int service) {
        this.board = board;
        this.environment = environment;
        this.facility = facility;
        this.service = service;
    }
}
