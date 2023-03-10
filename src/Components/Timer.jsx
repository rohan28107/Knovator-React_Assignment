import React, { useRef, useState } from 'react';
import { Button, Stack, Text } from "@chakra-ui/react";


const Timer = () => {
    const [time, setTime] = useState(0);
    const [timeOn, setTimeOn] = useState(false);
    const [timerStage, setTimerStage] = useState("stoppped");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const intervals = useRef();
    const [ modalOpen, setModalOpen] = useState(false);

    const startTimer = () => {
        setTimeOn(true);
        setTimerStage("started");
        intervals.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
    };

    const pauseTimer = () => {
        setTimeOn(false);
        setTimerStage("paused");
        clearInterval(intervals.current);
    }


  return (
    <Stack align={"center"}>
        <Text>
            {new Date(time * 1000).toISOString().substring(11,8)}
        </Text>
        {timerStage === "stopped" && (
            <Button onClick={startTimer}>Start</Button>
        )}
        {
            timerStage === "started" && (
                <>
                    <Button onClick={pauseTimer}>Pause</Button>
                    <Button onClick={() => setModalOpen(true)}>Save</Button>
                </>
            )
        }
        {
            timerStage === "paused" && (
                <>
                    <Button onClick={startTimer}>Start</Button>
                    <Button onClick={() => setModalOpen(true)}>Save</Button>
                </>
            )
        }
    </Stack>
  )
}

export default Timer