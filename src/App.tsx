import { useState } from 'react';
import {
  Camera,
  Heart,
  CalendarDays,
  ArrowUpRight,
  Star,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react';
import { Shell, PageTitle, Empty, useRoute } from './components/Shell';
import { useStored } from './lib/storage';
import { money, dateLabel } from './lib/format';
import {
  catalog,
  reservationsSchema,
  emptyReservations,
  favoritesSchema,
  emptyFavorites,
  type Gear,
} from './features/catalog/model';
import { GearArt } from './features/catalog/GearArt';
import { Booking } from './features/catalog/Booking';
const nav = [
  { id: 'explore', label: 'Explorar equipamentos', icon: <Camera size={18} /> },
  { id: 'favorites', label: 'Meus favoritos', icon: <Heart size={18} /> },
  {
    id: 'bookings',
    label: 'Minhas reservas',
    icon: <CalendarDays size={18} />,
  },
];
export default function App() {
  const [route, navigate] = useRoute(nav);
  const [favorites, setFavorites, favoriteWarning] = useStored(
    'equipshare:favorites:v1',
    favoritesSchema,
    emptyFavorites,
  );
  const [reservations, setReservations, warning] = useStored(
    'equipshare:reservations:v1',
    reservationsSchema,
    emptyReservations,
  );
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(300);
  const [sort, setSort] = useState('rating');
  const [selected, setSelected] = useState<Gear | null>(null);
  const [message, setMessage] = useState('');
  const filtered = catalog
    .filter(
      (g) =>
        (route !== 'favorites' || favorites.includes(g.id)) &&
        (category === 'Todos' || category === g.category) &&
        g.price <= maxPrice * 100 &&
        `${g.name} ${g.category}`
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()),
    )
    .sort((a, b) =>
      sort === 'price'
        ? a.price - b.price
        : sort === 'expensive'
          ? b.price - a.price
          : b.rating - a.rating,
    );
  function toggle(id: string) {
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  }
  return (
    <Shell
      brand="EquipShare"
      tagline="Grandes ideias. O equipamento certo."
      items={nav}
      route={route}
      navigate={navigate}
    >
      {route === 'explore' ? (
        <section className="market-hero">
          <div>
            <span className="eyebrow">CRIE MAIS. POSSUA MENOS.</span>
            <h1>
              Sua próxima grande ideia
              <br />
              começa por aqui.
            </h1>
            <p>
              Câmeras, lentes e luz para tirar seu projeto do papel.
              <br />
              Explore o catálogo demonstrativo de criadores locais.
            </p>
            <a href="#catalog" className="hero-link">
              Encontre seu equipamento <ArrowUpRight size={18} />
            </a>
            <div className="hero-proof">
              <span className="mini-avatars">◉ ◉ ◉</span>
              <span>Feito para quem vive de criar</span>
            </div>
          </div>
          <div className="hero-art">
            <GearArt gear={catalog[0]} />
            <span className="hero-sticker">
              <Star size={13} fill="currentColor" /> Seu próximo take.
            </span>
          </div>
        </section>
      ) : (
        <PageTitle
          eyebrow="SEU ESPAÇO CRIATIVO"
          title={
            route === 'favorites'
              ? 'Sua seleção de favoritos.'
              : 'Tudo pronto para criar.'
          }
          description={
            route === 'favorites'
              ? 'Guarde equipamentos e compare antes da próxima produção.'
              : 'Acompanhe suas reservas demonstrativas neste navegador.'
          }
        />
      )}
      {(warning || favoriteWarning) && (
        <p className="notice" role="alert">
          {warning || favoriteWarning}
        </p>
      )}
      <div role="status" className="status-message">
        {message}
      </div>
      {route !== 'bookings' ? (
        <>
          <div id="catalog" className="section-head catalog-heading">
            <div>
              <span className="eyebrow">CATÁLOGO CURADO</span>
              <h2>
                {route === 'favorites'
                  ? 'Equipamentos favoritos'
                  : 'Encontre a ferramenta da sua visão'}
              </h2>
            </div>
            <span className="badge">
              <MapPin size={12} />
              Belo Horizonte · Demo
            </span>
          </div>
          <div className="category-tabs" aria-label="Categorias">
            {['Todos', 'Câmeras', 'Lentes', 'Iluminação', 'Áudio'].map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="toolbar">
            <label className="field search-field">
              Buscar equipamento
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busque por câmera, lente, iluminação..."
              />
            </label>
            <label className="field">
              Diária máxima: {money(maxPrice * 100)}
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </label>
            <label className="field">
              Ordenar
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="rating">Melhor avaliação</option>
                <option value="price">Menor preço</option>
                <option value="expensive">Maior preço</option>
              </select>
            </label>
            <button
              onClick={() => {
                setCategory('Todos');
                setSearch('');
                setMaxPrice(300);
              }}
            >
              <SlidersHorizontal size={14} />
              Limpar filtros
            </button>
          </div>
          <p className="result-count">
            {filtered.length} equipamentos disponíveis no catálogo demonstrativo
          </p>
          <div className="product-grid">
            {filtered.map((g) => (
              <article className="product-card" key={g.id}>
                <div className="product-art">
                  <GearArt gear={g} />
                  <button
                    className="favorite-button"
                    aria-label={`${favorites.includes(g.id) ? 'Remover' : 'Adicionar'} ${g.name} ${favorites.includes(g.id) ? 'dos' : 'aos'} favoritos`}
                    aria-pressed={favorites.includes(g.id)}
                    onClick={() => toggle(g.id)}
                  >
                    <Heart
                      size={18}
                      fill={favorites.includes(g.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <span className="product-category">{g.category}</span>
                </div>
                <div className="product-info">
                  <div className="section-head">
                    <small>{g.owner}</small>
                    <span className="rating">
                      <Star size={12} fill="currentColor" />
                      {g.rating.toFixed(1)}
                    </span>
                  </div>
                  <h3>{g.name}</h3>
                  <p>{g.specs[0]}</p>
                  <div className="product-bottom">
                    <div>
                      <strong>{money(g.price)}</strong>
                      <small> / dia</small>
                    </div>
                    <button
                      aria-label={`Reservar ${g.name}`}
                      onClick={() => setSelected(g)}
                    >
                      <ArrowUpRight size={19} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!filtered.length && (
            <Empty
              title="Nenhum equipamento por aqui"
              detail="Adicione favoritos ou ajuste os filtros de busca."
            />
          )}
          <p className="illustration-note">
            Ilustrações vetoriais originais. Preços, avaliações e fornecedores
            são fictícios.
          </p>
        </>
      ) : (
        <div className="stack">
          {reservations.map((r) => {
            const gear = catalog.find((g) => g.id === r.gearId);
            if (!gear) return null;
            return (
              <article key={r.id} className="panel reservation">
                <GearArt gear={gear} />
                <div>
                  <span className="badge">{r.status}</span>
                  <h2>{gear.name}</h2>
                  <p>
                    {dateLabel(r.start)} — {dateLabel(r.end)} · {money(r.total)}
                  </p>
                  <small>Reserva #{r.id.slice(0, 8)} · Demonstração</small>
                </div>
                {r.status === 'Confirmada' && (
                  <button
                    className="danger"
                    onClick={() => {
                      setReservations((old) =>
                        old.map((x) =>
                          x.id === r.id ? { ...x, status: 'Cancelada' } : x,
                        ),
                      );
                      setMessage('Reserva demonstrativa cancelada.');
                    }}
                  >
                    Cancelar reserva
                  </button>
                )}
              </article>
            );
          })}
          {!reservations.length && (
            <Empty
              title="Sua próxima produção começa aqui"
              detail="Explore o catálogo e faça sua primeira reserva demonstrativa."
            />
          )}
        </div>
      )}
      {selected && (
        <Booking
          gear={selected}
          reservations={reservations}
          onClose={() => setSelected(null)}
          onSave={(r) => {
            setReservations((old) => [r, ...old]);
            setSelected(null);
            navigate('bookings');
            setMessage(
              'Reserva demonstrativa confirmada. Nenhuma cobrança foi realizada.',
            );
          }}
        />
      )}
    </Shell>
  );
}
