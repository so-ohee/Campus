package com.ssafy.camping.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer visitId;
    private String userUid;
    private Integer campingId;

    @Builder
    public Visit(String userUid, Integer campingId) {
        this.userUid = userUid;
        this.campingId = campingId;
    }
}
