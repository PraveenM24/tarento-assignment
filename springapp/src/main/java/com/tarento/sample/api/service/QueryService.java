package com.tarento.sample.api.service;

import com.tarento.sample.api.dto.QueryRequestDTO;
import org.springframework.http.ResponseEntity;

public interface QueryService {

    ResponseEntity<?> executeQuery(QueryRequestDTO queryRequestDTO);

}
