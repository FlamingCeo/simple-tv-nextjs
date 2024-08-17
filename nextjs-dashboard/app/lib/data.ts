const API_URL = "http://localhost:8000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null; // No token, return null headers
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchNavItem() {
  const headers = getAuthHeaders();
  if (!headers) {
    return null; // Or handle the absence of token in another way
  }

  try {
    const res = await fetch(`${API_URL}/nav`, {
      next: { revalidate: 0 },
      headers: headers,
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch navigation items:", error);
    return null;
  }
}

export async function fetchSeriesById(id: number) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/series/${id}`, { headers });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch series:", error);
    return null;
  }
}

export async function saveSeriesById(id: number, data: { [key: string]: any }) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/series/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to save series:", error);
    return null;
  }
}

export async function newSeries(data: any) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/series`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to save series:", error);
    return null;
  }
}

export async function fetchSeasonById(id: number) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/season/${id}`, { headers });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch season:", error);
    return null;
  }
}

export async function saveSeason(id: number, data: { [key: string]: any }) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/season/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to save season:", error);
    return null;
  }
}
export async function newSeason(data: any) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/season`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to save season:", error);
    return null;
  }
}
export async function fetchEpisodeById(id: number) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/episode/${id}`, { headers });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch episode:", error);
    return null;
  }
}

export async function saveEpisodeById(
  id: number,
  data: { [key: string]: any }
) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/episode/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to save episode:", error);
    return null;
  }
}

export async function newEpisode(data: any) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/episode`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to save episode:", error);
    return null;
  }
}

export async function viewDashboard() {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/payments`, { headers });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch dashboard:", error);
    return null;
  }
}

export async function updatePaymentAmount(
  id: number,
  data: { [key: string]: any }
) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/payments/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ amount: data }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to update payment amount:", error);
    return null;
  }
}

export async function updateGrant(data: { [key: string]: any }) {
  const headers = getAuthHeaders();
  if (!headers) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/grant`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to update grant:", error);
    return null;
  }
}
