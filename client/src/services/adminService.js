const API_URL =
  'http://localhost:5000/api/admin'

const request = async (
  url,
  options = {}
) => {
  const response =
    await fetch(url, options)

  const data =
    await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Request failed.'
    )
  }

  return data
}

const authHeaders = (
  token,
  includeContentType = false
) => {
  const headers = {
    Authorization:
      `Bearer ${token}`,
  }

  if (includeContentType) {
    headers['Content-Type'] =
      'application/json'
  }

  return headers
}

export const getAdminDashboard =
  async (token) => {
    return request(
      `${API_URL}/dashboard`,
      {
        headers:
          authHeaders(token),
      }
    )
  }

export const getStaff =
  async (token) => {
    return request(
      `${API_URL}/staff`,
      {
        headers:
          authHeaders(token),
      }
    )
  }

export const createStaff =
  async (
    token,
    staffData
  ) => {
    return request(
      `${API_URL}/staff`,
      {
        method: 'POST',

        headers:
          authHeaders(
            token,
            true
          ),

        body: JSON.stringify(
          staffData
        ),
      }
    )
  }

export const updateStaff =
  async (
    token,
    staffId,
    staffData
  ) => {
    return request(
      `${API_URL}/staff/${staffId}`,
      {
        method: 'PUT',

        headers:
          authHeaders(
            token,
            true
          ),

        body: JSON.stringify(
          staffData
        ),
      }
    )
  }

export const toggleStaffStatus =
  async (
    token,
    staffId
  ) => {
    return request(
      `${API_URL}/staff/${staffId}/status`,
      {
        method: 'PATCH',

        headers:
          authHeaders(token),
      }
    )
  }

  export const getAdminRooms =
  async (token) => {
    return request(
      `${API_URL}/rooms`,
      {
        headers:
          authHeaders(token),
      }
    )
  }

export const createRoom =
  async (
    token,
    roomData
  ) => {
    return request(
      `${API_URL}/rooms`,
      {
        method: 'POST',

        headers:
          authHeaders(
            token,
            true
          ),

        body:
          JSON.stringify(
            roomData
          ),
      }
    )
  }

export const updateRoom =
  async (
    token,
    roomId,
    roomData
  ) => {
    return request(
      `${API_URL}/rooms/${roomId}`,
      {
        method: 'PUT',

        headers:
          authHeaders(
            token,
            true
          ),

        body:
          JSON.stringify(
            roomData
          ),
      }
    )
  }

export const updateRoomStatus =
  async (
    token,
    roomId,
    status
  ) => {
    return request(
      `${API_URL}/rooms/${roomId}/status`,
      {
        method: 'PATCH',

        headers:
          authHeaders(
            token,
            true
          ),

        body:
          JSON.stringify({
            status,
          }),
      }
    )
  }

export const updateRoomActiveStatus =
  async (
    token,
    roomId,
    isActive
  ) => {
    return request(
      `${API_URL}/rooms/${roomId}/active`,
      {
        method: 'PATCH',

        headers:
          authHeaders(
            token,
            true
          ),

        body:
          JSON.stringify({
            isActive,
          }),
      }
    )
  }