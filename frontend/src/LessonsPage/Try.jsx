    //How to use:
    //lessons1[0].name is the first row in the table of lessons in the database and lessons1[1].name is the second row and so on
    //.name is the name of the lesson in your dummy data = a-c, e-h, i-l, m-p
    // .lessonsNum is the index of the lesson 1-9 is letters 10-20 is words and sentences have no lessons
    // .finished is boolean 0 or 1 if the lesson is finished or not to lock the next lesson if the current lesson is not finished
    //.level 1: for letters and 2 for words
    // .signs is string carrying the signs file name that is used in the lesson
    //use this function to get the data from the database and list the lessons like you did with the dummy data

    import {useEffect, useState} from "react";
    import httpClient from "../components/httpClient.jsx";

    const [lessons1, setLessons] = useState([]);
   useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const response = await httpClient.get("/lessons");
                const fetchedLessons = response.data.map(lesson => ({
                    name: lesson.L_text,
                    lessonsNum: lesson.L_no,
                    finished: lesson.L_isFinished,
                    level: lesson.L_level,
                    signs: lesson.L_image,

                }));
                setLessons(fetchedLessons);
            } catch (error) {
                console.error("Error fetching lessons data:", error);
            }
        };
        fetchLessonData();
    }, []);

   const [user, setLessonScore] = useState(0);
   useEffect(() => {
        const fetchLessonScore = async () => {
            try {
                const response = await httpClient.get("/@me");
                const FetchedLessonScore = response.data
                setLessonScore(FetchedLessonScore);
            }
             catch (error) {
                console.error("Error fetching lesson score:", error);
            }
        };
        fetchLessonScore(); //use this to get it: user.lesson_score
    }, []);

   //A function that fetches the next question sign from the database
    const getNextQuestionSign = async () => {
        try {
            const response = await httpClient.get("/next_question_sign");
            if (response.status === 200) {
                console.log(response.data);//replace with actual logic
            } else {
                console.error("Failed to fetch the next question");
            }
        } catch (error) {
            console.error("Error fetching the next question:", error);
        }
    };
   //A function that takes the updated lesson score and the user id and updates the lesson score in the database

    const updateLessonScore = async (userId, newLessonScore) => {
        try {
            const response = await httpClient.post("/update_lesson_score", {
                user_id: userId,
                lesson_score: newLessonScore
            });
            if (response.status === 207) {
                console.log("Lesson score updated successfully");
            } else {
                console.error("Failed to update lesson score");
            }
        } catch (error) {
            console.error("Error updating lesson score:", error);
        }
    };



    fetchLessonData();

    useEffect(() => {
        fetchLessonData();
    }, []);
