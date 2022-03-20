package com.ssafy.camping.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class Survey {
    @Id
    private String userUid;
}
