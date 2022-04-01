package com.ssafy.camping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class FileCamping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileId;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "camping_id")
    private Camping camping;
    private String filePath;
}
