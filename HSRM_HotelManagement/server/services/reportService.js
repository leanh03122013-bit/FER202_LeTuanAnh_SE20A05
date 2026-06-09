import { getPool } from '../config/db.js';

export async function dashboard() {
  const pool = await getPool();
  const [rooms, reservations, invoices, serviceOrders, maintenance] = await Promise.all([
    pool.request().query(`SELECT status, COUNT(*) AS total FROM Rooms GROUP BY status`),
    pool.request().query(`SELECT status, COUNT(*) AS total FROM Reservations GROUP BY status`),
    pool.request().query(`SELECT ISNULL(SUM(total_amount),0) AS revenue FROM Invoices WHERE payment_status = 'Paid'`),
    pool.request().query(`SELECT status, COUNT(*) AS total FROM ServiceOrders GROUP BY status`),
    pool.request().query(`SELECT status, COUNT(*) AS total FROM MaintenanceRequests GROUP BY status`),
  ]);
  return {
    room_status: rooms.recordset,
    reservation_status: reservations.recordset,
    revenue: invoices.recordset[0].revenue,
    service_order_status: serviceOrders.recordset,
    maintenance_status: maintenance.recordset,
  };
}

export async function monthlyRevenue() {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT FORMAT(created_at, 'yyyy-MM') AS month, SUM(total_amount) AS revenue
    FROM Invoices
    WHERE payment_status = 'Paid'
    GROUP BY FORMAT(created_at, 'yyyy-MM')
    ORDER BY month
  `);
  return result.recordset;
}
