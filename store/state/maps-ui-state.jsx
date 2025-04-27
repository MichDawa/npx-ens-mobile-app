import { useState } from 'react';

const useMapsUIState = () => {
  const [pingConfirm, setPingConfirm] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [emergencyCoordinates, setEmergencyCoordinates] = useState('');

  return {
    pingConfirm,
    setPingConfirm,
    showLegend,
    setShowLegend,
    showEmergencyAlert,
    setShowEmergencyAlert,
    emergencyCoordinates,
    setEmergencyCoordinates
  };
};

export default useMapsUIState;