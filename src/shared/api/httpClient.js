export async function requestJson(url, options = {}) {
  const { token, headers, ...rest } = options

  const response = await fetch(url, {
    ...rest,
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!response.ok) {
    let message = `API ${response.status}`

    try {
      const payload = await response.json()
      if (payload?.message) {
        message = payload.message
      }
    } catch {
      // Ignore non-JSON error bodies.
    }

    const error = new Error(message)
    error.status = response.status
    throw error
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
