import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cartooneo from './assets/cartooneo.jpg'
import face from './assets/face.png'
import tintin from './assets/tintin.png'
import './App.css'
import html2canvas from 'html2canvas';


function App() {
  const [count, setCount] = useState(0)
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(45)

  const onDrawCanvas = async () => {



    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const img = new Image();
    img.src = cartooneo; // Replace with your image URL

    await new Promise((resolve, reject) => {
    
        img.onload = () => {
          // ctxBackground.drawImage(img, 0, 0, 650, 450); // Draw image at position (50, 50)
          resolve();
        };
    })



    const imgFace = new Image();
    imgFace.src = face; // Replace with your image URL

    imgFace.onload = () => {
      ctx.save()
      ctx.drawImage(img, 0, 0, 650, 450); // Draw image at position (50, 50)
      ctx.rotate(angle.current);  

      // const x = (canvasRef.width - imgFace.width) / 2;
      // const y = (canvas.height - imgFace.height) / 2;
      ctx.drawImage(imgFace, 50, 60); // Draw image at position (50, 50)
      ctx.restore()
    };

  }

  useEffect(() => {

    // onDrawCanvas()

  },[])

  const onTurn = () => {
    setAngle(angle+30)
    // console.log("onTurn")
    // angle.current += 45 * Math.PI / 180; // 45 degrees in radians
    // onDrawCanvas()
  }

  const onCapture = () => {
    const element = document.getElementById('capture-region');

    html2canvas(element).then(canvas => {
      // Convert canvas to data URL
      const image = canvas.toDataURL('image/png');

      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = image;
      link.download = 'screenshot.png';
      link.click();
    });

  }

  return <div>
      <div id="capture-region" style={{ width: '650px', height: '450px', position: 'relative'}}>
        <img src={cartooneo} style={{ height: '100%'}}/>
        <img src={face} style={{ position: 'absolute', top: '10px', left: '100px', transform: `rotate(${angle}deg)`, transition: 'all 0.5s ease'}}/>

      </div>

      <button onClick={() => onTurn()}>turn</button>
      <button onClick={() => onCapture()}>Capture</button>
  </div>

}

export default App
