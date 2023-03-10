import React, { useRef, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";


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

    const saveTask = () => {
        setTasks((prevTasks) => [...prevTasks, {title, time}]);
        setModalOpen(false);
        setTitle('');
        setDescription('');
        setTimeOn(false);
        setTimerStage("stopped");
        setTime(0);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setTitle('');
        setDescription('');
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
        <Modal isOpen={modalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stack spacing={4}>
            <Input placeholder="Title" value={title} onChange={handleTitleChange} />
            <Input placeholder="Description" value={description} onChange={handleDescriptionChange} />
          </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={saveTask}>Save</Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack spacing={4}>
        {tasks.map((task, index) => (
          <Text key={index}>
            {task.title} - {new Date(task.time * 1000).toISOString().substr(11, 8)}
          </Text>
        ))}
      </Stack>
    </Stack>
  )
}

export default Timer