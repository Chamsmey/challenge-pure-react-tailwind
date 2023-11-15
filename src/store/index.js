
import React from "react"
// import { Course } from "../model"
let CourseContext = React.createContext()

    // interface CourseProps {
    //     children: React.ReactNode
    // }


const CourseProvider = ({children}) => {

    const [courses, setCourses] = React.useState([
       
    ])

    // actions 
    const getCourseById = (id) => { 
        return courses?.find(c => c.id);
        
    }
    const updateCourse = (id, dataUpdate) => {
        setCourses(courses?.map(course => {
            if (course.id === id) {
                return { ...course, ...dataUpdate }
            }
            else {
                return course
            }
    
       }))

    }
    
    const destroyCourse = (id) => { 
        setCourses(courses?.filter(c => c.id !==id  ))
    }

    const addCourse = (newCourse) => { 

        setCourses([...courses, newCourse])
    }
    return (
        <CourseContext.Provider value={ {courses, setCourses, getCourseById,updateCourse,destroyCourse,addCourse}} >
            
        {children}
        </CourseContext.Provider>
    )
}


export { CourseContext };
export default CourseProvider;