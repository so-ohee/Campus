package com.ssafy.camping.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class User {
    @Id
    private String userUid;
    private int userState;

    @Builder
    public User(String userUid) {
        this.userUid = userUid;
    }
}
