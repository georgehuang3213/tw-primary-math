/**
 * ⚡ Cloudflare Worker for Cloudflare R2 Math System Storage
 * 
 * 如何在 Cloudflare 上設定：
 * 1. 登入 Cloudflare Dashboard -> R2 -> 建立一個 Bucket (例如命名為: tw-math-bucket)
 * 2. 在 Workers & Pages 建立一個 Worker，綁定 R2 Bucket (Variable Name 設為: MY_R2_BUCKET)
 * 3. 將本程式碼貼入 Worker 編輯器並點擊 Save and Deploy
 * 4. 複製 Worker 網址 (例如: https://tw-math-sync.your-name.workers.dev)
 * 5. 貼回數學系統的「Cloudflare R2 設定」中即可實現全自動無感即時雲端儲存！
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Custom-Auth-Key, X-Classroom-Key',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const classroomKey = request.headers.get('X-Classroom-Key') || url.searchParams.get('key') || 'default-classroom';
    const objectKey = `classrooms/${classroomKey}.json`;

    // 1. GET: 讀取班級學生資料
    if (request.method === 'GET') {
      if (!env.MY_R2_BUCKET) {
        return new Response(JSON.stringify({ error: 'R2 Bucket not bound' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const object = await env.MY_R2_BUCKET.get(objectKey);
      if (!object) {
        return new Response(JSON.stringify({ error: 'Classroom not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const data = await object.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 2. PUT: 儲存班級學生資料
    if (request.method === 'PUT' || request.method === 'POST') {
      if (!env.MY_R2_BUCKET) {
        return new Response(JSON.stringify({ error: 'R2 Bucket not bound' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const body = await request.text();
      await env.MY_R2_BUCKET.put(objectKey, body, {
        httpMetadata: { contentType: 'application/json' }
      });

      return new Response(JSON.stringify({ success: true, message: 'Saved to Cloudflare R2 successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
};
