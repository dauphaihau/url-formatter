import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import style from './HomePage.module.css'
import { SERVER_ENDPOINTS } from '../config';
import { Container, Loading, Text } from '@nextui-org/react';

const HandleRedirect = () => {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState();

  const { params: { shortId } } = useRouteMatch<{shortId: string;}>();

  useEffect(() => {
    async function getData() {
      return axios
        .get(`${SERVER_ENDPOINTS}/api/url/${shortId}`)
        .then((res) => setDestination(res.data.destination))
        .catch((error) => setError(error.message))
    }

    getData();
  }, [shortId])

  useEffect(() => {
    if (destination) window.location.replace(destination);
  }, [destination])

  if (!destination && !error) {
    return (
      <Container className='container'>
        <Loading/>
      </Container>
    );
  }
  return <Text>{error && JSON.stringify(error)}</Text>;
}

export default HandleRedirect;