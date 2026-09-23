import styles from "./Errors.module.css";
// className={styles. }

export default function Errors({ errors }: { errors: string[] }) {
    return (
        <ul className={styles.errors}>
            {errors.map((error, idx) => (
                <li className={styles.error} key={idx}>
                    {error}
                </li>
            ))}
        </ul>
    );
}
