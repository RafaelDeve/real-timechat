import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./styles.css";
import Cajitaazul from "./cajitaazul";
import Cajitachat from "./cajitachat";
import { Fade } from "react-awesome-reveal";

const chatSocket = new WebSocket("ws://54.157.14.35:8000/ws/chat/1111/");

function App() {
  const [puerta, setpuerta] = useState(true);
  const [nombre, setnombre] = useState("");
  const [msj, setmsj] = useState("");
  const [conversacion, setconversacion] = useState([]);
  const chatEndRef = useRef(null); // Referencia al final de la conversación
  const audioRef = useRef(null); // Referencia al objeto de audio principal
  const audioRefEntrada = useRef(null);

  function captura_nombre(e) {
    setnombre(e.value);
  }

  function actualizarMsj(e) {
    setmsj(e.value);
  }

  function enviar(e) {
    chatSocket.send(
      JSON.stringify({
        type: "message",
        message: msj,
        name: nombre,
      })
    );
    setmsj("");
    e.preventDefault();
  }


  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    audioRefEntrada.current = new Audio('/entrada.mp3'); // Si tienes otro archivo de audio
  }, []);
  
  useEffect(() => {
    chatSocket.onopen = () => {
      console.log("WebSocket conectado");
    };
    chatSocket.onclose = () => {
      console.log("WebSocket desconectado");
    };

    chatSocket.onmessage = (message) => {
      const dataFromserver = JSON.parse(message.data);
      if (dataFromserver) {
        setconversacion((prevConversacion) => [
          ...prevConversacion,
          {
            msg: dataFromserver.message,
            name: dataFromserver.name,
          },
        ]);
        if (audioRef.current) {
          audioRef.current.play();
        } else if (audioRefEntrada.current) {
          audioRefEntrada.current.play();
        }
        
      }
    };

    return () => {
      chatSocket.close();
    };
  }, []);

  // Efecto para desplazar la vista al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversacion]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el comportamiento por defecto del Enter, si es necesario
      enviar(e); // Llama a la función enviar
    }
  };

  if (puerta) {
    return (
      <div className="bg-[#090524] h-screen w-screen flex flex-col items-center justify-center font-['Source Sans Pro']">
        <label className="text-white w-[13rem] text-center text-2xl font-medium font-['Source Sans Pro'] pb-4">Ingresa tu nombre de usuario</label>
        <input type="text" onChange={(e) => captura_nombre(e.target)} placeholder="Type here" className="input text-white input-bordered w-full max-w-xs border-white bg-transparent" />
        <button className="text-white my-5 py-4 border-none px-[7.6rem] font-bold btn bg-[#3974FF] hover:bg-[#1b3779] active:bg-[#efefef] active:text-[#3974FF] font-['Source Sans Pro']"
          onClick={() => {
            setpuerta(false);
          }}
        >
          {" "}
          INGRESAR
        </button>
      </div>
    );
  } else {
    return (
      
      <div className="bg-[#090524] h-screen w-screen flex items-center justify-center">
        <Fade cascade damping={100}>
        <div className="bg-[#0d082c] shadow-custom-light hover:shadow-custom-dark transition-shadow duration-1000 ease-in-out  rounded-[0.5rem]  w-[1110px] h-[819px] flex-col justify-center items-start inline-flex query-1">
          <div className="bg-[#3974FF] w-full h-[14.5rem] rounded-t-[0.5rem]">
            <div className="mx-10 my-7 space-y-3">
            <div className="w-[65px] h-[65px] bg-white rounded-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M15.1667 0H5.83333C2.61683 0 0 2.6164 0 5.83236V20.8262C0 21.7512 0.5075 22.5981 1.323 23.0355C1.694 23.235 2.10117 23.3329 2.50717 23.3329C2.9925 23.3329 3.47667 23.1918 3.89667 22.913L8.52017 19.83H15.1667C18.3832 19.83 21 17.2136 21 13.9977V5.83236C21 2.6164 18.3832 0 15.1667 0ZM28 10.4983V25.4921C28 26.4171 27.4925 27.264 26.677 27.7014C26.306 27.9008 25.8988 27.9988 25.4928 28C25.0075 28 24.5233 27.8589 24.1045 27.5801L19.4798 24.4959H12.8333C11.1417 24.4959 9.6285 23.7599 8.56217 22.6062L9.226 22.163H15.1667C19.6688 22.163 23.3333 18.4991 23.3333 13.9977V5.83236C23.3333 5.47309 23.3018 5.12315 23.2575 4.77554C25.9537 5.28879 28 7.65556 28 10.4983Z"
                  fill="#13C6FF"
                />
              </svg>
            </div>
            <h1 className="text-white text-3xl font-bold font-['Source Sans Pro']">LiveConnect</h1>
            <h4 className=" w-[700px] text-white text-base font-normal font-['Source Sans Pro'] leading-7">LiveConnect is a real-time chat application that uses Django Channels for the backend and React for the frontend, leveraging WebSockets to provide instant and smooth communication.</h4>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 bg-transparent w-full">
            {conversacion.map((m, index) => (
              <>
                {m.name === nombre ? (
                  <Cajitachat key={index} data={m}></Cajitachat>
                ) : (
                  <Cajitaazul key={index} data={m}></Cajitaazul>
                )}
              </>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form
            onKeyDown={handleKeyDown}
            className="w-full h-20 flex items-center border-t-2 border-white border-opacity-5"
          >
            <input
              type="text"
              value={msj}
              onChange={(e) => actualizarMsj(e.target)}
              placeholder="Type here"
              className="input text-white mx-10 my-3 bg-transparent color-white w-[55rem] max-w-lg] border-none "
            />
            {/* <input className="chat" type="text" value={msj} onChange={(e) => actualizarMsj(e.target)} /> */}
            <button
              className="w-10 h-10 bg-[#4629f2] flex items-center justify-center  rounded-[6rem] mx-12"
              onClick={(e) => {
                enviar(e);
              }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>{" "}
            </button>
          </form>
        </div>
        </Fade>
      </div>
    );
  }
}

export default App;
