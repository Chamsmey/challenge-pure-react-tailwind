import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { LuGripVertical } from "react-icons/lu";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiCircle } from "react-icons/fi";
import { CourseContext } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
const EditPage = () => {
  let { getCourseById,updateCourse } = useContext(CourseContext);
  let param = useParams();
  const [newCourse, setNewCourse] = useState(null);

  useEffect(() => {
    let courseForUpdate = getCourseById(param.id);
    setNewCourse(courseForUpdate);
  }, [getCourseById, param.id]);

  // handle inputs
  const handleCourse = (e) => {
    let { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChapter = (e) => {
    e.preventDefault();

    let { id, value } = e.target;
    let course = { ...newCourse };
    let chapter = course.chapters.find((c) => c.id === id);
    chapter.title = value;

    setNewCourse(course);
  };

  const handleInputLesson = (e, chapterId) => {
    e.preventDefault();
    const { id, value } = e.target;
    let course = { ...newCourse };
    let chapter = course.chapters.find((c) => c.id === chapterId);
    let lesson = chapter.lessons.find((l) => l.id === id);
    lesson.title = value;
    setNewCourse(course);
  };

  /// actions modifle lesson
  const addNewLesssonToChapter = (e, chapterId) => {
    e.preventDefault();
    let idGenerator = uuidv4().toString();
    let newLesson = { title: "", id: idGenerator };
    let course = { ...newCourse };
    let chapterById = course.chapters.find(
      (chapter) => chapter.id === chapterId
    );
    chapterById.lessons = [...chapterById.lessons, newLesson];
    setNewCourse(course);
  };

  const destroyLessonById = (lessonId, chapterId, e) => {
    e.preventDefault();
    let course = { ...newCourse };
    let chapterById = course.chapters.find(
      (chapter) => chapter.id === chapterId
    );
    chapterById.lessons = chapterById.lessons.filter(
      (lesson) => lesson.id !== lessonId
    );
    setNewCourse(course);
  };

  // chapter
  const destroyChapterById = (chapterId, e) => {
    e.preventDefault();
    let course = { ...newCourse };
    let chapters = course.chapters.filter(
      (chapter) => chapter.id !== chapterId
    );
    course.chapters = chapters;
    console.log(course);

    setNewCourse(course);
  };

  const addNewChapter = (e) => {
    e.preventDefault();
    let idGenerator = uuidv4().toString();
    let newChapter = {
      title: "",
      id: idGenerator,
      lessons: [],
    };
    let course = { ...newCourse };
    // let mergeChapters = course.chapters;
    course.chapters = [...course.chapters, newChapter];
    setNewCourse(course);
  };
  // handle submit
  let navigate = useNavigate();
  const submit = (e,courseId) => {
      e.preventDefault();
      
      updateCourse(courseId,newCourse);
    navigate("/");
  };
  return (
    <div className="w-2/3 m-auto ">
      {/* // form header */}
      <div>
        <h1 className="text-center text-xl font-bold">update course</h1>
      </div>

          {newCourse ? <form
              className="relative place-content-center bg-gray-100 gap-2 border p-2 shadow-sm"
              action=""
          >
              <div className="my-2">
                  <input
                      onChange={handleCourse}
                      name="title"
                      value={newCourse.title}
                      type="text"
                      className="w-full  outline-none outline-1 p-2"
                      placeholder="course..."
                  />
                  <input
                      onChange={handleCourse}
                      name="summarize"
                      value={newCourse.summarize}
                      type="text"
                      className="w-full  outline-none outline-1 my-2 p-2"
                      placeholder="summarize..."
                  />
              </div>
              {newCourse.chapters.map((chapter) => (
                  <div className=" flex gap-3 items-start">
                      <div className="relative p-2">
                          <LuGripVertical className="absolute top-4" />
                      </div>
                      <div className="w-full">
                          <div className="flex items-center gap-2">
                              <input
                                  value={chapter.title}
                                  onChange={handleInputChapter}
                                  name="chapter"
                                  id={chapter.id}
                                  type="text"
                                  className="focus:outline-none w-full outline-1 p-2"
                                  placeholder="chappter..."
                              />
                              <button onClick={(e) => destroyChapterById(chapter.id, e)}>
                                  <AiOutlineClose className="scale-110" />
                              </button>
                          </div>
                          {chapter.lessons.map((lesson) => (
                              <div className="flex gap-2 items-center justify-end">
                                  <FiCircle />
                                  <input
                                      onChange={(e) => handleInputLesson(e, chapter.id)}
                                      value={lesson.title}
                                      name="lesson"
                                      id={lesson.id}
                                      type="text"
                                      className="border-b-2  focus:outline-none w-[96%] my-2  p-2"
                                      placeholder="lesson..."
                                  />{" "}
                                  <button
                                      onClick={(e) => destroyLessonById(lesson.id, chapter.id, e)}
                                  >
                                      <AiOutlineClose className="scale-110" />
                                  </button>
                              </div>
                          ))}

                          <section className=" flex gap-2 items-center  border-gray-500 my-2">
                              {/* <CiCirclePlus className="" />{" "} */}
                              <button
                                  onClick={(e) => addNewLesssonToChapter(e, chapter.id)}
                                  className="hover:underline"
                              >
                                  new lesson
                              </button>
                          </section>
                      </div>
                      {/* <div className="flex gap-2">
              <button className="p-2 rounded h-10 bg-red-300">cancel</button>
              <button className="p-2 rounded  h-10 bg-blue-300">save</button>
            </div> */}
                  </div>
              ))}

              {/* form footer */}
              <div className="flex justify-end gap-1 border-t-2 py-2">
                  <button
                      onClick={addNewChapter}
                      className=" flex gap-2 items-center border rounded-2xl bg-blue-200/70 p-2 px-4"
                  >
                      <CiCirclePlus className="" /> new Chapter
                  </button>
                  <button
                      onClick={(e)=>submit(e,newCourse.id)}
                      className="p-2 px-4 bg-gray-100 border  rounded-2xl bg-green-200/70 "
                  >
                      save
                  </button>
              </div>
          </form>
              : <div className="text-center my-12 text-xl">No Data</div>
          }
    </div>
  );
};

export default EditPage;
