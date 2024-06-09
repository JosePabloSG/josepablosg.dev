export async function getRepos () {
  const URL = 'https://api.github.com/users/JosePabloSG/repos'
  const response = await fetch(URL)
  const data = await response.json()
  return data
}
