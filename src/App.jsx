import { useState } from 'react'
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import './App.css'


function App() {
  const [inputsText, setInputText] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const onButtonClick = () => {
    if (!!inputsText && inputsText.length > 0) {
      gethuggingFaceData(inputsText);
    }

  }
  const gethuggingFaceData = async (text) => {
    setLoading(true);
    let response = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-use-cache": "false",
        "cookie": "_ga=GA1.2.271645918.1662137258; __stripe_mid=46018beb-5151-4c69-8bad-409b0c8da7fea29e19; token=HraZMiSxGPJsJfMTmQMkRDKhOfoLYEZJiZSMWGVbvNjYZBeKWbObDwuHimjIEeYBYcrsYJOuUkdfTQmDwrQASjBSGCXSjoFjVmrylbDszjQSAQPEGSgekxDBYkQYkAao; _gid=GA1.2.1461150070.1670685856; __stripe_sid=a5966e19-b029-4413-8b01-745290a61e5b986183; AWSALB=TuQoxQmAtgoEHK9KH9soxGocjCez7E9SzbhJvkDUR3XZmi8EIUzTFwInYPa0DCWzeRsrEGmFTT/XJFfByZoJ5ofojni/hlcyZ0R6juW5ygSt8lDbO4NYHlZboN3n; AWSALBCORS=TuQoxQmAtgoEHK9KH9soxGocjCez7E9SzbhJvkDUR3XZmi8EIUzTFwInYPa0DCWzeRsrEGmFTT/XJFfByZoJ5ofojni/hlcyZ0R6juW5ygSt8lDbO4NYHlZboN3n",
        "Referer": "https://huggingface.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": JSON.stringify({ inputs: text }),
      "method": "POST"
    });

    let newblob = await response.blob();
    let objectURL = URL.createObjectURL(newblob);
    setImageSrc(objectURL);
    setLoading(false);
  }
  useEffect(() => {
    // gethuggingFaceData();
  }, []);



  return (
    <div className="App">
      <div className='header'>
        <h1> API inference for Stable Diffusion v1.5</h1>
        <p>
          Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input. For more information about how Stable Diffusion functions, please have a look at <a href='https://huggingface.co/blog/stable_diffusion'>🤗's Stable Diffusion blog.</a>
        </p>

      </div>
      <div>
        <div className='input-area'>

          <TextField id="standard-basic" onChange={e => setInputText(e.target.value)} label="Text-to-Image" variant="standard" />

          <Button variant="contained" onClick={onButtonClick}>Compute</Button>
        </div>
      </div>

      <div>

        {isLoading ?
          <Skeleton variant="rectangular" width={300} height={200} />
          : !imageSrc ? null : <img src={imageSrc} className="image" />
        }
      </div>
      <div>
        <p>

        For more details
        <a href='https://huggingface.co/runwayml/stable-diffusion-v1-5'> click</a>
        </p>
        <p>dev:tz01x</p>
      </div>
    </div>
  )
}

export default App
