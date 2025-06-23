import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cartooneo from './assets/cartooneo.jpg'
import face from './assets/face.png'
import tintin from './assets/tintin.png'
import './App.css'
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(45)
  const [ position, setPosition ] = useState({ x: 0, y: 0 });
  const [ file, setFile ] = useState(null);
  const [ currentImage, setCurrentImage ] = useState(null);
  const [ width, setWidth ] = useState(100);

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

  const handleFileChange = (e) => {
    for(const file of e.target.files) {
      setCurrentImage(URL.createObjectURL(file))
    }
  };


  console.log("position ", position)
  return <main className='d-flex'>
            <div className='border rounded' id="capture-region" style={{ width: '650px', height: '450px', position: 'relative'}}>
              <img src={cartooneo} style={{ height: '100%'}}/>
              <img src={currentImage} 
                style={{ position: 'absolute', top: `${position.y}px`, left: `${position.x}px`, 
                  transform: `rotate(${angle}deg)`, transition: 'all 0.5s ease', width: `${width}px`}}/>
            </div>
            <div>
              <div className='d-flex'>
                <button className="btn btn-primary" onClick={() => setAngle(angle+30)}>TurnLeft</button>
                <button className="btn btn-primary" onClick={() => setAngle(angle-30)  }>TurnRight</button>
              </div>
              <div className='d-flex mt-3'>
                <button className="btn btn-primary" onClick={() => setPosition({...position, y: position.y-20})}>MoveUp</button>
                <button className="btn btn-primary" onClick={() => setPosition({...position, y: position.y+20})}>MoveDown</button>
              </div>
              <div className='d-flex mt-3'>
                <button className="btn btn-primary" onClick={() => setPosition({...position, x: position.x-20})}>MoveLeft</button>
                <button className="btn btn-primary" onClick={() => setPosition({...position, x: position.x+20})}>MoveRight</button>
              </div>
              <div className='d-flex mt-3'>
                <button className="btn btn-primary" onClick={() => setWidth(width+10)}>Increase</button>
                <button className="btn btn-primary" onClick={() => setWidth(width-10)}>Reduce</button>
              </div>
              <div className='text-left mt-3'>
                <button className="btn btn-primary" onClick={() => onCapture()}>Capture</button>
              </div>
              <div className='mt-3'>
                <input className='form-control' type="file" onChange={handleFileChange} />
              </div>
            </div>

        </main>

}

export default App
