import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #e8e8e4; color: #0a0a0a; }

  /* LAYOUT */
  .admin-layout { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: 210px; flex-shrink: 0;
    background: #d8d8d4;
    display: flex; flex-direction: column;
    border-right: 1px solid #c4c4c0;
  }
  .sidebar-logo {
    padding: 18px 20px 14px;
    border-bottom: 1px solid #c4c4c0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .logo-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem; letter-spacing: 0.03em;
    color: #0a0a0a; -webkit-text-stroke: 1.5px #0a0a0a;
    position: relative; display: inline-block;
  }
  .logo-text::after {
    content: '';
    position: absolute; bottom: -5px; left: -5px; right: -5px; height: 9px;
    border-bottom: 2.5px solid #0a0a0a;
    border-radius: 0 0 60% 60% / 0 0 18px 18px;
  }
  .sidebar-menu { padding: 20px 12px; flex: 1; }
  .menu-label {
    font-size: 0.62rem; font-weight: 700; color: #888;
    text-transform: uppercase; letter-spacing: 0.08em;
    padding: 0 8px; margin-bottom: 10px;
  }
  .menu-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 8px;
    font-size: 0.88rem; font-weight: 500;
    cursor: pointer; margin-bottom: 4px;
    border: none; background: none; width: 100%;
    text-align: left; color: #333;
    transition: background 0.15s;
  }
  .menu-item:hover { background: #ccc; }
  .menu-item.active { background: #c8c8c4; font-weight: 600; color: #0a0a0a; }
  .menu-icon { font-size: 1rem; }

  /* TOP BAR */
  .topbar {
    height: 72px; background: #d8d8d4;
    display: flex; align-items: center; justify-content: flex-end;
    padding: 0 28px; border-bottom: 1px solid #c4c4c0;
  }
  .topbar-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: #0a0a0a; color: #fff;
    display: grid; place-items: center; font-size: 1.2rem;
    cursor: pointer;
  }

  /* MAIN */
  .main-area { flex: 1; display: flex; flex-direction: column; background: #e8e8e4; }
  .main-content { flex: 1; padding: 28px; overflow-y: auto; }

  /* STAT CARDS */
  .stat-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat-card {
    background: #d4d4d0; border-radius: 12px;
    padding: 18px 20px; border: 1px solid #c0c0bc;
  }
  .stat-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #666; margin-bottom: 6px; }
  .stat-value { font-size: 2rem; font-weight: 700; line-height: 1; margin-bottom: 6px; }
  .stat-sub { font-size: 0.7rem; color: #666; }
  .stat-sub .up { color: #3ddc6e; font-weight: 600; }
  .stat-sub .down { color: #ff5555; font-weight: 600; }

  /* DASHBOARD GRID */
  .dash-grid { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }

  /* CHART CARD */
  .chart-card {
    background: #d4d4d0; border-radius: 12px;
    padding: 22px 20px; border: 2px solid #7070a0;
  }
  .chart-title { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
  .chart-sub { font-size: 0.72rem; color: #888; margin-bottom: 16px; }

  /* MACHINE STATUS CARD */
  .mstatus-card {
    background: #d4d4d0; border-radius: 12px;
    padding: 22px 20px; border: 1px solid #c0c0bc;
  }
  .mstatus-title { font-size: 1rem; font-weight: 700; margin-bottom: 20px; }
  .mstatus-row { margin-bottom: 18px; }
  .mstatus-row-top { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
  .mstatus-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .mstatus-name { font-size: 0.78rem; font-weight: 500; flex: 1; }
  .mstatus-count { font-size: 0.78rem; font-weight: 700; }
  .mstatus-bar-bg { height: 10px; background: #c0c0bc; border-radius: 999px; overflow: hidden; }
  .mstatus-bar-fill { height: 100%; border-radius: 999px; transition: width 0.4s; }

  /* ORDERS TABLE */
  .orders-card {
    background: #f0f0ec; border-radius: 14px;
    border: 1.5px solid #c0c0bc;
    overflow: hidden;
  }
  .orders-header { padding: 24px 28px 16px; }
  .orders-header h2 { font-size: 1.6rem; font-weight: 700; }
  .orders-table { width: 100%; border-collapse: collapse; }
  .orders-table thead tr { border-top: 1.5px solid #c0c0bc; border-bottom: 1.5px solid #c0c0bc; }
  .orders-table th { padding: 10px 16px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #555; text-align: left; background: #e8e8e4; }
  .orders-table td { padding: 14px 16px; font-size: 0.85rem; border-bottom: 1px solid #ddd; }
  .orders-table tbody tr:last-child td { border-bottom: none; }
  .orders-table tbody tr:hover td { background: #e8e8e4; }
  .order-id-link { color: #3366cc; text-decoration: underline; cursor: pointer; }

  /* MACHINES ADMIN */
  .machines-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; max-width: 640px; }
  .mstat-card {
    background: #d4d4d0; border-radius: 10px;
    padding: 16px 20px; border: 1px solid #c0c0bc;
  }
  .mstat-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #666; margin-bottom: 6px; }
  .mstat-value { font-size: 2rem; font-weight: 700; }

  .machines-mgmt-card {
    background: #f0f0ec; border-radius: 14px;
    border: 1.5px solid #c0c0bc; padding: 24px;
  }
  .mgmt-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
  .mgmt-header h2 { font-size: 1.5rem; font-weight: 700; }
  .btn-add { padding: 8px 20px; background: #5599ff; color: #fff; border: none; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .btn-add:hover { background: #4488ee; }

  .mgmt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .mgmt-machine-card {
    background: #fff; border: 1.5px solid #ccc;
    border-radius: 12px; padding: 18px 20px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .mgmt-machine-name { font-size: 1.05rem; font-weight: 700; }
  .mgmt-status-pill { display: inline-block; padding: 4px 14px; border-radius: 999px; font-size: 0.72rem; font-weight: 700; width: fit-content; }
  .pill-avail { background: #3ddc6e; color: #000; }
  .pill-inuse { background: #ff3d3d; color: #fff; }
  .pill-maint { background: #888; color: #fff; }

  @media (max-width: 900px) {
    .stat-cards { grid-template-columns: repeat(2, 1fr); }
    .dash-grid { grid-template-columns: 1fr; }
    .mgmt-grid { grid-template-columns: repeat(2, 1fr); }
    .machines-stats { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 600px) {
    .sidebar { display: none; }
    .stat-cards { grid-template-columns: 1fr 1fr; }
    .mgmt-grid { grid-template-columns: 1fr 1fr; }
  }
`;

/* ── DATA ── */
const weekData = [
  { day: "MON", orders: 12 }, { day: "TUE", orders: 28 }, { day: "WEB", orders: 45 },
  { day: "THU", orders: 35 }, { day: "FRI", orders: 48 }, { day: "SAT", orders: 30 }, { day: "SUN", orders: 18 },
];

const orders = [
  { id: "#ORD-001", customer: "John Michael Manipon", service: "Wash & Fold",  machine: "M-01", date: "2026-01-25", amount: 150 },
  { id: "#ORD-002", customer: "Vincent Philip Cruz",  service: "Dry Cleaning", machine: "M-02", date: "2026-01-25", amount: 230 },
  { id: "#ORD-003", customer: "Arlry Baldonasa",      service: "Bedding",      machine: "M-03", date: "2026-01-25", amount: 200 },
  { id: "#ORD-004", customer: "Chloe Velasquez",      service: "Delicates",    machine: "M-04", date: "2026-01-25", amount: 150 },
  { id: "#ORD-005", customer: "Desiree De Vera",      service: "Wash & Fold",  machine: "M-05", date: "2026-01-25", amount: 100 },
];

const initMachines = [
  { id: 1, name: "Machine 1", status: "available" },
  { id: 2, name: "Machine 2", status: "in-use" },
  { id: 3, name: "Machine 3", status: "available" },
  { id: 4, name: "Machine 4", status: "maintenance" },
  { id: 5, name: "Machine 5", status: "maintenance" },
  { id: 6, name: "Machine 6", status: "available" },
];

/* ── SIDEBAR ── */
function Sidebar({ page, setPage }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "orders",    label: "Orders",    icon: "📦" },
    { key: "machines",  label: "Machines",  icon: "⚙️" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">ZLaundry</span>
      </div>
      <div className="sidebar-menu">
        <div className="menu-label">Main Menu</div>
        {items.map(item => (
          <button key={item.key} className={`menu-item ${page === item.key ? "active" : ""}`} onClick={() => setPage(item.key)}>
            <span className="menu-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── DASHBOARD ── */
function Dashboard() {
  const total = initMachines.length;
  const avail = initMachines.filter(m => m.status === "available").length;
  const inUse = initMachines.filter(m => m.status === "in-use").length;
  const maint = initMachines.filter(m => m.status === "maintenance").length;

  return (
    <div>
      {/* STAT CARDS */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-label">Orders Today</div>
          <div className="stat-value">24</div>
          <div className="stat-sub"><span className="up">+3</span> vs yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Revenue (This Week)</div>
          <div className="stat-value">₱69,123</div>
          <div className="stat-sub"><span className="up">+5%</span> vs last week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Member</div>
          <div className="stat-value">5/8</div>
          <div className="stat-sub" style={{color:"#ff9900"}}>maintenance</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Registered User</div>
          <div className="stat-value">12</div>
          <div className="stat-sub"><span className="up">+2</span> this week</div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="dash-grid">
        {/* BAR CHART */}
        <div className="chart-card">
          <div className="chart-title">Orders This Week</div>
          <div className="chart-sub">Daily order volume</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekData} barSize={28}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#2a2a3a", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }}
                cursor={{ fill: "rgba(100,100,160,0.15)" }}
              />
              <Bar dataKey="orders" fill="#7070a0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* MACHINE STATUS */}
        <div className="mstatus-card">
          <div className="mstatus-title">Machine Status</div>
          {[
            { label: "Available", count: avail, color: "#3ddc6e", pct: (avail/total)*100 },
            { label: "In Use",    count: inUse,  color: "#ffcc00", pct: (inUse/total)*100 },
            { label: "Maintenance", count: maint, color: "#ff4444", pct: (maint/total)*100 },
          ].map(row => (
            <div className="mstatus-row" key={row.label}>
              <div className="mstatus-row-top">
                <div className="mstatus-dot" style={{ background: row.color }} />
                <span className="mstatus-name">{row.label}</span>
                <span className="mstatus-count">{row.count}</span>
              </div>
              <div className="mstatus-bar-bg">
                <div className="mstatus-bar-fill" style={{ width: `${row.pct}%`, background: row.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── ORDERS ── */
function Orders() {
  return (
    <div className="orders-card">
      <div className="orders-header">
        <h2>All Orders</h2>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customers</th>
            <th>Service</th>
            <th>Machine</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i}>
              <td><span className={i === 2 ? "order-id-link" : ""}>{o.id}</span></td>
              <td>{o.customer}</td>
              <td>{o.service}</td>
              <td>{o.machine}</td>
              <td>{o.date}</td>
              <td>{o.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── MACHINES ADMIN ── */
function MachinesAdmin() {
  const [machines, setMachines] = useState(initMachines);

  const avail = machines.filter(m => m.status === "available").length;
  const inUse = machines.filter(m => m.status === "in-use").length;
  const maint = machines.filter(m => m.status === "maintenance").length;

  const addMachine = () => {
    const newId = machines.length + 1;
    setMachines([...machines, { id: newId, name: `Machine ${newId}`, status: "available" }]);
  };

  const statusLabel = (s) => {
    if (s === "available")   return { text: "Available",   cls: "pill-avail" };
    if (s === "in-use")      return { text: "IN USE",      cls: "pill-inuse" };
    if (s === "maintenance") return { text: "MAINTINANCE", cls: "pill-maint" };
    return { text: s, cls: "pill-maint" };
  };

  return (
    <div>
      {/* STAT CARDS */}
      <div className="machines-stats">
        <div className="mstat-card">
          <div className="mstat-label">Available</div>
          <div className="mstat-value">{avail}</div>
        </div>
        <div className="mstat-card">
          <div className="mstat-label">In Use</div>
          <div className="mstat-value">{inUse}</div>
        </div>
        <div className="mstat-card">
          <div className="mstat-label">Maintenance</div>
          <div className="mstat-value">{maint}</div>
        </div>
      </div>

      {/* MACHINE MANAGEMENT */}
      <div className="machines-mgmt-card">
        <div className="mgmt-header">
          <h2>Machine Management</h2>
          <button className="btn-add" onClick={addMachine}>Add Machine</button>
        </div>
        <div className="mgmt-grid">
          {machines.map(m => {
            const { text, cls } = statusLabel(m.status);
            return (
              <div className="mgmt-machine-card" key={m.id}>
                <div className="mgmt-machine-name">{m.name}</div>
                <span className={`mgmt-status-pill ${cls}`}>{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── APP ── */
export default function AdminApp() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    if (page === "dashboard") return <Dashboard />;
    if (page === "orders")    return <Orders />;
    if (page === "machines")  return <MachinesAdmin />;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="admin-layout">
        <Sidebar page={page} setPage={setPage} />
        <div className="main-area">
          <div className="topbar">
            <div className="topbar-avatar">👤</div>
          </div>
          <div className="main-content">
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
}
