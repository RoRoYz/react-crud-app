import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [accountName, setAccountName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [accountContact, setAccountContact] = useState('');
  const [accountList, setAccountList] = useState([]);

  const [newContact, setNewContact] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
    .then((response) =>{
      setAccountList(response.data)
    })
  },[])

  const submitAcc = () => {

    Axios.post('http://localhost:3001/api/insert', {
      accountName: accountName, 
      accountEmail: accountEmail, 
      accountContact: accountContact
    });
    
    setAccountList([
      ...accountList, 
      {accountName: accountName, 
        accountEmail: accountEmail, 
        accountContact: accountContact
      }]);
  }

  const deleteAccount = (name) => {
    Axios.delete(`http://localhost:3001/api/delete/${name}`);
    setAccountList(accountList.filter((e) => (e.accountName!== name)));
  }

  const updateAccount = (name) => {
    Axios.put("http://localhost:3001/api/update", {
      accountName: name,
      accountContact: newContact
    });
    setNewContact("");
  }

  return (
    <div class="container">
      <h1>CRUD APPLICATION</h1>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Name</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Jose Rizal" onChange={(e) => {
          setAccountName(e.target.value)
        }} required/>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={(e) => {
          setAccountEmail(e.target.value)
        }}/>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Contact</label>
        <input type="tel" class="form-control" id="exampleFormControlInput1" placeholder="0912-345-6789" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" onChange={(e) => {
          setAccountContact(e.target.value)
        }}/>
      </div>
      <button onClick={submitAcc} class="btn btn-primary">Submit</button>
      <div class="mt-3">
        {accountList.map((val,i) => {
          return (
            <div key={i} class="card">
            <div class="card-body">
              <h3 class="card-title">{val.accountName}</h3>
              <p class="card-text">Email: {val.accountEmail} | Contact: {val.accountContact}</p>
              <button onClick={() => {deleteAccount(val.accountName)}} class="btn btn-danger">Delete</button>
              <input type="tel" onChange={(e) => {
                setNewContact(e.target.value)
              }}/>
              <button onClick={() => {updateAccount(val.accountName)}} class="btn btn-success">Update</button>

            </div>
              
              
              <div class="row justify-content-center">
                
              </div>
              
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
