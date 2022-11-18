function Balance(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [balance, setBalance] = React.useState('');

  const ctx = React.useContext(UserContext);
  let user = ctx.user;
  console.log('user and balance:', user, ctx.balance);

  return (
    <Card
      bgcolor='info'
      header='Balance'
      status={status}
      body={
        show ? (
          <>
            <BalanceForm
              // user={props.user}
              setShow={setShow}
              setStatus={setStatus}
              // setBalance={setBalance}
            />
          </>
        ) : (
          <>
           
            <BalanceMsg 
              setShow={setShow}
              setStatus={setStatus} /> 
           
          </>
        )
      }
    />
  );
}
 

function BalanceMsg(props) {
  const ctx = React.useContext(UserContext);
  let user = ctx.user;

  return (
    <>
      <h5>{user}'s Balance:</h5>

      <h5>${ctx.balance}</h5>
      <button
        type="submit"
        className='btn btn-light'
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Check Your Balance Again
      </button> <br />
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  

  function handle() {
    let user = ctx.user;
    console.log('the user is: ', user);
    console.log('this is the user top balance:', ctx.balance);
    
    fetch(`/account/findOne/${ctx.email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data));
          ctx.user = data.name;
          ctx.email = data.email;
          ctx.balance = data.balance;
          props.setStatus(JSON.stringify(data.balance));
          props.setShow(false);
         
          console.log('this is the bottom user:', user);
        } catch (err) {
          props.setStatus(text);
          console.log('the freaking err: ', text);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type='input'
        className='form-control'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <button 
        type='submit' 
        className='btn btn-light' 
        onClick={handle}>
        Check Balance
      </button> <br />
    </>
  );
}
