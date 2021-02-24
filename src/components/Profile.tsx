import styles from '../styles/components/Profile.module.css'

export default function Profile () {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/melquisedeque-magalhaes.png" alt="Melqui Magalhães"/>
            <div>
                <strong>Melqui Sodré e Kassia Teixeira de Lima para sempre</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}
