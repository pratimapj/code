import React,{useState, useEffect} from 'react';

import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest } from '../store/actions';
import Modal from './Modal';
//import { Employee } from '../interfaces/EmployeeInterface';
import EmployeeDetailsModal from './EmployeeDetailsModal';
const EmployeeList = () => {

  

  /* const styles={
    modalContainer:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      },
    avatar:{ width: 100, height: 100 },
    bio: { marginTop: 2 },
    job: { marginBottom: 1 }
}
  */

const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

const [selectedEmployee, setSelectedEmployee] = useState(null);
const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const employees = useSelector((state) => state?.data?.employees);
  const {  status, error } = useSelector((state) => state);
console.log('employees', employees)

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('firstName');
  const [order, setOrder] = useState('asc');
  const employeesPerPage = 5;

 // const selectedEmployee: Employee = 
  
  const data = useSelector((state)=>{
    console.log('state 111',state)
  });
  const filteredEmployees = employees?.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(query) ||
      employee.lastName.toLowerCase().includes(query) ||
      employee.contactNo.toLowerCase().includes(query) ||
      employee.address.toLowerCase().includes(query)
    );
  });

  const sortedEmployees = filteredEmployees?.sort((a, b) => {
    console.log("order 11",order)
    console.log("orderBy 12",orderBy)
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const displayedEmployees = sortedEmployees?.slice(
    (page - 1) * employeesPerPage,
    page * employeesPerPage
  );

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  return (
    <div style={{ border: "1px solid black", height:'85%', width:"98%", padding:10}}>
    <div style={{display:'flex', justifyContent:'space-between', padding:15}}>
    <span>comany name</span>
      <div style={{}}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '8px',
          margin: '10px',
          width: '200px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
         <button style={{marginLeft:15}}>Search</button>
        </div>
    </div>
    
    {/* <div style={{width:'100%', borderCollapse:'collapse'}}> */}
      <table style={{display: 'table', borderCollapse:'separate' , boxSizing:'border-box', textIndent:'initial', borderSpacing:'2px', border:"1px solid lightgrey",width:'100%', marginTop:20, fontFamily: "'Roboto', 'Helvetica' , 'Arial', 'sans-serif'", 
        fontWeight: '400',
        fontSize: '0.875rem',
      }}>
        <thead style={{padding:8,  borderBottom:"1px solid lightgrey",  lineHight: '1.43',
        letterSpacing: '0.01071em',}}>
          <tr style={{ color: 'inherit',display:'table-row',verticalAlign:'middle', outline: 0, border:"1px solid lightgrey" }}>
            <th style={{width:"25%", textAlign:'left', padding:'16px' }}>ID</th>
            <th style={{width:"20%",  textAlign:'left', padding:'16px' }} onClick={() => setOrder(order == 'asc' ? 'dec' : 'asc')}>
              Name  {(order === 'asc' ? '▲' : '▼')} </th>
            <th style={{width:"15%",  textAlign:'left',padding:'16px'  }}> Contact No</th>
            <th style={{width:"30%", textAlign:'left',padding:'16px'  }}>Address</th>
            <th style={{width:"10%", textAlign:'left',padding:'16px'  }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ borderBottom:"1px solid lightgrey",  lineHight: '1.43',
        letterSpacing: '0.01071em',}}>
          {displayedEmployees?.map((row) => (
            <tr key={row.id} style={{ borderBottom:"1px solid lightgrey"}}  onClick={() => handleEmployeeClick(row)}>
              <td style={{padding:'16px'}}>{row.id}</td>
              <td style={{padding:'16px'}}><div><img src={row.avatar} alt="Italian Trulli"/><span>{row.firstName} {row.lastName}</span></div></td>
              <td style={{padding:'16px'}}>{row.contactNo}</td>
              <td style={{padding:'16px'}}>{row.address}</td>
              <td><button className="open-modal-button" onClick={openModal}>
                  Open Modal
               </button></td>
              </tr>
          ))}
        </tbody>
      </table>
      <div style ={{display :'flex', justifyContent:'flex-end', padding:15}}>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(filteredEmployees?.length / employeesPerPage)}
        onPageChange={handlePageChange}
      />

      <EmployeeDetailsModal modalOpen={modalOpen} onClose={closeModal} handleModalClose={() => setModalOpen(false)} selectedEmployee={selectedEmployee} />

    </div>

    <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>My Modal Content</h2>
        <p>This is a simple modal popup in React!</p>
       {}
      </Modal>

     </div>
  );
};

export default EmployeeList;
