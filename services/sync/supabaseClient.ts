// Minimal Supabase REST client helper.
// Configure SUPABASE_URL and SUPABASE_KEY via environment or set them here for local dev.
const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_KEY || ''

export async function insertBackup(payload: any) {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Supabase not configured: set SUPABASE_URL and SUPABASE_KEY')
  const url = `${SUPABASE_URL}/rest/v1/backups`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase insert failed: ${res.status} ${text}`)
  }
  return res.json()
}

export default { insertBackup }
