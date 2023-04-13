import "../styles/Home.css";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { executeQuery } from "../utils/ApiClient";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Home() {

    const [query, setQuery] = useState('');
    const [queryResult, setQueryResult] = useState('');
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = await executeQuery(query);
        if (typeof response === "boolean") {
            setShowErrorMessage(true);
            setLoading(false);
        } else {
            validateData(response);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
    };

    const validateData = (data) => {
        setColumns([]);
        setRows([]);
        setQueryResult([]);
        if (typeof data === 'object' && data !== null && data.length !== 0) {
            let _columns = [];
            let _rows = [];
            _columns.push({
                field: "id",
                headerName: "S.No.",
                width: 5
            })
            Object.getOwnPropertyNames(data[0]).forEach((prop) => {
                _columns.push({
                    field: prop,
                    headerName: prop.toUpperCase(),
                    width: 180
                });
                setColumns(_columns);
            })
            data.forEach((row, key) => {
                row.id = key + 1;
                _rows.push(row);
                setRows(_rows);
            })
        } else if (data.length === 0) {
            setQueryResult("No Data Available");
        } else {
            setQueryResult(data + " Row(s) affected");
        }
        setShowSuccessMessage(true);
        setLoading(false);
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <div className="container">
            {
                showSuccessMessage ? (
                    <Snackbar open={showSuccessMessage} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Query Execution Successfull!
                        </Alert>
                    </Snackbar>
                ) : (
                    <></>
                )
            }
            {
                showErrorMessage ? (
                    <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Query Execution Failed!
                        </Alert>
                    </Snackbar>
                ) : (
                    <></>
                )
            }
            <Typography variant="h2" gutterBottom className="header">
                SQL Client
            </Typography>
            <form onSubmit={handleSubmit} className="inputForm">
                <TextField
                    {... (showErrorMessage) ? { error: true } : {}}
                    id="queryBox"
                    name="queryBox"
                    label="Enter Query"
                    type="search"
                    variant="outlined"
                    className="inputBox"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Box sx={{ position: 'relative' }}>
                    <Button
                        variant="contained"
                        type="submit"
                        className="button"
                        endIcon={<PlayArrowIcon />}
                        disabled={loading}
                    >
                        Run
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </form>
            {
                (rows.length === 0 && queryResult.length === 0) ? (
                    <></>
                ) : (
                    <div className="resultTableContainer">
                        <h4>Query Result:</h4>
                        {
                            queryResult.length !== 0 ? (
                                <p>{queryResult}</p>
                            ) : (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    className="resultTable"
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    )

}