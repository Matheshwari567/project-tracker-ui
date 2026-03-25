import type React from "react";
import { useState } from "react";
type task={
    id: number;
    title:string;
    status:string;
    priority:string;
    dueDate:string;
};
type Props={
    tasks : task[];
    setTasks : React.Dispatch<React.SetStateAction<task[]>>;
};
const KanbanBoard=({tasks ,setTasks} : Props)=>{
    // drag
     const handleDragStart =(e: React.DragEvent<HTMLDivElement>,
        id:number)=>{
      e.dataTransfer.setData("taskID",id.toString());
      setDraggedTaskId(id);
     };
    //  drop
    const handleDrop =(e: React.DragEvent<HTMLDivElement>,
        newStatus:string)=>{
       const taskID =Number(e.dataTransfer.getData("taskID"));
       setTasks(prev=>prev.map(Task=>Task.id === taskID ? {...Task, status: newStatus}: Task));
       setDraggedTaskId(null);
    };
    const [dragOverCol,setDragOverCol]=useState<string | null>(null);
    const [draggedTaskId,setDraggedTaskId]=useState<number | null>(null);
    return(
        <>
                <div style={{display:"flex",gap:"150px"}}>

            <div onDragOver={(e)=>{e.preventDefault();
            setDragOverCol("todo");}}
            onDragLeave={()=>setDragOverCol(null)}
            onDrop={(e)=>{handleDrop(e,"todo");
        setDragOverCol(null);}}
        style={{
            padding:"10px",
            background : dragOverCol === "todo" ? " #d0f0ff" : "transparent"
        }}
            >
            {/* todo */}
            <h1>To do</h1>
            {tasks
  .filter(t => t.status === "todo")
  .map(t =>
    draggedTaskId === t.id ? (
      <div
        key={t.id}
        style={{
          height: "40px",
          margin: "10px",
          background: "gray"
        }}
      ></div>
    ) : (
      <div
        key={t.id}
        draggable
        onDragStart={(e) => handleDragStart(e, t.id)}
        style={{
          padding: "10px",
          margin: "5px",
          background: "red",
          color: "white",
          cursor: "grab",
          opacity:draggedTaskId === t.id ? 0.5 : 1 , 
          boxShadow: draggedTaskId === t.id ? "0px 8px 20px rgba(0,0,0,0.3)" : "none",
          transition:"all 0.2s ease"
        }}
      >
        {t.title}
      </div>
    )
  )}
        </div>
        <div onDragOver={(e)=>{e.preventDefault();
            setDragOverCol("inprogress");}}
            onDragLeave={()=>setDragOverCol(null)}
            onDrop={(e)=>{handleDrop(e,"inprogress")
        setDragOverCol(null);}}
        style={{
            padding:"10px",
            background : dragOverCol === "inprogress" ? " #d0f0ff" : "transparent"
        }}>
            {/* In progress */}
            <h1>In Progress</h1>
            {tasks
  .filter(t => t.status === "inprogress")
  .map(t =>
    draggedTaskId === t.id ? (
      <div
        key={t.id}
        style={{
          height: "40px",
          margin: "10px",
          background: "#ccc"
        }}
      ></div>
    ) : (
      <div
        key={t.id}
        draggable
        onDragStart={(e) => handleDragStart(e, t.id)}
        style={{
          padding: "10px",
          margin: "5px",
          background: "blue",
          color: "white",
          cursor: "grab",
          opacity:draggedTaskId === t.id ? 0.5 : 1 , 
          boxShadow: draggedTaskId === t.id ? "0px 8px 20px rgba(0,0,0,0.3)" : "none",
          transition:"all 0.2s ease"
        
        }}
      >
        {t.title}
      </div>
    )
  )}        </div>
        <div onDragOver={(e)=>{e.preventDefault();
            setDragOverCol("done");}}
            onDragLeave={()=>setDragOverCol(null)}
            onDrop={(e)=>{handleDrop(e,"done")
        setDragOverCol(null);}}
        style={{
            padding:"10px",
            background : dragOverCol === "done" ? " #d0f0ff" : "transparent"
        }}>
            {/* Done */}
            <h1>Done</h1>
            {tasks
  .filter(t => t.status === "done")
  .map(t =>
    draggedTaskId === t.id ? (
      <div
        key={t.id}
        style={{
          height: "40px",
          margin: "10px",
          background: "#ccc"
        }}
      ></div>
    ) : (
      <div
        key={t.id}
        draggable
        onDragStart={(e) => handleDragStart(e, t.id)}
        style={{
          padding: "10px",
          margin: "5px",
          background: "green",
          color: "white",
          cursor: "grab",
          opacity:draggedTaskId === t.id ? 0.5 : 1 , 
          boxShadow: draggedTaskId === t.id ? "0px 8px 20px rgba(0,0,0,0.3)" : "none",
          transition:"all 0.2s ease"
        
        }}
      >
        {t.title}
      </div>
    )
  )}        
        </div>
        </div>
        </>
)
}
export default KanbanBoard;