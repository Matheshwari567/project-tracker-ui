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
const ListView=({tasks,setTasks} : Props)=>{
    const [sortField,setSortField]=useState("title");
    const [sortOrder,setSortOrder]=useState("asc");
    const sortedTasks = [...tasks].sort((a,b)=>{
  if (sortField === "title"){
      return sortOrder==="asc" ? a.title.localeCompare(b.title):b.title.localeCompare(a.title);
}
 return 0;
    });
    // virtual scroll
    const rowHeight=50;
    const visibleCount=10;
    const [scrollTop,setScrollTop]=useState(0);
    const startIndex=Math.floor(scrollTop/rowHeight);
    const endIndex=startIndex+visibleCount;
    const visibleTasks=sortedTasks.slice(startIndex,endIndex);
return(
<>
    <div style={{margin:"50px"}}>
        <div style={{display:"flex",fontWeight:"bold",padding:"10px",borderBottom:"2px solid black"}}>
                    <div style={{width:"25%"}} onClick={()=>{
                        setSortField("title");
                        setSortOrder(prev=>prev === "asc"? "desc" : "asc");
                    }}>Title</div>
                    <div style={{width:"25%"}}>Status</div>
                    <div style={{width:"25%"}}>Priority</div>
                    <div style={{width:"25%"}}>Due Date</div>
                    </div>
                {/* scroll */}
                <div
                style={{height:"400px",overflow:"auto",border:"1px solid #ccc"}}
                onScroll={(e)=>{
                    setScrollTop(e.currentTarget.scrollTop)
                }}>
                    {/* height */}
                   <div style={{height:sortedTasks.length*rowHeight}}>

                    {/* visible row */}

                    <div style={{transform:`translateY(${startIndex*rowHeight}px)`}}>
                        {visibleTasks.map(task=>(
                            <div key={task.id} style={{
                                height:rowHeight,
                                display:"flex",
                                justifyContent:"space-around",
                                alignItems:"center",
                                padding:"0 10px",
                                borderBottom:"1px solid #eee",
                                background:"white"
                            }}>
                                <div style={{maxWidth:"20%"}}>{task.title}</div>
                                <div style={{maxWidth:"20%"}}><select value={task.status}
                        onChange={(e)=>{
                            setTasks(prev=>prev.map(t=>t.id === task.id ? {...t, status:e.target.value}:t))
                        }} style={{
                            margin:"0",
                            alignItems:"center",
                            padding:"10px 10px",
                            outline:"none",
                            border:"1px solid gray",
                            cursor:"pointer",

                        }}>
                            <option value="todo">TO DO</option>
                            <option value="inprogress">IN PROGRESS</option>
                            <option value="done">DONE</option>
                        </select></div>
                                <div style={{maxWidth:"20%"}}>{task.priority}</div>
                                <div style={{maxWidth:"20%"}}>{task.dueDate}</div>
                            </div>
                        ))}
                    </div>
                    </div> 
                </div>
            </div>
            </>
);
};
export default ListView;