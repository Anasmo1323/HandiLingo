import {useEffect, useState} from "react";
import httpClient from "../components/httpClient.jsx";

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



    useEffect(() => {
        fetchLessonData();
        getNextQuestionSign()
    }, []);
