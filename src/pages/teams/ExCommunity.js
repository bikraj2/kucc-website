import React from 'react'
import {useEffect,useState} from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import TeamCard from '../../components/TeamCard/TeamCard'
import { Helmet } from 'react-helmet'
import { collection,  getDocs } from 'firebase/firestore';
import storage from '../../config/firebase'
const ExCommunity = () => {
  const [execInfo,setExecInfo] =useState([])
  const [loading,setLoading] = useState(true)
  const fetchExecData = async ()=>{
    try {
        const execCollection = collection(storage,'board')
        const value = await getDocs(execCollection)
        
        const exec21_22 = value.docs.map((item) => {
          const data = item.data()
          return { imageUrl:data.Image,name:data.Name, id: item.id,position:data.Position }
        })
        setExecInfo(exec21_22)
        setLoading(false)
        console.log(execInfo)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{fetchExecData()},[])
  return (
    <>
      <Helmet>
        <title> Executive Committee - KUCC</title>
      </Helmet>
      <Container sx={{ py: 8 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="subtitle1" color="text.secondary">
            KUCC Board 2020-21
          </Typography>
          <Typography variant="h4">Executive Committee</Typography>
        </Box>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {/* {Array.from(Array(10)).map(() => (
            <Grid item md={4} sm={6} xs={12}>
              <TeamCard />
            </Grid>
          ))} */}
          {loading?<></>:execInfo.map((item)=>{
            return (
              <Grid key = {item.id} item md={4} sm={6} xs={12}>
                <TeamCard id={item.id} {...item} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}
export default ExCommunity
