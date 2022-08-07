import React, { FormEvent, useState } from 'react';
import { Container, Button, Input, Text, Row } from '@nextui-org/react';
import { Link } from '@nextui-org/react';
import { SERVER_ENDPOINTS } from '../config';
import style from './HomePage.module.css'
import { ClipboardIcon } from '@heroicons/react/outline'
import { toast, Toaster } from 'react-hot-toast';
import CopyToClipboard from 'react-copy-to-clipboard';
import axios from 'axios';

const HomePage = () => {
  const [destination, setDestination] = useState();
  const [shortUrl, setShortUrl] = useState<{shortId: string} | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShortUrl(null)
    const result = await axios.post(
      `${SERVER_ENDPOINTS}/api/url`,
      { destination }
    ).then((res) => res.data)
      .catch(() => toast.error('Please enter a valid url.'))
    setShortUrl(result)
  }

  const finalURL = `${window.location.origin}/${shortUrl?.shortId}`;

  console.log('test')

  return (
    <Container className={style.container}>
      <Toaster/>
      <Text h2>Url Formatter</Text>
      <form onSubmit={handleSubmit} className={style.form}>
        <Input
          size='xl'
          width='450px'
          placeholder='type your url'
          contentRightStyling={false}
          onChange={(e: any) => setDestination(e.target.value)}
        />
        <Button
          auto shadow
          size='lg'
          type='submit'
          className={style.btn}>
          Format
        </Button>
      </form>
      {
        shortUrl && (
          <Row justify='center' align='center'>
            <Link href={`/${shortUrl?.shortId}`} className='link' target='_blank'>
              {window.location.origin}/{shortUrl?.shortId}
            </Link>
            <CopyToClipboard text={finalURL}>
              <ClipboardIcon className={style.copyBtn} onClick={() => toast.success('Copied!')}/>
            </CopyToClipboard>
          </Row>
        )
      }
      <Text>made by
        <Link href='https://github.com/dauphaihau' className={style['link-author']} target='_blank'>
          John
        </Link>
      </Text>
    </Container>
  );
}

export default HomePage;