import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-here';

const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN env o'rnatilmagan!");
}

export async function POST(req) {
    const body = await req.json();

    // Telegram hash tekshiruvi
    const dataCheckString = Object.keys(body)
        .filter(key => key !== 'hash')
        .sort()
        .map(key => `${key}=${body[key]}`)
        .join('\n');

    const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
    const hash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    if (hash !== body.hash) {
        return Response.json({ error: 'Invalid hash' }, { status: 403 });
    }

    const authDate = body.auth_date;
    const now = Math.floor(Date.now() / 1000);

    if (now - authDate > 86400) { // 24 soatdan oshsa
        return Response.json({ error: 'Auth date expired' }, { status: 403 });
    }

    // Foydalanuvchi ma'lumotlari
    const user = {
        id: body.id,
        username: body.username || null,
        first_name: body.first_name,
        photo_url: body.photo_url || null,
    };

    // Bu yerda o'zingizning JWT yoki sessiya tizimingizni ishlatasiz
    const token = Buffer.from(JSON.stringify(user)).toString('base64'); // oddiy misol

    return Response.json({ success: true, token, user });
}