import styles from './NotFound.module.scss'

const index = () => {
  return (
    <>
      <h1 className={styles.root}>
        <span>
          🙁
          <p> 404: Page Not Found</p>
        </span>
      </h1 >
    </>
  )
}

export default index