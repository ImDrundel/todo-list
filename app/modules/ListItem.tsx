import Image from "next/image"
import styles from "./ListItem.module.scss"
import DeleteButton from "@/public/delete-button.svg"
import moveButton from "@/public/move-button.svg"

interface ListItemProps {
  task: {
    text: string
    checkbox: boolean
    customColor: string
  }
  index: number
  compliteTask(index: number): void
  deleteTask(index: number): void
  moveTaksUp(index: number): void
  moveTaskDown(index: number): void
  colorChange(index: number, color: string): void
}

const ListItem: React.FC<ListItemProps> = ({
  task,
  index,
  deleteTask,
  moveTaksUp,
  moveTaskDown,
  compliteTask,
  colorChange,
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
        onClick={() => compliteTask(index)}
      ></div>
      <div className={styles.textbox}>{task.text}</div>
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

      <div className={styles.deleteButton}>
        <Image
          src={DeleteButton}
          width={40}
          height={40}
          alt="Delete button"
          onClick={() => deleteTask(index)}
        ></Image>
      </div>
      <div className={styles.moveButtonsBox}>
        <Image
          src={moveButton}
          alt="move-button"
          width={25}
          height={25}
          onClick={() => moveTaksUp(index)}
        />
        <Image
          className={styles.moveDownButton}
          src={moveButton}
          alt="move-button"
          width={25}
          height={25}
          onClick={() => moveTaskDown(index)}
        />
      </div>
    </div>
  )
}
export default ListItem
