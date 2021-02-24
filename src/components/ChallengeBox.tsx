
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {

    const hasActiveChallenge = true

    return(
        <div className={styles.ChallengeBoxContainer}>
            {hasActiveChallenge ?
                (
                    <div className={styles.ChallengeBoxContainerActive}>
                        <header>Ganhe 400 xp</header>

                        <main>
                            <img src="icons/body.svg" />
                            <strong>Novo Desafio</strong>
                            <p>Levante e faça uma caminhada de 3 minutos</p>
                        </main>

                        <footer>

                            <button
                                type='button'
                                className={styles.ChallengeFailedButton}
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
