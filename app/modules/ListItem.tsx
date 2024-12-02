import Image from "next/image"
import styles from "./ListItem.module.scss"
import deleteButton from "@/public/delete-button.svg"
import moveButton from "@/public/move-button.svg"
import editButton from "@/public/edit-button.svg"

interface ListItemProps {
  task: {
    text: string
    checkbox: boolean
    customColor: string
    editing: boolean
  }
  index: number
  draft: string
  toggleTaskCompletion(index: number): void
  deleteTask(index: number): void
  moveTaksUp(index: number): void
  moveTaskDown(index: number): void
  colorChange(index: number, color: string): void
  confirmEditTask(index: number): void
  toggleEditingStatus(index: number): void
  handleEditChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
}

const ListItem: React.FC<ListItemProps> = ({
  task,
  index,
  draft,
  deleteTask,
  moveTaksUp,
  moveTaskDown,
  toggleTaskCompletion,
  colorChange,
  confirmEditTask,
  toggleEditingStatus,
  handleEditChange,
}) => {
  return (
    <div
      className={`${styles.itemBox} ${styles.customColor} ${
        task.customColor === "red"
          ? styles.red
          : task.customColor === "blue"
          ? styles.blue
          : task.customColor === "green"
          ? styles.green
          : styles.none
      }`}
    >
      <div
        className={`${styles.checkbox} ${
          task.checkbox ? styles.completed : styles.incompleted
        }`}
        onClick={() => toggleTaskCompletion(index)}
      ></div>
      <div
        className={`${styles.textBox} ${
          task.editing ? styles.editingTrue : styles.editingFalse
        }`}
      >
        <div className={styles.viewText}>{task.text}</div>
        <div className={styles.editText}>
          <textarea
            className={styles.inputBox}
            onChange={handleEditChange}
            value={draft}
          />
          <button
            className={styles.saveTaskButton}
            onClick={() => confirmEditTask(index)}
          >
            Save
          </button>
        </div>
      </div>
      <div className={styles.colorChangeBox}>
        <div
          className={styles.colorChangeToStandart}
          onClick={() => colorChange(index, "none")}
        ></div>
        <div
          className={styles.colorChangeToRed}
          onClick={() => colorChange(index, "red")}
        ></div>
        <div
          className={styles.colorChangeToBlue}
          onClick={() => colorChange(index, "blue")}
        ></div>
        <div
          className={styles.colorChangeToGreen}
          onClick={() => colorChange(index, "green")}
        ></div>
      </div>
      {/* It is possible to render each div via map, but I didn't consider it reasonable for four colors. A lot of fiddles with classNames */}
      <div className={styles.editButton}>
        <Image
          src={editButton}
          width={40}
          height={40}
          alt="Edit button"
          onClick={() => toggleEditingStatus(index)}
        />
        <div></div>
      </div>
      <div className={styles.deleteButton}>
        <Image
          src={deleteButton}
          width={40}
          height={40}
          alt="Delete button"
          onClick={() => deleteTask(index)}
        ></Image>
      </div>
      <div className={styles.moveButtonsBox}>
        <Image
          src={moveButton}
          alt="move-up-button"
          width={25}
          height={25}
          onClick={() => moveTaksUp(index)}
        />
        <Image
          className={styles.moveDownButton}
          src={moveButton}
          alt="move-down-button"
          width={25}
          height={25}
          onClick={() => moveTaskDown(index)}
        />
      </div>
    </div>
  )
}
export default ListItem
