import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
const passwordRef = useRef<HTMLInputElement>(null)

  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 25)
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(()=>{
  
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*";

    for(let i=1; i<=length; i++){
      const char= Math.floor(Math.random()*str.length+1)
      pass+= str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>
    passwordGenerator(), 
    [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-6 bg-gray-800 text-orange-500">
      <h2 className='text-center my-3'>Password Generator</h2>
      <div className='flex shadow rounded-2xl overflow-hidden my-3 bg-white'> 
      <input 
          type="text" 
          value={password}
          className='outline-none w-full px-3 py-0.5 text-black' 
          placeholder=' Password' 
          readOnly
          ref={passwordRef}
          />
      <button
        onClick={copypasswordtoclipboard}
        className='outline-none !bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input
         type="range" 
         min={6} 
         max={25} 
         value={length} 
         className='cursor-pointer' 
         onChange={(e)=>{setLength(Number(e.target.value))}}/>

      <label> Length: {length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input 
        type="checkbox" 
         defaultChecked={numberAllowed}
         id="numberInput" 
         onChange={()=>{
            setNumberAllowed((prev)=>!prev);
         }}/>
        <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input 
        type="checkbox" 
        defaultChecked={charAllowed}
        id="characterInput"
        onChange={()=>{
          setCharAllowed((prev)=>!prev);
        }}/>
        <label htmlFor="characterInput">Characters</label>
    </div>
    </div>
    </div>
    </>
  )
}

export default App
