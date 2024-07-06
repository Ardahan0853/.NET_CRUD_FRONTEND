import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BrandForm.css'




const BrandForm = () => {

  
  
  
  
  const [brand, setBrand] = useState({  
    name: '',
    role: '', 
    entryTime: ''
  });
  const [data, setData] = useState([])

  const [editPerson, setEditPerson] = useState(null);

  useEffect(() => {
    fetchData()
  }
  ,[]);
 
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5144/api/Person'); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
  
 


  
  

  const shiftEnd = (time) => {
    return time;
  }

  let WorkedTimeOutSide

  const calculateWorkHours = () => {
  
    const currentDate = new Date();
    const day = currentDate.getDate(); // Day of the month (1-31)
    const month = currentDate.getMonth() + 1; // Month (0-11, so we add 1 to get 1-12)
    const year = currentDate.getFullYear()
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Get hours (00-23)
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Get minutes (00-59)
    const entryDate = `${day} / ${month} / ${year} - ${hours}:${minutes}`
    const shiftHours = 21
    const WorkedTime = shiftHours - parseInt(hours);
    console.log(WorkedTime)
    WorkedTimeOutSide = WorkedTime
    const currentTime = `${hours}:${minutes}`;
    return entryDate
    
    
     
  }
  


  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    
      setBrand((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
        entryTime: calculateWorkHours()
      }));
    
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submitting brand:', brand);
    
    try {
      const response = await axios.post('http://localhost:5144/api/Person', brand);
      console.log('Brand created:', response.data);
      
      // After successful submission, update UI with latest data

      
      

      await fetchData();
      setBrand({
        name: '',
      entryTime:'',
      role: ''
      
      })
      
      
    } catch (error) {
      console.error('There was an error creating the brand!', error);
      console.error('Error details:', error.response.data); // Log error details
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5144/api/Person/${id}`);
        await fetchData();
    } catch (error) {
        console.error('There was an error deleting the person!', error);
    }
};

const handleEdit = (person) => {
  setEditPerson(person); // Set the person being edited
};

const handleEditChange = (e) => {
  const { name, type, checked, value } = e.target;
  setEditPerson((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
  }));
};

const handleUpdate = async (e) => {
  e.preventDefault();
  console.log(editPerson)
  try {
      await axios.put(`http://localhost:5144/api/Person/${editPerson.id}`, editPerson);
      await fetchData();
      setEditPerson(null); // Clear the edit form
  } catch (error) {
      console.error('There was an error updating the person!', error);
  }
};
  

  return (
    <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={brand.name} onChange={handleChange} required />
                </div>
                
                <div>
                    <label>Role:</label>
                    <input type="text" name="role" value={brand.role} onChange={handleChange} required />
                </div>
                
                <button type="submit">Submit</button>
            </form>
            <div className="person-list">
                <h1>Person List</h1>
                <ul>
                    {data.map((person) => (
                        <li key={person.id} className='li-item-flex'>
                            {person.name} - {person.role} - {person.entryTime}
                            <div>
                            <button className='delete' onClick={() => handleDelete(person.id)}>Delete</button>
                            <button className='edit' onClick={() => handleEdit(person)}>Edit</button>
                            </div>
                            
                        </li>
                        
                    ))}
                </ul>
                {editPerson && (
                <form onSubmit={handleUpdate} className="edit-form">
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={editPerson.name} onChange={handleEditChange} required />
                    </div>
              
                    <div>
                        <label>Role:</label>
                        <input type="text" name="role" value={editPerson.role} onChange={handleEditChange} required />
                    </div>
                    
                    <button onClick={handleUpdate} className='update' type="submit">Update</button>
                </form>
            )}
            </div>
        </div>
  );
};

export default BrandForm;
