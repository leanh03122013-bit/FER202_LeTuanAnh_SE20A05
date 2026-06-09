import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roomTypeRoutes from './routes/roomTypeRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';
import hotelServiceRoutes from './routes/hotelServiceRoutes.js';
import serviceOrderRoutes from './routes/serviceOrderRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import auditLogRoutes from './routes/auditLogRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('✅ HSRM API is running'));
app.get('/debug', (req, res) => res.json({ status: 'ok', project: 'HSRM Hotel Management' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/room-types', roomTypeRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/checkins', checkinRoutes);
app.use('/api/services', hotelServiceRoutes);
app.use('/api/service-orders', serviceOrderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 HSRM server running at http://localhost:${PORT}`));

export default app;
