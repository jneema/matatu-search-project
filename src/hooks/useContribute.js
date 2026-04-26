import { useState } from "react";

export function useContribute() {
  const [mode, setMode] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const selectMode = (m) => {
    setMode(m);
    setSubmitted(false);
  };

  const reset = () => {
    setMode(null);
    setSubmitted(false);
  };

  const onSuccess = () => setSubmitted(true);

  const addAnother = () => setSubmitted(false);

  return { mode, submitted, selectMode, reset, onSuccess, addAnother };
}
