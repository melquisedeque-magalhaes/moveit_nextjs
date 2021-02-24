import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export default function ExperienceBar() {

    const { experienceToNextLevel, currentExperience } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span
                    style={{ left: `${percentToNextLevel}%`}}
                    className={styles.currentExperience}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}
