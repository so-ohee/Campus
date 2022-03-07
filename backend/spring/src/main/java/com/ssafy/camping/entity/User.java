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
    private String userName;
    private int userState;
    private String userProfile;

    @Builder
    public User(String userUid, String userName, String userProfile) {
        this.userUid = userUid;
        this.userName = userName;
        this.userProfile = userProfile;
    }
}
