function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');   

  const ctx = React.useContext(UserContext);


  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
       body={show 
      ? 
       ( <LoginForm 
          setShow={setShow} 
          setStatus={setStatus}/> 
        ) : (
        <LoginMsg 
         setShow={setShow} 
          setStatus={setStatus}/> )
    }
    />
  ) 
}

function LoginMsg(){
  
  return(<>
    <h5>Successfully Logged In!</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState(true);
  // const setUser = React.useState('');
  const ctx = React.useContext(UserContext);
  let user = ctx.user;


  function handleEmailLogin(){
  
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password
    );

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
        fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
                const data = JSON.parse(text);
                setStatus('');
                setShow(false);
              
                console.log('JSON:', data);
                ctx.user.email = email;
                ctx.user.balance = data.balance;
            })
            .catch((error) => {
              console.log('new err', error);
            });

          }
        }) 
        promise.catch((e) => console.log('this is the failed login error message:', e.message));
       }
      
 
      
  

  function handleGoogleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        const gmail = encodeURI(result.additionalUserInfo.profile.name);
        console.log(gmail);
        fetch(`/account/login/${gmail}/${gmail}`)
        .then(response => response.text())
        .then(async (text) => {
            try {
                const data = JSON.parse(text);
                setStatus('');
                setShow(false);
                setUser(data);
                console.log('JSON:', data);
            } catch(err) {
              console.log(err);
                setStatus(text)
                console.log('err:', text);
                
                const url = `/account/create/${gmail}/${gmail}/${gmail}`;
                await fetch(url);
                const res = await fetch(`/account/login/${gmail}/${gmail}`)
                const text = await res.text();
                const data = JSON.parse(text);
                      setStatus('');
                      setShow(false);
                      setUser(data);
            }
        })
        console.log(ctx);
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
    }
  
  return (
    <>
        Email <br/>
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
        disabled={(password && email) ?false:true}
        onClick={handleEmailLogin}>Email Login</button> <br/>
        <br />

        <button 
        type="submit" 
        className="btn btn-light" 
        id="google-submit-button"
    
        disabled={(password && email) ?false:true}
        onClick={handleGoogleLogin}>Google Login</button> <br/>

    
    
    </>
    ) 
 }


  // return (<>
    
  // Email<br/>
  //   <input type="input" 
  //     className="form-control" 
  //     placeholder="Enter email" 
  //     value={email} 
  //     onChange={e => setEmail(e.currentTarget.value)}/><br/>

  //   Password<br/>
  //   <input type="password" 
  //     className="form-control" 
  //     placeholder="Enter password" 
  //     value={password} 
  //     onChange={e => setPassword(e.currentTarget.value)}/><br/>

  //   <button 
  //     type="submit"
  //     className="btn btn-light" 
  //     onClick={handle}>Login</button>
  //   <br/>
  //   <br/>
  //   <button 
  //     type="submit" 
  //     className="btn btn-light" 
  //     onClick={handleGoogle}>Google Login</button>
  // </>);
