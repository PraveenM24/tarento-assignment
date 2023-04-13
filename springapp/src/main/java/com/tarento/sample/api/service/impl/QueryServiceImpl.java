package com.tarento.sample.api.service.impl;

import com.tarento.sample.api.dto.QueryRequestDTO;
import com.tarento.sample.api.service.QueryService;
import com.tarento.sample.api.utils.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class QueryServiceImpl implements QueryService {

    Logger logger = LoggerFactory.getLogger(QueryServiceImpl.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public ResponseEntity<?> executeQuery(QueryRequestDTO queryRequestDTO) {
        try {

            String query = queryRequestDTO.getQuery();

            if (query.toLowerCase().startsWith(Constants.SELECT_QUERY)) {
                logger.debug("Executing DQL Command");
                List<Map<String, Object>> result = jdbcTemplate.queryForList(query);
                return ResponseEntity.ok(result);
            } else {
                logger.debug("Executing DDL/DML Command");
                int result = jdbcTemplate.update(query);
                return ResponseEntity.ok(result);
            }

        } catch (Exception e) {
            logger.error("Error executing SQL query: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error executing SQL query: " + e.getMessage());
        }
    }
}
