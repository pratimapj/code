//import { Employee } from '../interfaces/EmployeeInterface';
import Modal from './Modal';

const EmployeeDetailsModal = ({ modalOpen, onClose, selectedEmployee }) => {
    return (
        <Modal isOpen={modalOpen} onClose={onClose}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                <div style={{ width: "30%", }}>
                    <div style={{ width: 80, height: 80 }}>
                        <image src={selectedEmployee.avatar}></image>
                    </div>
                    <span variant="body2" color="textSecondary">
                        {selectedEmployee.jobTitle}
                    </span><br />
                    <span variant="body2" color="textSecondary">
                        <span style={{ fontWeight: "500" }}>Age:</span> {selectedEmployee.age}
                    </span><br />
                    <span variant="body2" color="textSecondary">
                        {new Date(selectedEmployee.dateJoined).toLocaleDateString()}
                    </span>

                </div>


                <div style={{ width: "70%", marginTop: 25 }}>
                    <h3 variant="h6" fontWeight="bold">
                        {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                    </h3>

                    <span variant="body2">
                        {selectedEmployee.bio}
                    </span>
                </div>


            </div>
        </Modal>
    )
}

export default EmployeeDetailsModal

