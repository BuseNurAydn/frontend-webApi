import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Paper, Dialog, DialogActions, DialogContent, DialogContentText, Tooltip, Button, Grid} from '@mui/material';
import TaxDefinitionFilter from './TaxDefinitionFilter';
import { DataGrid} from '@mui/x-data-grid';

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

const TaxList = ({ fetchData }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    axios.get('http://localhost:7274/api/taxdefinition')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('API çağrısında hata oluştu:', error));
  }, []);

  useEffect(() => {
    fetchFilteredTaxDefinitions(filterParams);
  }, [filterParams]);

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

  const fetchFilteredTaxDefinitions = async (params) => {
    try {
      const response = await fetch(`http://localhost:7274/api/taxdefinition/filter?${new URLSearchParams(params)}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching filtered tax definitions:", error);
    }
  };
  const handleFilterChange = (params) => {
    setFilterParams(params);
  };

  const columns = [
    {
      field: 'firstName',
      headerName: 'Adı',
      minWidth: 150,
      editable: true,
      flex: 1,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Adı</div>
      ),
    },
    {
      field: 'code',
      headerName: 'Kod',
      minWidth: 80,
      editable: true,
      flex: 1,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Kod</div>
      ),
    },
    {
      field: 'legalTaxCode',
      headerName: 'Yasal Vergi Kodu',
      minWidth: 140,
      editable: true,
      flex: 1,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Yasal Vergi Kodu</div>
      ),
    },
    {
      field: 'description',
      headerName: 'Açıklama',
      minWidth: 150,
      editable: true,
      flex: 1,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Açıklama</div>
      ),
    },
    {
      field: 'customerType',
      headerName: 'Müşteri Tipi',
      minWidth: 130,
      editable: true,
      flex: 1,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Müşteri Tipi</div>
      ),
    },
    {
      field: 'taxCalculationType',
      headerName: 'Kaynak Tipi',
      minWidth: 120,
      editable: true,
      flex: 1,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Kaynak Tipi</div>
      ),
    },
    {
      field: 'ratio',
      headerName: 'Oran',
      maxWidth: 50,
      editable: true,
      flex: 0.3,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Oran</div>
      ),
    },
    {
      field: 'startingDate',
      headerName: 'Başlangıç tarihi',
      minWidth: 130,
      editable: true,
      flex: 1,
      type:'date',
      valueGetter: (value) => value && new Date(value),
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Başlangıç Tarihi</div>
      ),
    },
    {
      field: 'endingDate',
      type:'date',
      headerName: 'Bitiş tarihi',
      minWidth: 100,
      editable: true,
      flex: 1,
      valueGetter: (value) => value && new Date(value),
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Bitiş Tarihi</div>
      ),
    },
    {
      field: 'status',
      headerName: 'Durum',
      minWidth: 70,
      flex: 0.5,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>Durum</div>
      ),
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      minWidth: 40,
      renderHeader: () => (
        <div style={{ fontWeight: 'bold' }}>İşlemler</div>
      ),
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', align: "left" }}>
          <Tooltip title="Sil">
            <IconButton
              color="primary"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Düzenle">
            <IconButton
              color="primary"
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];
  return (
    <>
      <TaxDefinitionFilter onFilter={handleFilterChange} />
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
          <div style={{ height: 500, width: '100%'}}>
              <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.id} // Benzersiz id belirlemek için
              />
            </div>
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