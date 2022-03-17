package com.ssafy.camping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class FileBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
    private String filePath;

    @Builder
    public FileBoard(Board board, String filePath) {
        this.board = board;
        this.filePath = filePath;
    }
}
