//import { Employee } from '../interfaces/EmployeeInterface';
import Modal from './Modal';
const styles={
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



/* type EmployeeDetailsModalProps = {
    modalOpen: boolean;
    handleModalClose: ()=>void;
    selectedEmployee: Employee | null;
} */

const EmployeeDetailsModal = ({modalOpen,closeModal,selectedEmployee}) => {

//const [isModalOpen, setIsModalOpen] = useState(false);

 /* const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);  */
console.log("selectedEmployee 12", selectedEmployee)
    return (
        <Modal isOpen={modalOpen} onClose={closeModal}>
       
        <div display="flex">
        <span alignItems="center" justifyContent={"center"} sx={{ marginRight: 3 }} flexBasis={"30%"}>
          <span
            src={selectedEmployee.avatar}
            alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
            sx={styles.avatar}
          />
          <span alignItems="center" justifyContent={"center"}>
            <span variant="body2" color="textSecondary">
            <strong>Age:</strong> {selectedEmployee.age}
          </span>
          <span variant="body2" color="textSecondary">
            <strong>Joined:</strong> {new Date(selectedEmployee.dateJoined).toLocaleDateString()}
          </span>
          </span>
        </span>
        <div flexBasis={"70%"}>
          <span variant="h6" fontWeight="bold">
            {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
          </span>
          <span variant="body2" color="textSecondary" sx={styles.job}>
            {selectedEmployee.jobTitle}
          </span>
      
          <span variant="body2" sx={styles.bio}>
            {selectedEmployee.bio}
          </span>	
        </div>
      </div>
        </Modal>
    )
}

export default EmployeeDetailsModal