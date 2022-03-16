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
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer noticeId;
    private String userUid;
    private String category;
    private String title;
    private String content;
    private String createTime;
    private int updateState;
    private String updateTime;
    private int hit;

    @JsonManagedReference
    @OneToMany(mappedBy = "notice") //양방향 매핑을 위해 연관 관계의 주인을 mappedBy로 지정
    private List<FileNotice> files = new ArrayList<>();

    @Builder
    public Notice(String userUid, String category, String title, String content) {
        this.userUid = userUid;
        this.category = category;
        this.title = title;
        this.content = content;
    }
}
