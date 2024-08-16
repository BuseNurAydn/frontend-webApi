import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, MenuItem, Select, Box, Card, CardContent, CardActions, FormControl, Chip, Autocomplete, InputLabel, InputAdornment, Stack, Typography, Button } from '@mui/material';

const TaxAddUpdate = () => {
  const [taxData, setTaxData] = useState({
    Code: '',
    LegalTaxCode: '',
    FirstName: '',
    Description: '',
    Ratio: '',
    CustomerType: '',
    TaxCalculationType: '',
    StartingDate: '',
    EndingDate: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerTypes, setCustomerTypes] = useState([]);
  const [taxTypes, setTaxTypes] = useState([]);

  useEffect(() => {
    // API çağrısı yaparak ilgili veriyi çelip güncelleme işlemi
    if (id) {
      axios.get('https://localhost:7274/api/taxdefinition/${id}')
        .then(response => {
          setTaxData(response.data);  // Gelen veriyi state'e kaydet
        })
        .catch(error => console.error('API çağrısında hata oluştu:', error));
    }
  }, [id]);

  //her form elemanın değişimi kontrol edilerek taxData güncellenşr
  const handleChange = (e) => {
    setTaxData({ ...taxData, [e.target.name]: e.target.value });
  };

  //formun gönderilmesi için handlesubmit metodu, API çağrısı 
  const handleSave = () => {
    if (id) {
        // Güncelleme API çağrısı
        axios.put(`https://localhost:7274/api/taxdefinition/${id}`, taxData)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Güncelleme başarısız:', error);
            });
    } else {
        // Yeni kayıt ekleme API çağrısı
        axios.post('https://localhost:7274/api/taxdefinition', taxData)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Kayıt eklenemedi:', error);
            });
    }
};
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
        setTaxTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customer types!', error);
      });
  }, []);
*/}

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
          padding: 2,
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            width: 860, 
            height: 560, 
            padding: 2,
            boxShadow: 3,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', 
              padding: '28px',
              backgroundColor: '#e0f2f1',
              width: '100%',
              position: 'absolute',
              mb: 68,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)', // yazıyı ortaladık
              }}
            >Vergi tanımı ekle</Typography>

            <CloseIcon
              sx={{
                color:'#616161',
                mr: 6,
                fontSize: '28px',
                position: 'absolute',
                right: 0,
              }}
            />
          </Box>
          <Card
            sx={{
              minWidth: 275,
              width: 800, 
              height: 370,
              padding: 2,
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <form >
              <CardContent>
                <Box
                  sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    flexWrap: 'wrap', 
                    gap: 2,
                  }}
                >
                  {/* First row of TextFields */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2, 
                      width: '100%',
                      mb: 1, 
                    }}
                  >
                    <TextField
                      name="Code"
                      label="Kod"
                      value={taxData.Code}
                      onChange={handleChange}
                      variant="filled"
                      sx={{
                        flex: 1, 
                        backgroundColor: "#fff8e1", 
                        borderRadius: 1, 
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                    />
                    <TextField
                      name="LegalTaxCode"
                      label="Yasal Vergi Kodu"
                      value={taxData.LegalTaxCode}
                      onChange={handleChange}
                      variant="filled"
                      sx={{
                        flex: 1, 
                        backgroundColor: "#fff8e1", 
                        borderRadius: 1,
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                    />
                  </Box>

                  {/* Second row of TextFields */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      width: '100%', 
                      mb: 1
                    }}
                  >
                    <TextField
                      name="FirstName"
                      label="Adı"
                      value={taxData.FirstName}
                      onChange={handleChange}
                      variant="filled"
                      sx={{
                        flex: 1, 
                        backgroundColor: "#fff8e1", 
                        borderRadius: 1, 
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <MenuOpenIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      name="Description"
                      label="Açıklama"
                      value={taxData.Description}
                      onChange={handleChange}
                      variant="filled"
                      sx={{
                        flex: 1,
                        backgroundColor: "#fff8e1",
                        borderRadius: 1, 
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <MenuOpenIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      width: '100%',
                      mb: 1
                    }}
                  >
                    <TextField
                      name="Ratio"
                      label="Oran (%)"
                      value={taxData.Ratio}
                      onChange={handleChange}
                      variant="filled"
                      sx={{
                        flex: 1, 
                        backgroundColor: "#fff8e1", 
                        borderRadius: 1, 
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                    />
                    <Autocomplete
                      name="CustomerType"
                      sx={{
                        m: 0, flex: 1,
                        backgroundColor: "#fff8e1",
                        borderRadius: 1, 
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                      options={customerTypes}
                      getOptionLabel={(option) => option.DisplayName} // Metin gösterimi için DisplayName kullanılıyor
                      renderInput={(params) => (
                        <TextField {...params} label="Müşteri Türü" variant="filled" />
                      )}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      width: '49%'
                    }}
                  >
                    <Autocomplete
                      name="TaxType"
                      sx={{
                        m: 0, flex: 1, 
                        backgroundColor: "#fff8e1",
                        borderRadius: 1, 
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                      options={taxTypes}
                      getOptionLabel={(option) => option.DisplayName} // Metin gösterimi için DisplayName kullanılıyor
                      renderInput={(params) => (
                        <TextField {...params} label="Vergi hesaplama türü" variant="filled" />
                      )}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2, 
                      width: '100%', 
                    }}
                  >
                    <TextField
                      name="StartingDate"
                      label="Başlangıç tarihi"
                      value={taxData.StartingDate}
                      onChange={handleChange}
                      variant="filled"
                      sx={{
                        flex: 1, 
                        backgroundColor: "#fff8e1", 
                        borderRadius: 1,
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <EventIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      name="EndingDate"
                      label="Bitiş tarihi"
                      value={taxData.EndingDate}
                      onChange={handleChange}
                      variant="filled"
                      sx={{
                        flex: 1, 
                        backgroundColor: "#fff8e1",
                        borderRadius: 1, 
                        '& .MuiInputBase-root': {
                          padding: '10px', // Inner padding
                          height: '50px', // Height of the input field
                        },
                        '& .MuiFormControl-root': {
                          height: '100%', // Ensure container height
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <EventIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </form>
          </Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right', 
              padding: '12px',
              backgroundColor: '#e0f2f1',
              width: '100%',
              position: 'absolute',
              mt: 68
            }}
          >
            <Button variant="text">Vazgeç</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                marginRight: 4,
                borderRadius: 3,
                display: 'inline-flex',
                alignItems: 'center',
                height: '34px',
                
              }}
            >Kaydet</Button>
          </Box>
        </Card>
      </Box>
    </>
  );

}
export default TaxAddUpdate;

