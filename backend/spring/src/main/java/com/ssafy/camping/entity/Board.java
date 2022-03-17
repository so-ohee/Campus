package com.ssafy.camping.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer boardId;
    private String userUid;
    private String category;
    private Integer campingId;
    private String title;
    private String content;
    private String createTime;
    private String updateTime;
    private int deleteState;
    private int hit;

    @JsonManagedReference
    @OneToMany(mappedBy = "board") //양방향 매핑을 위해 연관 관계의 주인을 mappedBy로 지정
    private List<FileBoard> files = new ArrayList<>();

    @JsonManagedReference
    @OneToOne(mappedBy = "board")
    private Rating rating;

    @Builder
    public Board(String userUid, String category, Integer campingId, String title, String content) {
        this.userUid = userUid;
        this.category = category;
        this.campingId = campingId;
        this.title = title;
        this.content = content;
    }
}

