"use client"
import { useState } from "react"
import styles from "./page.module.scss"
import ListItem from "./modules/ListItem"
import EnterBox from "./modules/EnterBox"
interface Tasks {
  text: string
  checkbox: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([
    { text: "First", checkbox: false },
    { text: "Second", checkbox: false },
    { text: "Third", checkbox: false },
    { text: "Last", checkbox: false },
  ])
  const [newTask, setNewTask] = useState<Tasks>({ text: "", checkbox: false })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask({ text: event.target.value, checkbox: false })
  }
  function addNewTask(): void {
    if (newTask.text.trim() !== "") {
      setTasks((t) => [...t, newTask])
      setNewTask({ text: "", checkbox: false })
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
            deleteTask={deleteTask}
            moveTaksUp={moveTaksUp}
            moveTaskDown={moveTaskDown}
          />
        ))}
      </div>
    </div>
  )
}
