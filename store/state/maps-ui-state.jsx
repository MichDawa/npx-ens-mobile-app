import { useState } from 'react';

const useMapsUIState = () => {
  const [pingConfirm, setPingConfirm] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  return {
    pingConfirm,
    setPingConfirm,
    showLegend,
    setShowLegend
  };
};

export default useMapsUIState;