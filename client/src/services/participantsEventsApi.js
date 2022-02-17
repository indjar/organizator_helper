const AUTH_URL = `http://localhost:8080/eventParticipiants`;

export class ParticipantsEventsApi {
  static async getAll(token) {
    const res = await fetch(`${AUTH_URL}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };

  static async getByEventID(id,token) {
    const res = await fetch(`${AUTH_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async create(participant, token) {
      console.log( participant )
    const res = await fetch(`${AUTH_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( participant ),
    });

    return res.json();
  };

  static async delete(id, token) {
    return await fetch(`${AUTH_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  };

  static async update(participant,id, token) {
    console.log(participant)
    const res = await fetch(`${AUTH_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(participant),
    });

    return res.json();
  };
}
