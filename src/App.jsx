import React, { useState, useEffect, useCallback, useRef } from 'react';

function App() {
  const [lenth, setLenth] = useState(8);
  const [password, setPassword] = useState("");
  const [allowUpperCase, setAllowUpperCase] = useState(false);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowSpecialChar, setAllowSpecialChar] = useState(false);

  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let temp_password = "";
    let str = "abcdefghijklmnopqrstuvwxyz";

    if (allowNumber)  str += "1234567890";
    if (allowSpecialChar)  str += "!@#$%^&*(){}+-*/,.?~`";
    if (allowUpperCase)  str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    for (let index = 1; index <= lenth; index++) {
      let temp_char = Math.floor(Math.random() * str.length);
      temp_password += str.charAt(temp_char);
    }
    setPassword(temp_password);
  }, [lenth, allowNumber, allowSpecialChar, allowUpperCase, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [lenth, allowNumber, allowSpecialChar, allowUpperCase, passwordGenerator]);

  return (
    <>
      <div className="bg-slate-800 w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-cyan-200 font-bold text-4xl mb-8">Password Generator</h1>
        <div className="bg-slate-700 p-8 rounded-lg shadow-lg w-96">
          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              className="w-full p-2 mb-4 text-slate-900 rounded-md"
              placeholder="Generated Password"
              readOnly
              value={password}
              ref={passwordRef}
            />
            <div className='flex items-center mb-4 gap-6'>
              <input 
                className="bg-cyan-500 py-2 px-4 -md hover:bg-cyan-600 cursor-pointer"
                type='range'
                min={6}
                max={24}
                value={lenth}
                onChange={(e) => setLenth(e.target.value)}
              />
              <label className='font-bold text-yellow-100'>{lenth}</label>
              <button className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600"
                onClick={copyPasswordToClipboard}>
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <label className="text-cyan-200 mb-2">
              <input type="checkbox" 
                className="mr-2" 
                checked={allowUpperCase}
                onChange={() => setAllowUpperCase(!allowUpperCase)}
              />
              Include Uppercase Letters
            </label>
            <label className="text-cyan-200 mb-2">
              <input type="checkbox" 
                className="mr-2" 
                checked={allowNumber}
                onChange={() => setAllowNumber(!allowNumber)}
              />
              Include Numbers
            </label>
            <label className="text-cyan-200 mb-2">
              <input type="checkbox" 
                className="mr-2"
                checked={allowSpecialChar}
                onChange={() => setAllowSpecialChar(!allowSpecialChar)}
              />
              Include Special Characters
            </label> 
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
