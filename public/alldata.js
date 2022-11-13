function AllData(){
  const [data, setData] = React.useState('')
 
  React.useEffect(() => {
   //fetch all acounts from API
   fetch('/account/all')
     .then(response => response.json())
     .then(data => {
       console.log(data[data.length - 1])
       setData(JSON.stringify(data));
     })
  }, []);
 
   return (
     <>
      <h5>All Data in Store</h5>
     {data}<br/> 
     
     </>
   );
 }