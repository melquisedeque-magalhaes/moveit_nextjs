
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {

    const { activeChallenges, resetChallenge } = useContext(ChallengesContext)

    return(
        <div className={styles.ChallengeBoxContainer}>
            {activeChallenges ?
                (
                    <div className={styles.ChallengeBoxContainerActive}>
                        <header>Ganhe {activeChallenges.amount} xp</header>

                        <main>
                            <img src={`icons/${activeChallenges.type}.svg`} />
                            <strong>Novo Desafio</strong>
                            <p>{activeChallenges.description}</p>
                        </main>

                        <footer>

                            <button
                                type='button'
                                className={styles.ChallengeFailedButton}
                                onClick={resetChallenge}
                            >
                                Falhei
                            </button>

                            <button
                                type='button'
                                className={styles.ChallengeSucceededButton}
                            >
                                Completei
                            </button>
                        </footer>
                    </div>
                )
                : (
                    <div className={styles.ChallengeBoxContainerNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up"/>
                            Avance de nivel completandos os desafios
                        </p>
                    </div>
                )}

        </div>
    )
}
