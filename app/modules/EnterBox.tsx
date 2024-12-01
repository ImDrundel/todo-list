import styles from "./EnterBox.module.scss"
import Form from "next/form"
interface EnterBoxProps {
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void
  newTask: {
    text: string
  }
  addNewTask(): void
}

const EnterBox: React.FC<EnterBoxProps> = ({
  handleInputChange,
  newTask,
  addNewTask,
}) => {
  return (
    <Form className={styles.enterBox} action="">
      <input
        type="text"
        placeholder="Enter new task.. Don't be shy ;)"
        onChange={handleInputChange}
        value={newTask.text}
      />
      <button className={styles.addTaskButton} onClick={addNewTask}>
        Add
      </button>
    </Form>
  )
}

export default EnterBox
