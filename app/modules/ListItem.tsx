import Image from "next/image"
import styles from "./ListItem.module.scss"
import DeleteButton from "@/public/delete-button.svg"

interface ListItemProps {
  task: {
    text: string
    checkbox: boolean
  }
  index: number
  compliteTask(index: number): void
  deleteTask(index: number): void
  moveTaksUp(index: number): void
  moveTaskDown(index: number): void
}

const ListItem: React.FC<ListItemProps> = ({
  task,
  index,
  deleteTask,
  moveTaksUp,
  moveTaskDown,
  compliteTask,
}) => {
  return (
    <div className={styles.itemBox}>
      <div
        className={`${styles.checkbox} ${
          task.checkbox ? styles.completed : styles.incompleted
        }`}
        onClick={() => compliteTask(index)}
      ></div>
      <div className={styles.textbox}> {task.text}</div>
      <div className={styles.deleteButton}>
        <Image
          src={DeleteButton}
          width={50}
          height={50}
          alt="Delete button"
          onClick={() => deleteTask(index)}
        ></Image>
      </div>
      <div className={styles.moveButtonsBox}>
        <button
          className={styles.moveUpButton}
          onClick={() => moveTaksUp(index)}
        >
          Up
        </button>
        <button
          className={styles.moveDownButton}
          onClick={() => moveTaskDown(index)}
        >
          Down
        </button>
      </div>
    </div>
  )
}
export default ListItem
