import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackEnd_URI from "../Utils/BackEnd_URI";

const UploadLesson = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    title: "",
    videoUrl: "",
    duration: "",
  });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("LMSUser");

      const res = await fetch(`${BackEnd_URI}/api/course/${courseId}/lesson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lesson),
      });

      const data = await res.json();

      if (data.success) {
        alert("Lesson uploaded successfully");
        setLesson({
          title: "",
          videoUrl: "",
          duration: "",
        });
        navigate(`/course/${courseId}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Lesson</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Lesson Title"
          value={lesson.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={lesson.videoUrl}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={lesson.duration}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Upload Lesson
        </button>
      </form>
    </div>
  );
};

export default UploadLesson;
