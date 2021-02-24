import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {

    const { challengeCompleted } = useContext(ChallengesContext)

    return (
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengeCompleted}</span>
        </div>
    )
}
