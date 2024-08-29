import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Dialog, DialogActions, DialogContent, DialogContentText, Tooltip, Button, Grid, TextField} from '@mui/material';

const PREFIX = 'TaxList';

const classes = {
  paper: `${PREFIX}-paper`,
  addButton: `${PREFIX}-addButton`,
  tableHead: `${PREFIX}-tableHead`,
  tableBody: `${PREFIX}-tableBody`,
  tableRowOdd: `${PREFIX}-tableRowOdd`,
  deleteIcon: `${PREFIX}-deleteIcon`,
  editIcon: `${PREFIX}-editIcon`,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${classes.paper}`]: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  [`&.${classes.addButton}`]: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: 2,
    height: '30px',
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.tableHead}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  [`&.${classes.tableBody}`]: {
    fontSize: 13,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${classes.tableRowOdd}`]: {
    backgroundColor: theme.palette.action.hover,
  },
}));
const StyledIconContainer = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
}));
const StyledIcon = styled('div')(({ theme }) => ({
  [`&.${classes.deleteIcon}`]: {
    cursor: 'pointer',
    color: 'blue',

  },
  [`&.${classes.editIcon}`]: {
    cursor: 'pointer',
    color: 'blue',
    marginLeft: theme.spacing(1)
  },
}));

const TaxList = ({ fetchData }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:7274/api/taxdefinition')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('API çağrısında hata oluştu:', error));
  }, []);

  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleDeleteConfirm = async () => {
    setOpen(false); // Pop-up'ı hemen kapat
    try {
      await axios.delete(`http://localhost:7274/api/taxdefinition/${selectedId}`);
      fetchData();
    } catch (error) {
      console.error('Silme sırasında hata oluştu:', error);
    }
  };
  const handleEdit = (id) => {
    navigate(`/add-update/${id}`);
  };

  return (
    <>
     <Grid container sx={{padding:'20px'}}>
          <TextField id="filled-basic" label="Adı" variant="filled" size="small" sx={{ marginRight: 4 }} />
          <TextField id="filled-basic" label="Yasal vergi kodu" variant="filled" size="small"sx={{ marginRight: 4 }} />
          <TextField id="filled-basic" label="Oran(%)" variant="filled"size="small" sx={{ marginRight: 4 }} />
          <Button variant="contained" size="small"> Bilgi getir</Button>
        </Grid>
      <StyledPaper className={classes.paper}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <StyledButton
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              className={classes.addButton}
              onClick={() => navigate('/add-update/0')}> Ekle
            </StyledButton>
          </Grid>
          <Grid container paddingTop={5} paddingBottom={5}>

            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className={classes.tableHead} align="left">Adı</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Kod</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Yasal vergi kodu</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Açıklama</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Müşteri tipi</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Kaynak tipi</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Oran</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Başlangıç tarihi</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="left">Bitiş tarihi</StyledTableCell>
                    <StyledTableCell className={classes.tableHead} align="right">İşlemler</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((tax, index) => (
                    <StyledTableRow key={tax.id} className={index % 2 ? classes.tableRowOdd : ''}>
                      <StyledTableCell className={classes.tableBody} align="left">{tax.firstName}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{tax.code}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{tax.legalTaxCode}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{tax.description}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{tax.customerType}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{tax.taxCalculationType}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{tax.ratio}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{new Date(tax.startingDate).toLocaleDateString()}</StyledTableCell>
                      <StyledTableCell className={classes.tableBody} align="left">{new Date(tax.endingDate).toLocaleDateString()}</StyledTableCell>
                      <TableCell align="right">
                        <StyledIconContainer>
                          <Tooltip title="Sil">
                            <StyledIcon
                              className={classes.deleteIcon}
                              onClick={() => handleDelete(tax.id)}
                            >
                              <DeleteIcon />
                            </StyledIcon>
                          </Tooltip>
                          <Tooltip title="Düzenle">
                            <StyledIcon
                              className={classes.editIcon}
                              onClick={() => handleEdit(tax.id)}
                            >
                              <EditIcon />
                            </StyledIcon>
                          </Tooltip>
                        </StyledIconContainer>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Onay Pop-up */}
      <Dialog open={open} onClose={() => setOpen(false)} >
        <DialogContent>
          <DialogContentText>Bu işlemi geri alamazsınız. Silmek istediğinize emin misiniz?</DialogContentText>
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
