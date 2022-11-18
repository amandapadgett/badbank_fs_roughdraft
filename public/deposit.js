function Deposit(props) {
    const [show, setShow] = React.useState(true);
    const [status, setStatus]  = React.useState('');
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);
    let user = ctx.user;

    // console.log('balance:', ctx.balance);
    console.log('context:', ctx)

    return (
        <Card
        bgcolor='success'
        header='Deposit'
        status={status}
        body={show ? 
            (<>
            <DepositForm 
                // user={props.user}
                setShow={setShow}
                setStatus={setStatus}
                // setAmount={setAmount} 
                />
                
                </> ) : (
            <> <DepositMsg 
                setShow={setShow}
                setStatus={setStatus} />
            </>)}
            />
    )
}

function DepositMsg(props) {
    const ctx = React.useContext(UserContext);
    let user = ctx.user;
   return (
        <>
        <h5>Success, {user}!</h5>
        <h6>Current Balance: ${ctx.balance}</h6> <br />
        <button 
            type='submit'
            className='btn btn-light'
            onClick={() => {
                props.setShow(true);
                props.setStatus('');
            }
            }>
            <h6>  Make Another Deposit</h6>
            </button>
        
        </>);
}

function DepositForm(props) {
    const [amount, setAmount] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState('');
    const ctx = React.useContext(UserContext);
    const [name, setName] = React.useState('');
   

    function handleDeposit() {
      
        let user = ctx.user;
        // user.balance = Number(user.balance) + Number(amount);
             
        console.log('this is the amount:', amount);
        console.log('this is the user:', user);
        console.log('this is the user balance:', ctx.balance);

        fetch(`/account/update/${ctx.email}/${amount}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                props.setStatus(JSON.stringify(data.amount));
                props.setShow(false);
            //     console.log('JSON:', data);
            //   setName(ctx.user.name);
             
                // ctx.user = data.name;
                // ctx.email = data.email;
                // ctx.balance = data.balance
                console.log('username:',user, ctx.email);
            } catch(err) {
                props.setStatus('Deposit failed')
                console.log('err:', text);
            }
            
        });
        ctx.balance = Number(ctx.balance) + Number(amount);
        console.log('testing the break:', ctx.balance);
      }

return (
    <>
    {/* <h6>Please log into your account via the Login page before making a deposit.</h6> <br />
        
    User Email <br/>
    <input 
        type="input"
        className="form-control"
        placeholder="Enter account email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)} /> 
        <br /> */}


    Amount <br />
    <input
        type='number'
        className='form-control'
        placeholder='Enter Amount'
        id="amount"
        value={amount}
        onChange={e => setAmount(e.currentTarget.value)} /> <br/>

    <button 
        type='submit'
        className="btn btn-light"
        disabled={amount === '' || amount <= 0 || isNaN(amount)}
        onClick={handleDeposit}>
            Deposit
    </button>
    </>
)
}