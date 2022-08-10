import { useState, createContext } from "react";

export const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [responseCode, setResponseCode] = useState("");

  return (
    <>
      <ResponseContext.Provider
        value={{
          responseMessage,
          setResponseMessage,
          responseCode,
          setResponseCode,
        }}
      >
        {children}
      </ResponseContext.Provider>
    </>
  );
};
