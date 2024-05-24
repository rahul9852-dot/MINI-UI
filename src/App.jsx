
import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const dummyArray = new Array(16).fill(null);
  const [gridSize, setGridSize] = useState(dummyArray);
  const [playing, setPlaying] = useState(false);
  // const [currIdx , setCurrIdx] = useState(null);
  const [colorIdx, setColorIdx] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [saveDiffTime, setSaveDiffTime] = useState([])
  // const [pause, setPause] = useState(false);


  useEffect(()=> {
    let intervalId = null;
    if(playing){
      setStartTime(Date.now());
      intervalId = setInterval(()=> {
        let randomizedIdx = Math.floor(Math.random()*gridSize.length);
        setColorIdx(randomizedIdx);
      }, 1000)
    }
    return () => clearInterval(intervalId);
  },[playing])

  const handlePause = ()=>{
    setPlaying(false);
    setEndTime(Date.now());
    setSaveDiffTime((endTime - startTime)/1000);
  }

  const handleStop = () =>{
    setGridSize(new Array(16).fill(null));
    setColorIdx(null);
    setPlaying(false);
  }

  return (
    <div className='text-lg '>
      <div className='mt-10 flex flex-col items-center justify-center'>
        <div className='grid grid-cols-4 w-[200px] items-center justify-center'>
          {gridSize.map((value,idx)=> (
            <div key={idx} className={`${
              colorIdx == idx ? `bg-red-950` : ''
            } flex items-center justify-center h-12 w-12 border border-gray-12 shadow-lg cursor-pointer`}
            >
            </div>
          ))}
        </div>
        <div className='flex justify-between gap-x-4 items-center px-2 py-2'>
          <button className='border-none px-1 py-1 items-center justify-center bg-blue-950 rounded text-white w-[80px]' onClick={()=>setPlaying(!playing)}>Start</button>
          <button className='border-none px-1 py-1 items-center justify-center bg-blue-950 rounded text-white w-[80px]' onClick={handlePause}>Pause</button>
          <button className='border-none px-1 py-1 items-center justify-center bg-blue-950 rounded text-white w-[80px]' onClick={handleStop}>Reset</button>
        </div>

        <div className='grid grid-cols-2'>
          {!playing && (
            <div className='flex justify-between items-center gapx-4'>
              <p>
                Time Elapsed:
              </p>
              {' '} {saveDiffTime.map((time, idx)=> (
                <span key={idx}>{time}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
