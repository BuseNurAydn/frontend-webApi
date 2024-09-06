import { useState } from 'react';
import { TextField, Button,Grid,Alert,Stack } from '@mui/material';
import { styled } from '@mui/system';

const StyledAlert = styled(Alert)`
  background-color: #2196f3; 
  color: white;
`;

const TaxDefinitionFilter = ({ onFilter }) => {
  const [firstName, setFirstName] = useState('');
  const [legalTaxCode, setLegalTaxCode] = useState('');
  const [ratio, setRatio] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Uyarı mesajı için state

  const handleFilter = () => {
    // Eğer tüm alanlar boşsa, bilgi getir butonuna tıklandıysa uyarı mesajı göstermek için
    if (!firstName && !legalTaxCode && !ratio) {
      setErrorMessage('Lütfen en az bir filtre alanını doldurun.');
      return;
    }
    // Uyarı mesajını temizler ve filtreleme işlemi başlar
    setErrorMessage('');
    onFilter({ firstName, legalTaxCode, ratio });
  };

  return (
    <>
    <Grid container sx={{padding:'10px'}}>
      {errorMessage && (
          <Grid item xs={12} >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <StyledAlert severity="warning" onClose={() => setErrorMessage('')}>
                {errorMessage}
              </StyledAlert>
            </Stack>
          </Grid>
        )}
          <TextField 
          id="firstName"
          label="Adı" 
          variant="filled" 
          size="small" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          sx={{ marginRight: 4, marginTop:2 }} />

          <TextField 
          id="legalTaxCode" 
          label="Yasal vergi kodu" 
          variant="filled" 
          size="small" 
          value={legalTaxCode} 
          onChange={(e) => setLegalTaxCode(e.target.value)}  
          sx={{ marginRight: 4, marginTop:2 }} />

          <TextField 
          id="ratio" 
          label="Oran(%)" 
          variant="filled" 
          size="small"  
          type="number" 
          value={ratio} 
          onChange={(e) => setRatio(e.target.value)} 
          sx={{ marginRight: 4, marginTop:2 }} />
          <Button variant="contained" size="small" sx={{ marginTop:2 }} onClick={handleFilter}> Bilgi getir</Button>
      </Grid>
      </>
  );
}
export default TaxDefinitionFilter;
