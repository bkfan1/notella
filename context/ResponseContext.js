import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";

export const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const router = useRouter();

  const [code, setCode] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    setCode(null);
    setMessage(null);


  }, [router])

  const extractCode = (response)=>{
    const {status} = response;
    return status;
  }

  const extractMessage = (response)=>{
    const {data} = response;
    const {message} = data;
    return message;
  }

  return (
    <>
      <ResponseContext.Provider
        value={{
          code,
          setCode,
          message,
          setMessage,
          extractCode,
          extractMessage
        }}
      >
        {children}
      </ResponseContext.Provider>
    </>
  );
};
