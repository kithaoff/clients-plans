const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // إعداد رأس الصفحة للسماح بالقراءة ومنع الكاش
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  // جلب الرابط والمفتاح السري من بيئة عمل Vercel
  const githubUrl = process.env.DATA_URL || 'https://raw.githubusercontent.com/kithaoff/clients-plans/refs/heads/main/final_plan.json';
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers = {};
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(githubUrl, { headers });
    if (!response.ok) throw new Error("Failed to fetch data");
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "🔒 جاري مزامنة السيرفر الآمن، يرجى تحديث الصفحة بعد ثوانٍ..." });
  }
};
