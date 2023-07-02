package com.joetsumap.common.pageable.converter;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class PageRequestConverter {

    public static PageRequest offsetLimitAndNoSort(Pageable pageable) {
        var p = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()); // sortは無指定にする
        long offset = p.getOffset();
        int size = p.getPageSize();
        if (offset + size > 10000) {
            throw new RuntimeException("over offset limit. offset=" + offset + ", size=" + size);
        }
        return p;
    }
}