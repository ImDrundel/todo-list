"use client"
import { useState } from "react"
import styles from "./page.module.scss"
import ListItem from "./modules/ListItem"
import EnterBox from "./modules/EnterBox"
interface Tasks {
  text: string
  checkbox: boolean
  customColor: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([
    { text: "First", checkbox: false, customColor: "none" },
    { text: "Second", checkbox: false, customColor: "blue" },
    { text: "Third", checkbox: false, customColor: "none" },
    { text: "Last", checkbox: false, customColor: "green" },
  ])
  const [newTask, setNewTask] = useState<Tasks>({
    text: "",
    checkbox: false,
    customColor: "none",
  })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask({
      text: event.target.value,
      checkbox: false,
      customColor: "none",
    })
  }
  function addNewTask(): void {
    if (newTask.text.trim() !== "") {
      setTasks((t) => [...t, newTask])
      setNewTask({ text: "", checkbox: false, customColor: "none" })
    }
  }
  function deleteTask(index: number): void {
    const temporaryTasks = tasks.filter((_, i) => i !== index)
    setTasks(temporaryTasks)
  }
  function moveTaksUp(index: number): void {
    if (index > 0) {
      const temporaryTasks = [...tasks]
      ;[temporaryTasks[index], temporaryTasks[index - 1]] = [
        temporaryTasks[index - 1],
        temporaryTasks[index],
      ]
      setTasks(temporaryTasks)
    }
  }
  function moveTaskDown(index: number): void {
    if (index + 1 < tasks.length) {
      const temporaryTasks = [...tasks]
      ;[temporaryTasks[index], temporaryTasks[index + 1]] = [
        temporaryTasks[index + 1],
        temporaryTasks[index],
      ]
      setTasks(temporaryTasks)
    }
  }
  function compliteTask(index: number): void {
    const temporaryTasks = [...tasks]
    if (temporaryTasks[index].checkbox == true) {
      temporaryTasks[index].checkbox = false
    } else {
      temporaryTasks[index].checkbox = true
    }
    setTasks(temporaryTasks)
  }
  function colorChange(index: number, color: string): void {
    const temporaryTasks = [...tasks]
    temporaryTasks[index].customColor = color
    setTasks(temporaryTasks)
  }
  return (
    <div className={styles.container}>
      <EnterBox
        handleInputChange={handleInputChange}
        addNewTask={addNewTask}
        newTask={newTask}
      />
      <div className={styles.itemsContainer}>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            task={task}
            index={index}
            compliteTask={compliteTask}
            colorChange={colorChange}
            deleteTask={deleteTask}
            moveTaksUp={moveTaksUp}
            moveTaskDown={moveTaskDown}
          />
        ))}
      </div>
    </div>
  )
}
