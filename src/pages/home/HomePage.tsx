import { useEffect, useState } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import styles from './HomePage.module.css';

interface User {
  id: string;
  name: string;
  city: string;
  age: number;
  avatarUrl: string;
  teachTitle: string;
  shortAbout: string;
}

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/db/skills.json')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const { visibleItems, isLoading, hasMore, observerRef } = useInfiniteScroll({
    items: users,
    pageSize: 6,
  });

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Каталог навыков</h1>

      <div className={styles.grid}>
        {visibleItems.map((user) => (
          <article key={user.id} className={styles.card}>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className={styles.avatar}
            />
            <h2 className={styles.name}>
              {user.name}, {user.age}
            </h2>
            <p className={styles.city}>{user.city}</p>
            <h3 className={styles.skill}>{user.teachTitle}</h3>
            <p className={styles.about}>{user.shortAbout}</p>
          </article>
        ))}
      </div>

      {hasMore && (
        <div ref={observerRef} className={styles.loader}>
          {isLoading && <div className={styles.spinner} />}
        </div>
      )}
    </main>
  );
};

export default HomePage;
