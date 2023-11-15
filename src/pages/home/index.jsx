import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CourseContext } from "../../store";
export default function List() {
  
  let {courses,destroyCourse} = useContext(CourseContext);
  const onDelete = (id) => {
    destroyCourse(id);
 }
  // console.log(courseCon.courses[0].chapters);
    return ( 
        <div className="w-full font-sans  m-auto text-black">
        <main className="relative">
          <div>
            <h1 className="text-center text-[1.5rem] font-bold">Courses</h1>
            <Link to={'/create'} className="absolute top-0 right-0 rounded-3xl text-white py-3 px-5 bg-gray-400">
              ADD
            </Link>
          </div>
        </main>
        <table className="min-w-[700px] w-full my-6 table-fixed border-collapse border-spacing-3">
          <thead>
            <tr className="border-collapse">
              <th className="border text-left p-2">Name</th>
              <th className="border text-left p-2 border-spacing-2">
                Summarize
              </th>
              <th className="border text-left p-2">Total   Chapter</th>
              <th className="border text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-100">
            {
            
              courses?.map((coures, index) => {
             return (<tr key={index}>
                <td className="border p-2">{coures.title}</td>
                <td className="border p-2">{ coures.summarize}</td>
                <td className="border p-2 text-right">{coures.chapters.length}</td>
                <td className="border p-2">
                  {" "}
                  <Link to={`/edit/${coures.id}`}>Edit</Link> / <button onClick={()=> onDelete(coures.id)}>Delete</button>
                </td>
            </tr>)
                  
              })
             }
          
          </tbody>
        </table>
       { courses.length==0 && <div className="w-full m-auto text-center text-xl">No Data</div>}
      </div>
     );
}
