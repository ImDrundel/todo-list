"use client"
import { useEffect, useState } from "react"
import styles from "./page.module.scss"
import ListItem from "./modules/ListItem"
import EnterBox from "./modules/EnterBox"

interface Tasks {
  text: string
  checkbox: boolean
  customColor: string
  editing: boolean
}

export default function Home() {
  // Initial state
  const [tasks, setTasks] = useState<Tasks[]>([
    {
      text: "Welcome to Andrew's todo list page! This is where you can add, delete and edit your to-do list",
      checkbox: false,
      customColor: "none",
      editing: false,
    },
    {
      text: "⬅ You can also mark tasks that have already been completed",
      checkbox: true,
      customColor: "none",
      editing: false,
    },
    {
      text: "Or change the color of the tasks to highlight the most important ones!↗",
      checkbox: false,
      customColor: "red",
      editing: false,
    },
    {
      text: "If necessary, rearrange the tasks as you wish (but do not violate the rules of physics!).",
      checkbox: true,
      customColor: "green",
      editing: false,
    },
  ])

  // Interaction with localStorage
  useEffect(() => {
    const prevTasks = localStorage.getItem("tasks")
    if (prevTasks) {
      setTasks(JSON.parse(prevTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Adding a new task
  const [newTask, setNewTask] = useState<Tasks>({
    text: "",
    checkbox: false,
    customColor: "none",
    editing: false,
  })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask({
      text: event.target.value,
      checkbox: false,
      customColor: "none",
      editing: false,
    })
  }

  function addNewTask(): void {
    if (newTask.text.trim() !== "") {
      setTasks((t) => [...t, newTask])
      setNewTask({
        text: "",
        checkbox: false,
        customColor: "none",
        editing: false,
      })
    }
  }

  // Editing the task
  const [draft, setDraft] = useState<string>("")

  function handleEditChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDraft(event.target.value)
  }

  function confirmEditTask(index: number): void {
    const temporaryTasks = [...tasks]
    temporaryTasks[index].text = draft
    temporaryTasks[index].editing = false
    setTasks(temporaryTasks)
  }

  function toggleEditingStatus(index: number): void {
    const temporaryTasks = [...tasks]
    const noTextEditing = temporaryTasks.every((task) => task.editing === false)
    if (noTextEditing) {
      setDraft(temporaryTasks[index].text)
      temporaryTasks[index].editing = true
    } else temporaryTasks[index].editing = false
    setTasks(temporaryTasks)
  }

  // Other
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

  function toggleTaskCompletion(index: number): void {
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
            draft={draft}
            toggleTaskCompletion={toggleTaskCompletion}
            colorChange={colorChange}
            deleteTask={deleteTask}
            moveTaksUp={moveTaksUp}
            moveTaskDown={moveTaskDown}
            confirmEditTask={confirmEditTask}
            handleEditChange={handleEditChange}
            toggleEditingStatus={toggleEditingStatus}
          />
        ))}
      </div>
    </div>
  )
}
