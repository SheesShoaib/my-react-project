const API_URL =
  'http://localhost:5000/api/auth'

const getErrorMessage = (
  data,
  fallback
) => {
  if (data?.message) {
    return data.message
  }

  return fallback
}

export const registerUser = async (
  userData
) => {
  try {
    const response = await fetch(
      `${API_URL}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(userData),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        getErrorMessage(
          data,
          'Registration failed.'
        )
      )
    }

    return data
  } catch (error) {
    if (
      error instanceof TypeError
    ) {
      throw new Error(
        'Cannot connect to the server. Please make sure the backend is running.'
      )
    }

    throw error
  }
}

export const loginUser = async (
  credentials
) => {
  try {
    const response = await fetch(
      `${API_URL}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(
          credentials
        ),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        getErrorMessage(
          data,
          'Login failed.'
        )
      )
    }

    return data
  } catch (error) {
    if (
      error instanceof TypeError
    ) {
      throw new Error(
        'Cannot connect to the server. Please make sure the backend is running.'
      )
    }

    throw error
  }
}

export const getCurrentUser = async (
  token
) => {
  const response = await fetch(
    `${API_URL}/me`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Unable to load user.'
    )
  }

  return data
}