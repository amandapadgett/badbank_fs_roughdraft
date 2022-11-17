function Withdraw(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus]  = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);
  let user = ctx.user;

      
  return (
      <Card
      bgcolor='warning'
      header='Withdraw'
      status={status}
      body={show ? 
          (<>
          <WithdrawForm 
              user={props.user}
              setShow={setShow}
              setStatus={setStatus}
              setAmount={setAmount} />
              
              </> ) : 
              <> <WithdrawMsg 
                  setShow={setShow}
                  setStatus={setStatus} />
              </>}
              />
  )
}

function WithdrawMsg(props) {
    const ctx = React.useContext(UserContext);
    let user = ctx.user;

  return (<>
  <h5>Withdrawal Complete, {ctx.user.name}!</h5>
  <h6>Current Balance: ${user.balance} </h6>
  <button 
      type='submit'
      className='btn btn-light'
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
          Make Another Withdrawal
      </button>
  
  </>);
}

function WithdrawForm(props) {
  const [amount, setAmount] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [name, setName] = React.useState('');
  const ctx = React.useContext(UserContext);
   
  

  function handle() {
    let user = ctx.user;
    user.balance = Number(user.balance) - Number(amount);
    console.log('this is the amount:', amount);
    console.log('this is the user:', user);
    console.log('this is user balance:', user.balance);
   

      fetch(`/account/update/${user.email}/${-amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus(JSON.stringify(data.amount));
              props.setShow(false);
              console.log('JSON:', data);
              setName(ctx.user.name);
              console.log('username:',ctx.user.name);
          } catch(err) {
              props.setStatus('Withdrawal failed');
              console.log('err:', text);
          }
        //   user.balance = Number(user.balance) - Number(amount);
        //   console.log('this is correct balance:', user.balance);
        //   setBalance(user.balance); //trying it here

    })
   
}

return (
  <>
  User <br/>
  <input 
      type="input"
      className="form-control"
      placeholder="Enter account email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /> 
      <br />


  Amount <br />
  <input
      type='number'
      className='form-control'
      placeholder='Enter Amount'
      value={amount}
     
      onChange={e => setAmount(e.currentTarget.value)} /> <br/>

  <button 
      type='submit'
      className="btn btn-light"
      disabled={amount === '' || amount <= 0 || isNaN(amount)}
      onClick={handle}>
         Withdraw
  </button>
  </>
)
}
