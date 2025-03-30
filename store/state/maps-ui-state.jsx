import { useState } from 'react';

const useMapsUIState = () => {
  const [pingConfirm, setPingConfirm] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  return {
    pingConfirm,
    setPingConfirm,
    showLegend,
    setShowLegend,
    showEmergencyAlert,
    setShowEmergencyAlert
  };
};

export default useMapsUIState;