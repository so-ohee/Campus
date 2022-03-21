package com.ssafy.camping.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private Integer boardId;
    private String userUid;
    private String comment;
    private String createTime;
    private String updateTime;

    @Builder
    public Comment(Integer boardId, String userUid, String comment) {
        this.boardId = boardId;
        this.userUid = userUid;
        this.comment = comment;
    }
}
