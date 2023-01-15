import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function ZinnoFooter() {
  return (
    <>
      <a
        href="https://robzim.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Robzim Github{" "}
        <span className={styles.logo}>
          {/* <Image
            src="https://robzim.github.io/shore.jpg"
            alt="Shore Pic"
            width={172}
            height={60}
          /> */}
        </span>
      </a>
    </>
  );
}
