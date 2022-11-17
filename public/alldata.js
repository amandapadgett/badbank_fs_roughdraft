function AllData(){
  const [data, setData] = React.useState('')
 
  React.useEffect(() => {
   //fetch all acounts from API
   fetch('/account/all')
     .then(response => response.json())
     .then(data => {
       setData(data);
      //setData(JSON.stringify(data));

       console.log('last user created: ', data[data.length - 1]); 
       console.log('first user created: ', data[0]);
     })
  }, []);
 
   return (
     <>
     
     
     </>
   );
 }



// function AllData(){
//   const [data, setData] = React.useState('')
 
//   React.useEffect(() => {
//    //fetch all acounts from API
//    fetch('/account/all')
//      .then(response => response.json())
//      .then(data => {
//        console.log('last user created: ', data[data.length - 1]); console.log('first user created: ', data[0])
//        setData(JSON.stringify(data));
//      })
//   }, []);
 
//    return (
//      <>
//       <h5>All Data in Store</h5>
//      {data}<br/> 
     
//      </>
//    );
//  }