package com.ssafy.camping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class FileNotice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "notice_id")
    private Notice notice;
    private String filePath;

    @Builder
    public FileNotice(Notice notice, String filePath) {
        this.notice = notice;
        this.filePath = filePath;
    }
}
