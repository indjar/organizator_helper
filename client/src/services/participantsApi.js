const AUTH_URL = `http://localhost:8080/participants`;

export class ParticipantApi {
  static async getAllParticipants() {
    const res = await fetch(`${AUTH_URL}`);
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
  }

  static async delete(id, token) {
    return await fetch(`${AUTH_URL}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  static async update(participant, token) {
    const res = await fetch(`${AUTH_URL}/${participant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(participant),
    });

    return res.json();
  }
}
