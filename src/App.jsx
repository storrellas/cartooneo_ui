import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cartooneo from './assets/cartooneo.jpg'
import face from './assets/face.png'
import tintin from './assets/tintin.png'
import './App.css'
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css'
import Draggable from 'react-draggable';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [count, setCount] = useState(0)
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(45)
  const [ position, setPosition ] = useState({ x: 0, y: 0 });
  const [ file, setFile ] = useState(null);
  const [ currentImage, setCurrentImage ] = useState(null);
  const [ width, setWidth ] = useState(100);
  const nodeRef = useRef();
  const parentRef = useRef();
  const imgRef = useRef()


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

  const onDrag = (e) => {
    const { clientX, clientY } = e;
    console.log("dragging ", clientX, clientY)
    // const rect = nodeRef.current.getBoundingClientRect();
    // const newX = clientX - rect.width / 2;
    // const newY = clientY - rect.height / 2;
    // setPosition({ x: newX, y: newY });
    // console.log("dragging ", newX, newY)
    const parentRect = parentRef.current.getBoundingClientRect();
    const x = e.clientX - parentRect.left;
    const y = e.clientY - parentRect.top;

    console.log("Relative to parent:", parentRect.left, parentRect.top);
    console.log("Relative to parent:", e.clientX, e.clientY);
    // setPosition({ x, y });
  }



  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    const rect = e.target.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging || !containerRef.current) return;


    const containerRect = containerRef.current.getBoundingClientRect();

    let x = e.clientX - containerRect.left - offset.current.x;
    let y = e.clientY - containerRect.top - offset.current.y;

    // Optional: Keep the element inside the container bounds
    x = Math.max(-100, Math.min(containerRect.width , x));
    y = Math.max(-50, Math.min(containerRect.height, y));

    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };



  // console.log("position ", position, angle)
  // console.log("position ", pos, angle)
  return <main>
          <div className='d-flex'>
          


            <div  
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              // onMouseLeave={handleMouseUp}
              
              style={{
                width: "1000px",
                height: "500px",
                position: "relative",
                border: "2px solid #888",
                userSelect: "none"
              }}
            >
              <img src={cartooneo} style={{ height: '100%'}}/>

              <div
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                // onDragEnd={handleMouseUp}
                style={{
                  width: "100px",
                  height: "50px",
                  backgroundColor: "blue",
                  position: "absolute",
                  left: position.x,
                  top: position.y,
                  cursor: "grab",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: dragging?'':'all 0.5s ease',
                }}
              >
                <img draggable={false} ref={imgRef} src={currentImage} className='h-100'/>
              </div>
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
          </div>
          {/* <svg className='border rounded' width="500" height="300" xmlns="http://www.w3.org/2000/svg">
              <image href={cartooneo} width="500" height="300" />
              <image href={currentImage} x={position.x} y={position.y} width={width}
               style={{transition: 'all 0.5s ease'}}/>
          </svg> */}


<div ref={parentRef} className='border rounded' id="capture-region" 
              style={{ width: '650px', height: '450px', position: 'relative'}}>
              <img src={cartooneo} style={{ height: '100%'}}/>
              
              {/* <img src={currentImage}
                  style={{ position: 'absolute', top: `${position.y}px`, left: `${position.x}px`, 
                    transform: `rotate(${angle}deg)`, transition: 'all 0.5s ease', width: `${width}px`}}/> */}

              <img draggable="true" src={face} ref={nodeRef} 
                style={{ position: 'absolute', top: position.y, left: position.x}}
                onDrag={(e) => onDrag(e)}/>

            </div>


        </main>

}

export default App
