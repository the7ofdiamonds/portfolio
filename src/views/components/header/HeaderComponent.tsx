import React, { useEffect, useState } from 'react';

import { User } from '@/model/User';

import styles from './Header.module.scss';

interface HeaderComponentProps {
  user: User | null;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ user }) => {
  const [name, setName] = useState<string|null>(null);
  const [dropdown, setDropdown] = useState('hide');

  useEffect(() => {
    if (user && user.name) {
      setName(user.name)
    }
  }, [user]);

  const toggleMenu = () => {
    if (dropdown == 'hide') {
      setDropdown('show');
    } else {
      setDropdown('hide');
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header}>
          <div className={styles.top}>
            <div className={styles.leftSide}>
              <div className={styles.auth}></div>

              <div className={styles['left-menu']} id="left-menu">
                <a href="/#/about" onClick={toggleMenu}>
                  <h2 className={styles.title}>ABOUT</h2>
                </a>

                <a href="/#/portfolio" onClick={toggleMenu}>
                  <h2 className={styles.title}>PORTFOLIO</h2>
                </a>
              </div>
            </div>

            <div className={styles.center}>
              <a href="/#/">
                <h1 className={styles['header-title']}>{name}</h1>
              </a>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.hamburger} id="toggle" onClick={toggleMenu}>
                <h1 className={styles.open} id="open">
                  III
                </h1>

                <h1 className={styles.close} id="close">
                  X
                </h1>
              </div>

              <div className={styles['right-menu']} id="right-menu">
                <a href="/#/resume" onClick={toggleMenu}>
                  <h2 className={styles.title}>RESUME</h2>
                </a>
                <a href="/#/contact" onClick={toggleMenu}>
                  <h2 className={styles.title}>CONTACT</h2>
                </a>
              </div>
            </div>
          </div>

          {dropdown == 'show' && (
            <nav className={styles.dropdown} id="dropdown">
              <ul className="links">
                <li>
                  <a href="/#/about" onClick={toggleMenu}>
                    <h2 className={styles.title}>ABOUT</h2>
                  </a>
                </li>
                <li>
                  <a href="/#/portfolio" onClick={toggleMenu}>
                    <h2 className={styles.title}>PORTFOLIO</h2>
                  </a>
                </li>
                <li>
                  <a href="/#/resume" onClick={toggleMenu}>
                    <h2 className={styles.title}>RESUME</h2>
                  </a>
                </li>
                <li>
                  <a href="/#/contact" onClick={toggleMenu}>
                    <h2 className={styles.title}>CONTACT</h2>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}