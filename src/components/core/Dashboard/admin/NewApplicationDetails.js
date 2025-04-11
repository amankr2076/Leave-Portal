import React, { useEffect, useRef, useState } from 'react'
import LeaveDetails from '../n_user/LeaveDetails'
import LeaveAcceptanceForm from './LeaveAcceptanceForm';
import { useParams } from 'react-router-dom';

const NewApplicationDetails = () => {
  const [choosenOption, setChoosenOption] = useState(false);
  const showOption = true;
  const { applicationID } = useParams();

  const acceptanceRef = useRef(null);

  useEffect(() => {
    if (choosenOption && acceptanceRef.current) {
      // Scroll to the LeaveAcceptanceForm component smoothly
      acceptanceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [choosenOption]);

  return (
    <div>
      <LeaveDetails choosenOption={choosenOption} setChoosenOption={setChoosenOption} />
      
      {choosenOption && (
        <div ref={acceptanceRef}>
          <LeaveAcceptanceForm setChoosenOption={setChoosenOption} applicationID={applicationID} />
        </div>
      )}
    </div>
  )
}

export default NewApplicationDetails
