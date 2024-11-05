import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, Card, CardContent, Autocomplete, InputAdornment, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import EventIcon from '@mui/icons-material/Event';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";

// Styled components
const FormWrapper = styled(Box)`
  width: 760px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TitleBox = styled(Box)`
  display: flex;
  background-color: #e0f2f1; 
  justify-content: center;
  padding : 24px 0;
  border-radius: 10px 10px 0 0; 
  width:100% ; 
  align-items: center;
  position: absolute,
  
`;
const StyledContainer = styled(Box)`
  padding: 20px;
`;
const StyledCard = styled(Card)`
  margin-top: 2rem;
  border-radius: 20px;
`;
const StyledCardContent = styled(CardContent)`
  display: grid;
  gap: 1.5rem;
`;
const ButtonContainer = styled(Box)`
  display: flex;
  background-color: #e0f2f1; 
  justify-content: flex-end;
  margin-top: 1rem;
  padding : 10px 0;
  border-radius: 0 0 10px 10px; 
  width:100% ; 
`;
const BoxField = styled(Box)`
  display: flex;
  gap: 1rem; 
  width: 100%; 
`;
/*
const BoxAuto = styled(Box)`
  display: flex,
  gap: 1.5rem,
  width:49%,
`;*/
const StyledTextField = styled(TextField)`
  background-color: #fbe9e7,
  flex: 1,
  borderRadius: 1,
  width: 100%; 
  border-radius: 4px; 
 .MuiInputBase-root {
    background-color: #fbe9e7; 
  }
`;
const StyledAutocomplete = styled(Autocomplete)`
  background-color: #fbe9e7,
  flex: 1,
  borderRadius: 1,
  border-radius: 4px;
  .MuiInputBase-root {
    background-color: #fbe9e7; 
  }
`;
const initialFormState = {
  code: "",
  legalTaxCode: "",
  firstName: "",
  description: "",
  ratio: "",
  customerType: "",
  taxCalculationType: "",
  startingDate: "",
  endingDate: "",
  status: " ",
};

const TaxAddUpdateForm = ({ existingData, formType, save, update }) => {
  const [formState, setFormState] = useState(initialFormState);
  const { id } = useParams(); // ID'yi URL parametresinden al
  const navigate = useNavigate();
  
  //enumlar için
  const [customerTypes, setCustomerTypes] = useState([]);
  const [taxCalculationTypes, setTaxCalculationTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    // API çağrısı yaparak ilgili veriyi çekip güncelleme işlemi
    if (id && id !== '0') {
      axios.get(`http://localhost:7274/api/taxdefinition/${id}`)
        .then(response => {
          setFormState(response.data);  // Gelen veriyi state'e kaydet
          console.log(response.data);
        })
        .catch(error => console.error('API çağrısında hata oluştu:', error));
    }
    else {
      setFormState(initialFormState);
    }
  }, [id]);
  
  useEffect(() => {
    if (formType === 'edit' && existingData) {
      setFormState(existingData);
    } else {
      setFormState(initialFormState);
    }
  }, [existingData, formType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleAutocompleteChange = (event, value, name) => {
    setFormState({
      ...formState,
      [name]: value ? value.value: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id && id !== '0') {
        // Güncelleme işlemi
        await axios.put(`http://localhost:7274/api/taxdefinition/${id}`, formState);
      } else {
        // Yeni kayıt ekleme işlemi
        await axios.post('http://localhost:7274/api/taxdefinition', formState);
      }
      setFormState(initialFormState);
      navigate('/'); // Kaydetme ve güncelleme sonrası listeleme ekranına yönlendir
    } catch (error) {
      console.error('API çağrısında hata oluştu:', error);
    }
  };

  useEffect(() => {
    // Customer Types API çağrısı
    axios.get('http://localhost:7274/api/enums/customer-types')
      .then(response => { setCustomerTypes(response.data); })  // Veriyi state'e kaydediyoruz
      .catch(error => { console.error('Error fetching customer types:', error); });
    // Tax Calculation Types API çağrısı
    axios.get('http://localhost:7274/api/enums/tax-calculation-types')
      .then(response => { setTaxCalculationTypes(response.data); })
      .catch(error => { console.error('Error fetching tax calculation types:', error); });
    // Status API çağrısı
    axios.get('http://localhost:7274/api/enums/status')
      .then(response => setStatuses(response.data))
      .catch(error => { console.error('Error fetching customer types:', error); });
  }, []);

  const handleCancel = () => {
    navigate('/'); // vazgeç butonuna tıklandığında listeleme sayfasına yönlendirilsin
  };
  
  

  return (
    <FormWrapper onSubmit={handleSubmit} >
      <TitleBox sx={{ position: 'relative' }}>
        <Typography variant="h6" sx={{ position: 'absolute', left: '54%', transform: 'translateX(-50%)' }}>Vergi tanımı ekle</Typography>
        <CloseIcon sx={{ color: '#616161', fontSize: '26px', position: 'absolute', right: '14px' }} />
      </TitleBox>
      <StyledContainer>
        <StyledCard>
          <StyledCardContent>
            <BoxField>
              <StyledTextField
                label="Kod"
                name="code"
                value={formState.code}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
              />
              <StyledTextField
                label="Vergi Kodu"
                name="legalTaxCode"
                value={formState.legalTaxCode}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
              />
            </BoxField>
            <BoxField>
              <StyledTextField
                label="Ad"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
              />
              <StyledTextField
                label="Açıklama"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
              />
            </BoxField>
            <BoxField>
              <StyledTextField
                label="Oran"
                name="ratio"
                value={formState.ratio}
                onChange={handleInputChange}
                type="number"
                variant="filled"
                fullWidth
              />
              <StyledAutocomplete
                options={customerTypes} // backend'den gelen customerTypes
                getOptionLabel={(option) => option.text}
                value={customerTypes.find(type => type.value === formState.customerType) || null} // Eşleşen value
                onChange={(event, value) => handleAutocompleteChange(event, value, "customerType")}
                renderInput={(params) => (
                  <StyledTextField {...params} label="Müşteri Türü" variant="filled" />
                )}
                fullWidth
              />
            </BoxField>
            <BoxField>
              <StyledAutocomplete
                options={taxCalculationTypes}
                getOptionLabel={(option) => option.text}
                value={taxCalculationTypes.find(type => type.value === formState.taxCalculationType) || null}
                onChange={(event, value) => handleAutocompleteChange(event, value, "taxCalculationType")}
                renderInput={(params) => (
                  <StyledTextField {...params} label="Vergi Hesaplama Türü" variant="filled" />
                )}
                fullWidth
              />
              <StyledAutocomplete
                options={statuses}
                getOptionLabel={(option) => option.text}
                value={statuses.find(type => type.value === formState.status) || null}
                onChange={(event, value) => handleAutocompleteChange(event, value, "status")}
                renderInput={(params) => (
                  <StyledTextField {...params} label="Durum" variant="filled" />
                )}
                fullWidth
              />
            </BoxField>
            <BoxField>
              <StyledTextField
                name="startingDate"
                label="Başlangıç tarihi"
                value={formState.startingDate}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
                InputProps={{
                  style: {
                    backgroundColor: '#fbe9e7',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <EventIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                name="endingDate"
                label="Bitiş tarihi"
                value={formState.endingDate}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
                InputProps={{
                  style: {
                    backgroundColor: '#fbe9e7',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <EventIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </BoxField>
          </StyledCardContent>
        </StyledCard>
      </StyledContainer>
      <ButtonContainer>
        <Button variant="text" onClick={handleCancel}>Vazgeç</Button>
        <Button variant="contained" type="submit" color="primary" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ marginRight: '20px' }}>
          Kaydet
        </Button>
      </ButtonContainer>
    </FormWrapper>
  );
};
export default TaxAddUpdateForm;
