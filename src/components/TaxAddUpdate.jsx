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
const BoxAuto = styled(Box)`
  display: flex,
  gap: 1.5rem,
  width:49%,
`;
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
};

const TaxAddUpdateForm = ({ existingData, formType, save, update }) => {
  const [formState, setFormState] = useState(initialFormState);
  const { id } = useParams();
  const navigate = useNavigate();
 //enumlar için
  const [customerTypes, setCustomerTypes] = useState([]);
  const [taxCalculationTypes, setTaxCalculationTypes] = useState([]);
 
  useEffect(() => {
    // API çağrısı yaparak ilgili veriyi çekip güncelleme işlemi
    if (id) {
      axios.get(`https://localhost:7274/api/taxdefinition/${id}`)
        .then(response => {
          setFormState(response.data);  // Gelen veriyi state'e kaydet
        })
        .catch(error => console.error('API çağrısında hata oluştu:', error));
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
      [name]: value ? value.id : '', 
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try{
    if (id) {
      // Güncelleme işlemi
      axios.put(`https://localhost:7274/api/taxdefinition/${id}`, formState)
        .then(response => {
          console.log('Güncelleme başarılı:', response.data);

          // Formu temizle
          setFormState(initialFormState)
          // Listeleme ekranına yönlendir
          navigate('/');
        })
        .catch(error => console.error('Güncelleme sırasında hata oluştu:', error));
    } else {
      // Yeni kayıt ekleme işlemi 
      axios.post('https://localhost:7274/api/taxdefinition', formState);
    }
    setFormState(initialFormState);
     // Başarılı olursa listeleme sayfasına yönlendir
     navigate('/');
    }catch (error) {
      console.error('API çağrısında hata oluştu:', error);
    };
  };
  {/*
    e.preventDefault();
    if (formType === 'new') {
      save(formState); // Save new record
    } else if (formType === 'edit') {
      update(formState); // Update existing record
    }
    setFormState(initialFormState); // Reset form
  };*/}


  {/*
  useEffect(() => {
    axios.get('https://localhost:7274/api/customertypes')
      .then(response => {
        setCustomerTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customer types!', error);
      });
  }, []);

  useEffect(() => {
    axios.get('api/taxcalculationtypes')
      .then(response => {
        setTaxCalculationTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customer types!', error);
      });
  }, []);
*/}

  return (
    <FormWrapper onSubmit={handleSubmit} >
      <TitleBox>
        <Typography variant="h6" sx={{position: 'absolute',left: '54%',transform: 'translateX(-50%)'}}>Vergi tanımı ekle</Typography>
        <CloseIcon sx={{color: '#616161',fontSize: '28px',position: 'absolute'}}/>
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
                options={customerTypes}
                getOptionLabel={(option) => option.name || ""}
                value={formState.customerType}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "customerType")
                }
                renderInput={(params) => (
                  <StyledTextField {...params} label="Müşteri Türü" variant="filled" />
                )}
                fullWidth
              />
            </BoxField>
            <BoxAuto>
              <StyledAutocomplete
                options={taxCalculationTypes}
                getOptionLabel={(option) => option.name || ""}
                value={formState.taxCalculationType}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "taxCalculationType")
                }
                renderInput={(params) => (
                  <StyledTextField {...params} label="Vergi Hesaplama Türü"  variant="filled"/>
                )}
              />
            </BoxAuto>
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
        <Button variant="text">Vazgeç</Button>
        <Button variant="contained"  type="submit" color="primary" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ marginRight: '20px' }}>
          Kaydet
        </Button>
      </ButtonContainer>
    </FormWrapper>
  );
};
export default TaxAddUpdateForm;
