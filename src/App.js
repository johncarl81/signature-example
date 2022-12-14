import {useEffect, useRef, useState} from "react";
import SignaturePad from "signature_pad";

function App() {

  const [signature, setSignature] = useState();

  const signatureRef = useRef(null);

  useEffect(() => {
    const signaturePad = new SignaturePad(signatureRef.current, {
      backgroundColor: '#EFEFEF',
      penColor: 'rgb(0, 0, 0)'
    });

    // Comment out the following to show the original issue:
    const canvas = signatureRef.current;
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value

    signaturePad.addEventListener('endStroke', function() {
      setSignature(signaturePad.toDataURL("image/svg+xml"));
    })
  }, [signatureRef]);

  return (
    <div className="App">
      <header className="App-header">
        <div><canvas id="signature-pad" ref={signatureRef} className="signature-pad" width="500" height="150"/></div>
        <img src={signature} height="150" width="500"/>
      </header>
    </div>
  );
}

export default App;
