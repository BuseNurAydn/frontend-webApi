
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Dialog, DialogActions, DialogContent, DialogContentText, Tooltip, Button, Grid } from '@mui/material';

import { IconButton } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
                  //props
const TaxList = ({ onDelete, onUpdate }) => {
  const [taxes, setTaxes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7274/api/taxdefinition')
      .then(response => {
        setTaxes(response.data);
      })
      .catch(error => console.error('API çağrısında hata oluştu:', error));
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(selectedId);
    }
    setOpen(false);
  };

  const handleEditClick = (id) => {
    navigate(`/add-update/${id}`);
  };

  return (
    <>
      <Paper sx={{ margin: 'spacing(2)', padding: 'spacing(2)' }}>
        <Grid container justifyContent="flex-end" >
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              sx={{
                mr: 8,
                mt: 2,
                borderRadius: 2,
                height: '30px',
              }}
              onClick={() => navigate('/add-update/0')}
            >
              Ekle
            </Button>
          </Grid>
          <Grid container paddingTop={5} paddingBottom={5}>
            <TableContainer >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Adı</StyledTableCell>
                    <StyledTableCell align="left">Kod</StyledTableCell>
                    <StyledTableCell align="left">Yasal vergi kodu</StyledTableCell>
                    <StyledTableCell align="left">Açıklama</StyledTableCell>
                    <StyledTableCell align="left">Müşteri tipi</StyledTableCell>
                    <StyledTableCell align="left">Kaynak tipi</StyledTableCell>
                    <StyledTableCell align="left">Oran</StyledTableCell>
                    <StyledTableCell align="left">Başlangıç tarihi</StyledTableCell>
                    <StyledTableCell align="left">Bitiş tarihi</StyledTableCell>
                    <StyledTableCell align="right">İşlemler</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taxes.map((tax) => (
                    <StyledTableRow key={tax.id}>
                      <StyledTableCell align="left">{tax.firstName}</StyledTableCell>
                      <StyledTableCell align="left">{tax.code}</StyledTableCell>
                      <StyledTableCell align="left">{tax.legalTaxCode}</StyledTableCell>
                      <StyledTableCell align="left">{tax.description}</StyledTableCell>
                      <StyledTableCell align="left">{tax.customerType}</StyledTableCell>
                      <StyledTableCell align="left">{tax.taxCalculationType}</StyledTableCell>
                      <StyledTableCell align="left">{tax.ratio}</StyledTableCell>
                      <StyledTableCell align="left">{new Date(tax.startingDate).toLocaleDateString()}</StyledTableCell>
                      <StyledTableCell align="left">{new Date(tax.endingDate).toLocaleDateString()}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title="Sil">
                          <DeleteIcon
                            sx={{ cursor: 'pointer', color: 'blue', marginRight: 4 }}
                            onClick={() => handleDeleteClick(tax.id)}
                          />
                        </Tooltip>
                        <Tooltip title="Düzenle" sx={{ marginTop: '10px' }}>
                          <EditIcon
                            sx={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => handleEditClick(tax.id)}
                          />
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
      {/* Onay Pop-up*/}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <DialogContentText> Bu işlemi geri alamazsınız. Silmek istediğinize emin misiniz?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Hayır</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Evet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaxList;

