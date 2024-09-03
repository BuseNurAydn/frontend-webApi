import { useState } from 'react';
import { TextField, Button,Grid } from '@mui/material';

function TaxDefinitionFilter({ onFilter }) {
  const [firstName, setFirstName] = useState('');
  const [legalTaxCode, setLegalTaxCode] = useState('');
  const [ratio, setRatio] = useState('');

  const handleFilter = () => {
    onFilter({ firstName, legalTaxCode, ratio });
              
  };

  return (
    <>
    <Grid container sx={{padding:'20px'}}>
          <TextField 
          id="firstName"
          label="Adı" 
          variant="filled" 
          size="small" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          sx={{ marginRight: 4 }} />

          <TextField 
          id="legalTaxCode" 
          label="Yasal vergi kodu" 
          variant="filled" 
          size="small" 
          value={legalTaxCode} 
          onChange={(e) => setLegalTaxCode(e.target.value)}  
          sx={{ marginRight: 4 }} />

          <TextField 
          id="ratio" 
          label="Oran(%)" 
          variant="filled" 
          size="small"  
          type="number" 
          value={ratio} 
          onChange={(e) => setRatio(e.target.value)} 
          sx={{ marginRight: 4 }} />
          <Button variant="contained" size="small" onClick={handleFilter}> Bilgi getir</Button>
      </Grid>
      </>
  );
}

export default TaxDefinitionFilter;
