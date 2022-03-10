package com.ssafy.camping.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Visit {
    @Id
    private Integer visitId;
    private String userUid;
    private Integer campingId;
}
