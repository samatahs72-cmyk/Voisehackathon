const API_BASE = process.env.REACT_APP_API_URL || ''

export async function post(path, body){
  const res = await fetch(API_BASE + path, {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function get(path){
  const res = await fetch(API_BASE + path)
  return res.json()
}
