function Withdraw(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus]  = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);
  let user = ctx.user;

  console.log('user and balance:',user, ctx.balance);
      
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
  <h5>Withdrawal Complete, {user}!</h5>
  <h6>Current Balance: ${ctx.balance} </h6>
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
  const [update, setUpdate] = React.useState('');
  const [name, setName] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [balance, setBalance] = React.useState('');
  const ctx = React.useContext(UserContext);
   
  

  function handle() {
    let user = ctx.user;
      
    console.log('this is the amount:', amount);
    console.log('this is the user:', user);
    console.log('this is user balance:', ctx.balance);
    
    //I did it!!! yay!
    //not now. of course I broke something and hadn't saved to Git

    if(amount < ctx.balance) {
        ctx.balance = Number(ctx.balance) - Number(amount);
        setUpdate(false);
        setShow(true);

      fetch(`/account/update/${user.email}/${-amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus(JSON.stringify(data.amount));
              props.setShow(false);
              console.log('JSON:', data);
            //   setName(ctx.user.name);
            //   setBalance(data.balance);
              ctx.email = data.email;
              ctx.balance = data.balance;
              console.log('username:',ctx.user.name);
              console.log('user balance:', ctx.balance)
          } catch(err) {
              props.setStatus('Withdrawal failed');
              console.log('err:', text);
          }
        })
   
        } else {
            alert('You do not have enough money in your account to withdraw that amount.');
            setStatus('Transaction failed.');
            setTimeout(() => setStatus(''), 2000);
            setAmount('');
            setShow(true);
            setUpdate(false);
            }
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
