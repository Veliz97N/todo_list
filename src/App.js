import { useState,useEffect } from 'react';
import BarraSuperior from "./Componentes/Barra_superior"
import FilaTareas from "./Componentes/FilaTareas";
import FetchTareas from './FetchNoTanFetch/Listado_tareas';
import AgregarTareas from "./Componentes/AgregarTareas";
import TareasCompletas from "./Componentes/TareasCompletas";

function App() {
  const [user, setUser] = useState("Nicolas");
  const [ListaTareasGlobal, setListaTareas] = useState(FetchTareas());
  const [isTareasPendientes, setIsTareasPendientes] = useState(true);
  
  const GeneradorFilaTarea = () =>  {
  return ListaTareasGlobal.map(tarea=>(!tarea.done && <FilaTareas tarea={tarea} key={tarea.nombre} toggleTarea={toggleTarea} visibilidad="Invisible"/> //Si el estado de tarea es falso entonces no se agregara esa tarea al div contenedor_tareas_interno
      ))
  }
  const GeneradorFilaTareaPendiente = () =>  {
    return ListaTareasGlobal.map(tarea=>(tarea.done && <FilaTareas tarea={tarea} key={tarea.nombre} toggleTarea={toggleTarea} visibilidad="Visible" /> //Si el estado de tarea es falso entonces no se agregara esa tarea al div contenedor_tareas_interno
        ))
    }
  const toggleTarea=(task)=>{
    
    setListaTareas(ListaTareasGlobal.map(tarea=>{
      let bool=tarea.done
      return(tarea.nombre===task.nombre?{...tarea,done:!bool}:tarea)}));    //ACA SOLO LE ESTAMOS DICIENDO TRUE
    if(ListaTareasGlobal.filter(t=>!t.done).length>1){ //Esto es para ver si hay tareas pendientes, nada mas 
      setIsTareasPendientes(true)
    }
    else{
      setIsTareasPendientes(false)
    }
  }
  const handleApproved=()=>{    
    console.log("Checked papi")
  }
  const handleDelete=()=>{
    console.log("Eliminada mi rey")
  }
  const AgregarNuevaTarea=(nombreTarea)=>{//ACA SE AGREGA UNA NUEVA LISTA PARA CADA TAREA PENDIENTE
    if(!ListaTareasGlobal.find(tarea=>tarea.nombre===nombreTarea)){
      setListaTareas([...ListaTareasGlobal,{nombre:nombreTarea, done:false}])
    }
  }  

  return (
    <div className="App">
      <BarraSuperior usuario={user} ListaTareas={ListaTareasGlobal} />
      <div className="contenedor_tareas_externo">
          <AgregarTareas AgregarNuevaTarea={AgregarNuevaTarea} setIsTareasPendientes={setIsTareasPendientes}/>
        <div className="contenedor_tareas_interno">
          {isTareasPendientes ? GeneradorFilaTarea():<p id="NoHayTareas">No tasks, add a task</p>}
        </div>
        <TareasCompletas pasarTareaAPendientes={handleApproved} eliminarTareaDefinitivamente={handleDelete} ListaTareasGlobal={ListaTareasGlobal} GeneradorFilaTareasPendientes={GeneradorFilaTareaPendiente()}/>
      </div>
    </div>
  );
}
export default App;
