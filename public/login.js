function Login(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [name, setName] = React.useState(''); 

  const ctx = React.useContext(UserContext);
  let user = ctx.user;

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
       body={show 
      ? 
       ( <LoginForm 
          user={props.user}
          setShow={setShow} 
          setStatus={setStatus}/> 
        ) : (
        <LoginMsg 
        //  user={props.user} //trying
          setShow={setShow} 
          setStatus={setStatus}/> )
    }
    />
  ) 
}

function LoginMsg(props){
  const ctx = React.useContext(UserContext);
  let user = ctx.user;
     
   console.log('trying to find users name:', ctx.name);

  return(<>
    <h5>Welcome back,</h5>
    <h5> {ctx.user}!</h5>
    <h6>You are successfully logged in.</h6>
    <h6>Your balance is ${ctx.balance}</h6> <br />
   
    <button 
      type="submit" 
      className="btn btn-light" >
      <a href="#/deposit/">Make a Deposit</a>
    </button> 
    <br /> <br/>
    <button 
      type="submit" 
      className="btn btn-light" >
      <a href="#/withdraw/">Make a Withdrawal</a>
    </button>
  </>
  );
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [user, setUser] = React.useState('');
  const [update, setUpdate] = React.useState('');
 
  const ctx = React.useContext(UserContext);
  // const [name, setName] = React.useState('');
  console.log('username:', user);

  function handleEmailLogin(){
    let user = ctx.user;
    console.log('login area username: ', ctx);
    // user.name = ctx.user.name;

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
        fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
           const data = JSON.parse(text);
            props.setStatus('');
            // props.setStatus(JSON.stringify(data.name));
            setUser(data.name);  
            ctx.user = data.name;
            ctx.email = data.email;
            ctx.balance = data.balance;            
            props.setShow(false);
           
            props.setStatus('');
            console.log('JSON:', data);
            // setName(ctx.user.name);
            let activeuser = document.getElementById('activeuser');
            activeuser.innerText = ctx.user;
          }) 
          promise.catch(e => console.log('promise message:',e.message));
          } 
          //   else  {
          
          //   alert('email or password was incorrect');
          //   setTimeout(() => setStatus(''), 2000);
          //   setEmail('');
          //   setPassword('');
          //   setUpdate(false);
          // }
       
      })    
     
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
        onClick={handleEmailLogin}>Login with Email</button> <br/>
        <br />

        <button 
        type="submit" 
        className="btn btn-light" 
        id="google-submit-button"
        disabled={(password && email) ?false:true}
        onClick={handleGoogleLogin}>Login with Google</button> <br/>    
    </>
    ) 
 }


  
