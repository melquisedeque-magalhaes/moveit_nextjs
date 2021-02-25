import { FiArrowRight, FiGithub } from 'react-icons/fi'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
    return(
        <div className={styles.container}>
            <section>

                <div>
                    <img src="/logo_white.svg" alt=""/>

                    <h2>Bem-vindo</h2>

                    <div className={styles.home}>
                        <FiGithub size={24} color='#fff'  />
                        <p>Faça seu login com o GitHub para começar</p>
                    </div>


                    <div className={styles.home}>
                        <input type="text" placeholder='Digite seu Github' />
                        <button type='button'><FiArrowRight  size={24} color='#fff' /></button>
                    </div>
                </div>

            </section>


        </div>
    )
}
