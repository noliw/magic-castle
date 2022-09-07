import * as tokenService from '../services/tokenService'

const BASE_URL = '/api/profiles'

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function getProfileById(id) {
  const res = await fetch(`${BASE_URL}/${id}`,{
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export { getAllProfiles, getProfileById }
