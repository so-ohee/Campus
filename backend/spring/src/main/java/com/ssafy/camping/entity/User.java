package com.ssafy.camping.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {
    @Id
    private String userUid;
    private String name;
    private String profile;
    private int userState;

    @Builder
    public User(String userUid, String name) {
        this.userUid = userUid;
        this.name = name;
    }
}
