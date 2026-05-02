import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>
            Каталог
          </Link>
          <Link to="/profile" style={{ marginRight: '1rem' }}>
            Профиль
          </Link>
          <Link to="/favorites" style={{ marginRight: '1rem' }}>
            Избранное
          </Link>
          <Link to="/create">Создать навык</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Каталог навыков</h1>} />
          <Route path="/skill/:id" element={<h1>Страница навыка</h1>} />
          <Route path="/login" element={<h1>Вход / Регистрация</h1>} />
          <Route path="/profile" element={<h1>Профиль пользователя</h1>} />
          <Route path="/favorites" element={<h1>Избранное</h1>} />
          <Route path="/create" element={<h1>Создание навыка</h1>} />
          <Route path="*" element={<h1>404 — Страница не найдена</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
