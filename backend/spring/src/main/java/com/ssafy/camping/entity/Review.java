package com.ssafy.camping.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;
    private String userUid;
    private Integer campingId;
    private String title;
    private String content;
    private String createTime;
    private int updateState;
    private String updateTime;
    private int deleteState;
    private int hit;

    @JsonManagedReference
    @OneToMany(mappedBy = "review") //양방향 매핑을 위해 연관 관계의 주인을 mappedBy로 지정
    private List<FileReview> files = new ArrayList<>();

    @JsonManagedReference
    @OneToOne(mappedBy = "review")
    private Rating rating;

    @Builder
    public Review(String userUid, Integer campingId, String title, String content) {
        this.userUid = userUid;
        this.campingId = campingId;
        this.title = title;
        this.content = content;
    }
}

