import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import TeamCard from '../../components/TeamCard/TeamCard'
import { Helmet } from 'react-helmet'
import {useState,useEffect} from 'react'
import { collection,  getDocs } from 'firebase/firestore';
import storage from '../../config/firebase'
const CommunityCo = () => {
   const [communityCoInfo, setcommunityCoInfo] = useState([])
   const [loading, setLoading] = useState(true)
   const fetchcommunityCoData = async () => {
     try {
       const communityCoCollection = collection(storage, 'community')
       const value = await getDocs(communityCoCollection)
       const communityCo21_22 = value.docs.map((item) => {
         const data = item.data()
         return { imageUrl: data.Image, name: data.Name, id: item.id,position:data.Community }
       })
       setcommunityCoInfo(communityCo21_22)
       setLoading(false)
       console.log(communityCoInfo)
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(() => {
     fetchcommunityCoData()
   }, [])
  return (
    <>
      <Helmet>
        <title> Community Coordinators - KUCC</title>
      </Helmet>
      <Container sx={{ py: 8 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="subtitle1" color="text.secondary">
            KUCC Board 2020-21
          </Typography>
          <Typography variant="h4">Coordinators</Typography>
        </Box>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {loading ? (
            <></>
          ) : (
            communityCoInfo.map((item) => {
              return (
                <Grid key={item.id} item md={4} sm={6} xs={12}>
                  <TeamCard id={item.id} {...item} />
                </Grid>
              )
            })
          )}
          
        </Grid>
      </Container>
    </>
  )
}

export default CommunityCo
