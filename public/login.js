function Login() {
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState('false');
    const [email, setEmail]     = React.useState('');
    const [password, setPassword] = React.useState('');
      
    
  function handleLogin() {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        console.log(firebaseUser)
        fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text)
            setStatus('');
            setShow('false');
            setUser(data);
            console.log('JSON:', data);
          } catch(err) {
            setStatus(text);
            console.log('err:', text);
          }
        });
      }
    });
    promise.catch((e) => console.log(e.message))
  }

   
    function clearForm() {
        
        setEmail('');
        setPassword('');
        setShow(true);
    }
    return (
    
        <Card 
        bgcolor="primary"
        txtcolor="white"
        header="LOGIN"
        title="Complete the fields to log into your account."
        status={status}
        body={show ? ( <>

            Email
            <input 
            type="input"
            className="form-control"
            id="emailinput"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)} /> <br/>

            Password
            <input 
            type="password"
            className="form-control"
            id="passwordinput"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)} /> 
            <br/>
            <button 
            type="submit" 
            className="btn btn-light" 
            id="firebase-submit-button"
            // disabled={(password && email) ?false:true}
            onClick={handleLogin}>Login</button>
           
           </> ) : ( <>
           
            <h5>Success!</h5>
            <button 
            type="submit" 
            className="btn btn-light" 
            onClick={clearForm}
            >Login</button>
            
            </> )
            }
        
        />
        ) 

}
