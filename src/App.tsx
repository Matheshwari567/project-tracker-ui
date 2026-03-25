import { useState } from "react";
import KanbanBoard from "./components/kanban/kabanboard";
import ListView from "./components/kanban/Listview";
function App(){
  const [view,setView]=useState<"kanban" | "list">("kanban");
  const [tasks,setTasks]=useState([
    {id:1,title:"design UI",status:"todo",priority:"high",dueDate:"27-03-2026"},
    {id:2,title:"API work",status:"inprogress",priority:"high",dueDate:"29-03-2026"},
    {id:3,title:"Testing",status:"todo",priority:"low",dueDate:"30-03-2026"},
    {id:4,title:"frontend ",status:"inprogress",priority:"high",dueDate:"20-03-2026"},
    {id:5,title:"Backend",status:"done",priority:"low",dueDate:"23-03-2026"},
    {id:6,title:"design",status:"done",priority:"high",dueDate:"21-03-2026"}

]);
return(
  <>
  <div>
    <div style={{
      marginBottom:"20px"
    }}>
      <button onClick={()=>setView("kanban")} style={{margin:"10px",height:"40px",width:"200px"}}>Kanban</button>
      <button onClick={()=>setView("list")}style={{margin:"10px",height:"40px",width:"200px"}}>list</button>
    </div>
    {view === "kanban" ? (<KanbanBoard tasks={tasks} setTasks={setTasks}/>) : (
      <ListView tasks={tasks} setTasks={setTasks}/>)}
    
      </div>
  </>
)
}
export default App;