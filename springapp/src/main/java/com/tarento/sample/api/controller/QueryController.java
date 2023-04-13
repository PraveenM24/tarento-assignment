package com.tarento.sample.api.controller;

import com.tarento.sample.api.dto.QueryRequestDTO;
import com.tarento.sample.api.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v/1")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @PostMapping
    public ResponseEntity<?> executeQuery(
            @RequestBody QueryRequestDTO queryRequestDTO
    ) {
        return queryService.executeQuery(queryRequestDTO);
    }

}
