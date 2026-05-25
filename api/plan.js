export default async function handler(req, res) {
  // إعداد رأس الصفحة للسماح بالقراءة الفخمة ومنع الكاش
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  // جلب الرابط السري المخزن في بيئة العمل الآمنة لفيرسل
  const githubUrl = process.env.DATA_URL || 'https://raw.githubusercontent.com/kithaoff/clients-plans/refs/heads/main/final_plan.json';
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers = {};
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(githubUrl, { headers });
    if (!response.ok) throw new Error("Failed to fetch secure data");
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "🔒 النظام مؤمن بالكامل وجاري مزامنة خطتكِ..." });
  }
}
